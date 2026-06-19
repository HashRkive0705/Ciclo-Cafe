export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isBestseller?: boolean;
  type: 'veg' | 'non-veg';
  prepTime?: string;
  rating?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  location: string;
  status: 'confirmed' | 'cancelled';
  tableNumber: number;
  createdAt: string;
}

export type Category = 
  | 'All Specials'
  | 'Coffee'
  | 'Tea & Beverages'
  | 'Breakfast'
  | 'Appetizers'
  | 'Pasta'
  | 'Pizza'
  | 'Main Course'
  | 'Desserts'
  | 'Bakery';

export interface LocationInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}
