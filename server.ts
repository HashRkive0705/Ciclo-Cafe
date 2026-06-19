import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { LOCATIONS, MENU_ITEMS } from "./src/data";
import { Reservation } from "./src/types";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);
console.log("SUPABASE URL:", process.env.VITE_SUPABASE_URL);
// Setup database file path in current working directory
const DB_FILE = path.join(process.cwd(), "db.json");

interface DatabaseSchema {
  reservations: Reservation[];
  orders: any[];
}

// Ensure db.json exists with valid schema
function initDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialData: DatabaseSchema = {
        reservations: [],
        orders: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Failed to initialize database file, falling back to RAM store:", error);
    return { reservations: [], orders: [] };
  }
}

// Save database
function saveDatabase(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write to database file:", error);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log("SERVER FILE LOADED");

  // Middleware for parsing requests
  app.use(express.json());
  app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

  // Initialize DB in RAM
  const db = initDatabase();

  // Root API Health Check 
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Fetch Menu Items
  app.get("/api/menu", (req, res) => {
    res.json(MENU_ITEMS);
  });

  // Fetch Branch Locations
  app.get("/api/locations", (req, res) => {
    res.json(LOCATIONS);
  });

  
// Fetch Reservations (old local db route)
app.get("/api/reservations", (req, res) => {
  const emailQuery = req.query.email as string;

  if (emailQuery) {
    const filtered = db.reservations.filter(
      (r) => r.email.toLowerCase() === emailQuery.toLowerCase()
    );
    res.json(filtered);
  } else {
    res.json(db.reservations);
  }
});


// ADMIN ROUTE - Fetch all reservations from Supabase
app.get("/api/admin/reservations", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
      return;
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

console.log("REGISTERING POST /api/reservations");
// CREATE RESERVATION -> SAVE TO SUPABASE
app.post("/api/reservations", async (req, res) => {
  console.log("POST ROUTE HIT");
  console.log(req.body);
  const {
    name,
    email,
    phone,
    date,
    time,
    guests,
    location,
    tableNumber
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !date ||
    !time ||
    !guests ||
    !location ||
    !tableNumber
  ) {
    res.status(400).json({
      error: "Missing required reservation booking parameters."
    });
    return;
  }

  try {
    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          customer_name: name,
          phone: phone,
          reservation_date: date,
          reservation_time: time,
          guests: Number(guests),
          special_request: `${location} | Table ${tableNumber}`
        }
      ])
      .select();

    if (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
      return;
    }

    console.log("Reservation saved:", data);

    res.status(201).json({
      success: true,
      reservation: data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to create reservation"
    });
  }
});
  // Cancel Reservation
  app.delete("/api/reservations/:id", (req, res) => {
    const id = req.params.id;
    const initialLen = db.reservations.length;
    
    db.reservations = db.reservations.filter((r) => r.id !== id);
    
    if (db.reservations.length === initialLen) {
      res.status(404).json({ error: "Reservation ID not found." });
      return;
    }

    saveDatabase(db);
    res.json({ success: true, message: `Reservation ${id} successfully cancelled.` });
  });

  // Place Food Order
  app.post("/api/orders", (req, res) => {
    const { items, method, selectedTableNo, deliveryAddress, discountCode, subtotal, discount, tax, total } = req.body;

    if (!items || !items.length || !method || total === undefined) {
      res.status(400).json({ error: "Missing required food order parameters." });
      return;
    }

    const orderId = `ORD-CICLO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      items,
      method,
      selectedTableNo: selectedTableNo || "",
      deliveryAddress: deliveryAddress || "",
      discountCode: discountCode || "",
      subtotal,
      discount,
      tax,
      total,
      createdAt: new Date().toISOString()
    };

    db.orders.unshift(newOrder);
    saveDatabase(db);

    res.status(201).json(newOrder);
  });

  // Fetch Order Preparation Status (dynamic calculation based on elapsed time)
  app.get("/api/orders/:id/status", (req, res) => {
    const orderId = req.params.id;
    const order = db.orders.find((o) => o.id === orderId);

    if (!order) {
      res.status(404).json({ error: "Order not found." });
      return;
    }

    const elapsedMs = Date.now() - new Date(order.createdAt).getTime();
    const elapsedSecs = Math.floor(elapsedMs / 1000);
    const durationLimitSecs = 15; // 15 seconds simulation loop

    let status: "accepted" | "cooking" | "plating" | "ready" = "accepted";
    let message = "Our executive chef accepted your artisanal request.";
    let secondsLeft = Math.max(0, durationLimitSecs - elapsedSecs);

    if (elapsedSecs >= 15) {
      status = "ready";
      message = "Your order is ready to savor!";
    } else if (elapsedSecs >= 10) {
      status = "plating";
      message = "Drizzling clean porcini herb oil overlays for final aesthetics...";
    } else if (elapsedSecs >= 5) {
      status = "cooking";
      message = "Active sourdough baking and espresso brewing in our kitchen...";
    }

    res.json({
      orderId,
      status,
      message,
      secondsLeft,
      elapsedSecs
    });
  });

  // Vite integration as middleware for dev, or static asset server for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CICLO BACKEND] Full-stack application booted successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
