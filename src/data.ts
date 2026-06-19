import { MenuItem, LocationInfo } from './types';

export const LOCATIONS: LocationInfo[] = [
  {
    id: 'kotturpuram',
    name: 'Kotturpuram, Chennai',
    address: 'No. 47, Gandhi Nagar 1st Main Road, Kotturpuram, Chennai - 600085',
    phone: '+91 44 4203 0405',
    hours: '11:00 AM - 11:00 PM'
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar, Bangalore',
    address: 'No. 948, 12th Main Road, Indiranagar, Bangalore - 560038',
    phone: '+91 80 4125 0607',
    hours: '11:00 AM - 11:00 PM'
  },
  {
    id: 'gurgaon',
    name: 'Gurgaon, Delhi NCR',
    address: 'Sector 29, Near Leisure Valley Park, Gurgaon, Haryana - 122002',
    phone: '+91 124 408 0910',
    hours: '11:00 AM - 11:00 PM'
  },
  {
    id: 'hyderabad',
    name: 'Jubilee Hills, Hyderabad',
    address: 'Road No. 36, Jubilee Hills, Hyderabad - 500033',
    phone: '+91 40 4012 3456',
    hours: '11:00 AM - 11:00 PM'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE
  {
    id: 'filter-coffee',
    name: 'South Indian Filter Coffee',
    price: 220,
    description: 'Our signature decoction made from select Arabica and Robusta beans, served with frothy milk in a traditional brass set.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbVSZfycL67X1qKxCxSrR_sDE0LbbIkSbrAbKKC8qNClaqcnZlbTqPFFkRecZcsgeuEjVqlmG_NSxJHzrMpty7TklwT6qMLvO3Z0Q5uLL-VMr6RdYB6bIWo_SkAh78TecJlL9I6ukgH6y2nHW4PHriVplAC1DskjjaqxsC29Clv4LlBFHJnI_n7iDNNmv14zGbTkj1G9hKpGaaZPxsZT7IkuvOSSM8w1NXcOFvxWi9qe7tvEk1Jbdpp1JqkeD7kmI7GGIO_CaZeFYG',
    category: 'Coffee',
    isBestseller: true,
    type: 'veg',
    prepTime: '5 mins',
    rating: 4.9
  },
  {
    id: 'espresso-romano',
    name: 'Espresso Romano',
    price: 180,
    description: 'A classic double shot of our house espresso, sweetened lightly and served with a fresh lemon peel twist to elevate the coffee oils.',
    image: 'https://images.unsplash.com/photo-151097252790b-a4817a57627a?auto=format&fit=crop&w=600&q=80',
    category: 'Coffee',
    type: 'veg',
    prepTime: '3 mins',
    rating: 4.6
  },
  {
    id: 'cold-brew-orange',
    name: 'Cold Brew Orange Tonic',
    price: 250,
    description: '18-hour steep cold brew layered with premium tonic water and fresh orange extract over ice blocks cubes.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    category: 'Coffee',
    type: 'veg',
    prepTime: '4 mins',
    rating: 4.8
  },

  // TEA & BEVERAGES
  {
    id: 'matcha-latte',
    name: 'Premium Japanese Matcha Latte',
    price: 280,
    description: 'Stone-ground culinary grade Uji matcha whisked with warm oat milk and a touch of organic wildflower honey.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    category: 'Tea & Beverages',
    type: 'veg',
    prepTime: '6 mins',
    rating: 4.7
  },
  {
    id: 'hibiscus-iced-tea',
    name: 'Hibiscus Rose Infused Iced Tea',
    price: 210,
    description: 'Tart organic hibiscus calyces brewed with real rose petals, cold-shaken with green tea essence and fresh mint leaves.',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80',
    category: 'Tea & Beverages',
    type: 'veg',
    prepTime: '4 mins',
    rating: 4.5
  },

  // BREAKFAST
  {
    id: 'halloumi-avocado-club',
    name: 'Halloumi & Avocado Club',
    price: 485,
    description: 'Grilled halloumi cheese slices, smashed ripe avocado, vine-ripened tomatoes, and house honey mustard on toasted artisan multigrain bread.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpp6TwAx6wHa5AYZ5bfi7VHXREzBc0dqUERkiVTaMAOYyDFoI98xs46FSEBxduL-hHogrnyUX1Fq-f93uv4gOVi1w3-TF0sRIi1lx6FxyXJDYRGZrVKt2_esMftdfn_B1hOQuyAkKNf1ESv5CnZLCi2u29_t0ccYkNC6NTOYkrTHvynzI2tGSnRBfHxZXnJmd5FFogZqbZwnavUSu_7MS3bRnWo2jYGSPCvdLYMJzHLZV3w9TW4d1tstMu7ynloMxTKASqJOouBwVX',
    category: 'Breakfast',
    type: 'veg',
    prepTime: '10 mins',
    rating: 4.8
  },
  {
    id: 'truffle-scrambled-eggs',
    name: 'Truffle Scrambled on Sourdough',
    price: 360,
    description: 'Creamy slow-cooked soft scrambled organic eggs doused in black truffle oil, served over fresh sourdough toast with grilled chives.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    category: 'Breakfast',
    type: 'non-veg',
    prepTime: '8 mins',
    rating: 4.9
  },

  // APPETIZERS
  {
    id: 'avocado-toast',
    name: 'Ciclo Guacamole Toast',
    price: 320,
    description: 'Crushed Hass avocado, toasted pumpkin seeds, cherry tomatoes, and microgreens drizzled with balsamic glaze on sourdough.',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80',
    category: 'Appetizers',
    type: 'veg',
    prepTime: '7 mins',
    rating: 4.6
  },
  {
    id: 'burrata-salad',
    name: 'Burrata & Heirloom Tomato Salad',
    price: 495,
    description: 'Creamy whole Italian burrata cheese globe resting over heirloom beefsteak tomatoes, fresh basil pestle, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80',
    category: 'Appetizers',
    type: 'veg',
    prepTime: '8 mins',
    rating: 4.9
  },

  // PASTA
  {
    id: 'chicken-lasagna',
    name: 'Chicken Mince Lasagna',
    price: 545,
    description: 'Classical Italian layers of pasta and herb-spiced chicken mince ragu, smothered in creamy bechamel sauce and molten rich mozzarella.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADV2JPx87Vw7uUvPfErvoFbHXGoRb0AU3ZFjQk_I98hJ2qG-JNDGyFTZ6BzFzVj2dt3YxCAcjUpe1GzVv-tgTSV96SgxP4R960EfAKHzzKTTm3B1mD7gX-8wQz0yUXzckw7QZGuI6aWhRhQ1cngbT2vID-sJAEv_s4o6n37vrGa0eYWdaFFa04asF-MUkVic9hX6DTQzqpBPEP_J8cbir_J3NfaKvcH_d7t6VAwnp7BOfpjSx6gNhk-kipdxT4bixoiBeyVcR-G_VN',
    category: 'Pasta',
    isBestseller: true,
    type: 'non-veg',
    prepTime: '15 mins',
    rating: 4.8
  },
  {
    id: 'wild-mushroom-ravioli',
    name: 'Truffle Mushroom Ravioli',
    price: 520,
    description: 'Handmade pasta pouches loaded with wild porcini stuffing, sautéed in a rich garlic butter cream doused in fresh sage chiffonade.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    category: 'Pasta',
    type: 'veg',
    prepTime: '14 mins',
    rating: 4.7
  },

  // PIZZA
  {
    id: 'mushroom-truffle-pizza',
    name: 'Wild Mushroom & Truffle Pizza',
    price: 615,
    description: 'Hand-stretched custom fermented sourdough pizza base topped with earthy porcini mushrooms, rich truffle oil dressing, and fresh wild arugula.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuaLFZVV4reBRKY27qaOklwJ3ljcMTKsPPbGlDLoNUgQeEymN4YZiHJB8QZPVanrrJ_vJIWWvTURaCbp9_tZmmbgwAh-nCsZ2zdb7-ib8dViJZGVK3v8QGIgZQ3n-cibmSjCoeWq7_EkYLeNhIdnbMoOXPnD5gTUZQ0TeHlTRTSgNA5Iw128rGRhB4CPV8428dpbuNk2SJvhY5PTBowsPFs9AeGPS6c_mNj-3XAzKljTRvgs-ingDFEu3YMIh-9BxAWjCm_zG0vR3g',
    category: 'Pizza',
    type: 'veg',
    prepTime: '12 mins',
    rating: 4.9
  },
  {
    id: 'margherita-basilico',
    name: 'Sourdough Margherita Basilico',
    price: 495,
    description: 'Vibrant house San Marzano marinara, torn buffalo mozzarella cubes, extra virgin olive cold drizzle, and aromatic sweet garden basil.',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=80',
    category: 'Pizza',
    type: 'veg',
    prepTime: '10 mins',
    rating: 4.8
  },

  // MAIN COURSE
  {
    id: 'teriyaki-salmon-bowl',
    name: 'Teriyaki Salmon Bowl',
    price: 795,
    description: 'Pan-seared premium Atlantic salmon fillet glazed in sweet home-made teriyaki sauce, served over steaming jasmine rice and steamed Asian greens.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOdtyPJ0-YNG6CPSIilmYu51UFl2He5-C9zxX1fu84Md_llLQf2CVkn0KS4241vFl_4XN0IZvlBL1Lm7gaNOCTjkDz2IFqCAmz1YSyh4HZN8Vf0rL8vxH3jZMrLxujxK6DQn5zC9Fm-IT1xGvZeBXXwO6LW3Dk2Y0XdWQOO3tAtJCMKqJllf7XHLYNj3cHNTRp4FTqOHJejTljIHxCE4hnyyq-yJMYyabNIIRQmezjbdqPGgyaAWYgUubGrB0aolxiA3w8ncXbUoZ1',
    category: 'Main Course',
    type: 'non-veg',
    prepTime: '18 mins',
    rating: 4.9
  },
  {
    id: 'chicken-gnocchi',
    name: 'Pan-Seared Chicken Gnocchi',
    price: 580,
    description: 'Crisp rosemary chicken strips tossed with light potato gnocchi cubes in a rich sun-dried tomato cream sauce topped with parmesan curls.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?auto=format&fit=crop&w=600&q=80',
    category: 'Main Course',
    type: 'non-veg',
    prepTime: '16 mins',
    rating: 4.7
  },

  // DESSERTS
  {
    id: 'tres-leches',
    name: 'Signature Tres Leches',
    price: 425,
    description: 'Melt-in-mouth light sponge cake soaked perfectly in three premium types of condensed and organic milks, crowned with heavy cream clouds and fresh seasonal berries.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaZ3GDW5OosMjgHIfxBvVe3toj5P1EAvGG6S1P9x9OZbLVhakJrodnjeVXv_BaUQcUq0CZsjSYFd2p9pntYasRvDdeJwCfWTjagRdccFzWnbZj794XqGemO2yXylEtnwQCT3Y1AgTgRUEiRLibTJdS5pnvBb242hQohelp1D70Gzu2ij8o-5fXN1lJx-UZSLjxochRYJORMCDvLwXqrdYDkgpH8TgjcC2Yhmmwi9BE4lDWQZsiReKrQVjIIT3uasoMLC5snb_w5wRl',
    category: 'Desserts',
    isBestseller: true,
    type: 'veg',
    prepTime: '5 mins',
    rating: 4.9
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu di Ciclo',
    price: 450,
    description: 'Espresso-drenched ladyfinger cake biscuits, whipped organic mascarpone layers, dusted heavily with single-origin Valrhona cocoa powder.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    category: 'Desserts',
    type: 'veg',
    prepTime: '5 mins',
    rating: 4.8
  },

  // BAKERY
  {
    id: 'sourdough',
    name: 'Artisanal Sourdough',
    price: 325,
    description: 'Baked fresh every morning using an authentic 48-hour slow fermentation starter culture. Perfectly thick, blistered crispy crust outside, airy and mildly sour/tangy crumb inside.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi86VxD9CTBmYWp4ONxH3AObDDdu3i9pjxWCtXciXUGmG44JzBbxbCTNIu0EbvofI0u7wbqesN26rJ3wjCzIfkFV_t4t5pBK1l1wB0J9qbnJc5or8Nw1eqydQEGkxMbq6xQQiqTEcGDtX0jLfwnu-CmuLy4qV9Ty9CP8Cgqmw9owXqAXKEEXuyppJiXiHGFGCq07u02_dLSIB6IoHaWyTj_TpjQlKf_QvFik5pg-8hob07sfGac57QYpYg2gTuvnNzqevWxs6x_2Wp',
    category: 'Bakery',
    type: 'veg',
    prepTime: '2 mins',
    rating: 4.9
  },
  {
    id: 'almond-croissants',
    name: 'Classic Almond Croissants',
    price: 285,
    description: 'Buttery, paper-thin, flaky laminated layers filled deliciously with sweet roasted almond frangipane paste and powdered sugar dust.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDkKBtpCFsXfX4SXX04B6yAsR04UXynFOYrEz_4JGpiCJaWuGuKKhLdhm6USol96CpKj4FPX9d4OXH1ua1WIBvvZvh9JtVZ04dJD3gMqP-mjdCZ64deG5b2pFzB9xfKepFppSpp2DyHWr8QIYBTNMOLNIU5yccF54LgvUgnSW2Xp3Xh3My25Yj1dBW0JiZB-Vyu8KH1VlWeHaJWusS1EJCk6LAzMWhvkCwq1aP-dHfiiDdWK4BinK9cl2h67Ni0A7zpByyEVCtmHKS',
    category: 'Bakery',
    type: 'veg',
    prepTime: '2 mins',
    rating: 4.8
  },
  {
    id: 'truffle-pastry',
    name: 'Dutch Truffle Pastry',
    price: 315,
    description: 'Intense 70% dark Belgian chocolate ganache layers glazed beautifully and placed between super moist baked cocoa sponge slices.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE9AfYecZFeJW_rn14OIRMRsU-sGl3PP3JNvVeJLQC_Puk1bKa4amWYxO6f7QN6haD2ot2mZzewQh8WLxo4FuUlk44KpIxK4sSV59r7x1utiCjLVraIVsbBGvUODX_NL4OxIC1LgTwGAiJM3LkpLGUhMPz4jNOX1rHMVj4iuaBUn337Jhuxm5yJI6Ws6d_nuyoLxMqUN5MVAguaecUxIHwgI8kTZa0oVo75jsoFjMyQUU_uLnnXZ2pLUkOuajQH0KPOmaSgn9_7fzT',
    category: 'Bakery',
    type: 'veg',
    prepTime: '2 mins',
    rating: 4.9
  }
];
