/**
 * HOT DOG NATION — MASTER MENU DATASET & RESTAURANT CONFIGURATION
 * Tagline: EVERY BITE FEELS ENOUGH
 * Location: Law Gate, Phagwara, Punjab, India
 * Updated with complete official menu & combos
 */

const DEFAULT_RESTAURANT_INFO = {
  name: "HOT DOG NATION",
  tagline: "EVERY BITE FEELS ENOUGH",
  headline: "NOT JUST A HOT DOG. IT'S A WHOLE MOOD!",
  description: "Loaded with flavour, packed with happiness, and made to satisfy every craving. Welcome to Hot Dog Nation, where every bite feels enough!",
  aboutStory: "Welcome to Hot Dog Nation, your destination for delicious cravings at Law Gate, Phagwara. We bring together loaded hot dogs, crispy burgers, cheesy sandwiches, golden wraps, dimsums, waffles, thick shakes, and refreshing mocktails. Our goal is simple: serve satisfying food, create happy moments, and make every bite memorable.",
  address: "Law Gate, Phagwara, Punjab 144411, India",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210",
  instagramUrl: "https://www.instagram.com/hotdognation.in/",
  googleMapsUrl: "https://maps.google.com/?q=Law+Gate+Phagwara+Punjab+India",
  openingHours: "11:00 AM – 11:30 PM Daily",
  deliveryNote: "Free Fast Delivery across Law Gate & LPU Campus on orders above ₹199",
  announcementText: "🌭 WELCOME TO HOT DOG NATION — EVERY BITE FEELS ENOUGH! | 📍 LAW GATE, PHAGWARA",
  storeStatusOverride: "auto", // "auto", "open", "closed"
  promoBanner: {
    headline: "GOOD FOOD. GREAT MOOD. HOT DOG NATION!",
    subheadline: "One bite is all it takes to become a fan.",
    badge: "BIGGER BITES • BETTER VIBES",
    buttonText: "ORDER ON WHATSAPP"
  }
};

const DEFAULT_MENU_ITEMS = [
  // ===================== SIGNATURE COMBOS & FAMILY PACKS =====================
  {
    id: "combo-01",
    name: "Veggie Classic Combo",
    category: "combos",
    categoryLabel: "Signature Combos",
    price: 279,
    isVeg: true,
    isBestseller: true,
    prepTime: "12-15m",
    rating: 5.0,
    description: "Cheesy Veggie Burger + Classic Salt Fries + Blackcurrant Mocktail. Save more, enjoy more!",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    tags: ["Veg Combo", "Burger & Fries"]
  },
  {
    id: "combo-02",
    name: "Paneer Lover Combo",
    category: "combos",
    categoryLabel: "Signature Combos",
    price: 279,
    isVeg: true,
    isBestseller: true,
    prepTime: "12-15m",
    rating: 4.9,
    description: "Veggie Paneer Hotdog + Peri-Peri Fries + Chilled Cold Coffee. The ultimate paneer indulgence!",
    image: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=800&auto=format&fit=crop&q=80",
    tags: ["Veg Combo", "Hotdog & Shake"]
  },
  {
    id: "combo-03",
    name: "Cheese Burst Combo",
    category: "combos",
    categoryLabel: "Signature Combos",
    price: 279,
    isVeg: true,
    isBestseller: true,
    prepTime: "12-15m",
    rating: 5.0,
    description: "Paneer Crispy Burger + Cheese Fries + Vanilla Smooth Shake. Maximum cheese overload!",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    tags: ["Cheese Burst", "Bestseller Combo"]
  },
  {
    id: "combo-04",
    name: "American King Combo",
    category: "combos",
    categoryLabel: "Signature Combos",
    price: 347,
    isVeg: false,
    isBestseller: true,
    prepTime: "12-15m",
    rating: 5.0,
    description: "American Hotdog + Peri-Peri Fries + Cold Coffee. The king of hot dog combos!",
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&auto=format&fit=crop&q=80",
    tags: ["Non-Veg Combo", "American King"]
  },
  {
    id: "combo-05",
    name: "Crispy Chicken Combo",
    category: "combos",
    categoryLabel: "Signature Combos",
    price: 347,
    isVeg: false,
    isBestseller: true,
    prepTime: "12-15m",
    rating: 4.9,
    description: "Chicken Crispy Burger + Chicken Pops + Cranberry Mocktail. Crunchy, flavorful and satisfying!",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
    tags: ["Non-Veg Combo", "Crispy Chicken"]
  },
  {
    id: "combo-06",
    name: "Chicken Feast Combo",
    category: "combos",
    categoryLabel: "Signature Combos",
    price: 347,
    isVeg: false,
    isBestseller: true,
    prepTime: "12-15m",
    rating: 4.9,
    description: "Chicken Sandwich + Chicken Garlic Finger + Mojito Mint Mocktail. A feast for meat lovers!",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    tags: ["Non-Veg Combo", "Chicken Feast"]
  },
  {
    id: "combo-07",
    name: "Hot Dog Nation Veg Family Pack",
    category: "combos",
    categoryLabel: "Signature Combos",
    price: 849,
    isVeg: true,
    isBestseller: true,
    prepTime: "20-25m",
    rating: 5.0,
    description: "2 × Veggie Paneer Hotdogs + 2 × Veggie Burgers + 2 × Cheese Fries + 4 × Mocktails (Mojito Mint / Basil). Serves 4!",
    image: "assets/images/menu-poster-combos.jpg",
    tags: ["Family Pack", "Serves 4", "Veg Feast"]
  },
  {
    id: "combo-08",
    name: "Hot Dog Nation Non-Veg Family Pack",
    category: "combos",
    categoryLabel: "Signature Combos",
    price: 849,
    isVeg: false,
    isBestseller: true,
    prepTime: "20-25m",
    rating: 5.0,
    description: "2 × American Hotdogs + 2 × Chicken Burgers + 2 × Peri-Peri Fries + 4 × Mocktails (Mojito Mint / Basil). Big party feast!",
    image: "assets/images/menu-poster-combos.jpg",
    tags: ["Family Pack", "Serves 4", "Non-Veg Feast"]
  },

  // ===================== HOTDOGS =====================
  {
    id: "hd-01",
    name: "American Hotdog",
    category: "hotdogs",
    categoryLabel: "Hot Dogs",
    price: 149,
    isVeg: false,
    isBestseller: true,
    prepTime: "8-10m",
    rating: 4.9,
    description: "Juicy grilled chicken sausage topped with classic American mustard, sweet tomato ketchup, and creamy mayo in a toasted bun.",
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=800&auto=format&fit=crop&q=80",
    tags: ["Classic American", "Top Seller"]
  },
  {
    id: "hd-02",
    name: "Mustard Hotdog",
    category: "hotdogs",
    categoryLabel: "Hot Dogs",
    price: 149,
    isVeg: false,
    isBestseller: false,
    prepTime: "8-10m",
    rating: 4.8,
    description: "Plump grilled frank layered with an abundance of sharp, tangy yellow mustard, mayo, and relish.",
    image: "https://images.unsplash.com/photo-1612392062631-94dd858cba88?w=800&auto=format&fit=crop&q=80",
    tags: ["Tangy Mustard"]
  },
  {
    id: "hd-03",
    name: "Tikka Hotdog",
    category: "hotdogs",
    categoryLabel: "Hot Dogs",
    price: 159,
    isVeg: false,
    isBestseller: true,
    prepTime: "10-12m",
    rating: 5.0,
    description: "Spiced chicken tikka sausage infused with smoky desi tandoori spices, mint relish, and sliced onions.",
    image: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=800&auto=format&fit=crop&q=80",
    tags: ["Desi Tikka", "Spicy Fusion"]
  },
  {
    id: "hd-04",
    name: "Cheese Hotdog",
    category: "hotdogs",
    categoryLabel: "Hot Dogs",
    price: 169,
    isVeg: false,
    isBestseller: true,
    prepTime: "10-12m",
    rating: 5.0,
    description: "Sizzling chicken frank loaded with a waterfall of melted cheese, sautéed toppings, and gourmet sauces.",
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&auto=format&fit=crop&q=80",
    tags: ["Extra Cheese", "Cheese Volcano"]
  },
  {
    id: "hd-05",
    name: "Veggie Hotdog",
    category: "hotdogs",
    categoryLabel: "Hot Dogs",
    price: 99,
    isVeg: true,
    isBestseller: true,
    prepTime: "8-10m",
    rating: 4.8,
    description: "100% vegetarian crispy seasoned potato patty topped with onions, tomatoes, lettuce, mustard, and creamy mayo.",
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=800&auto=format&fit=crop&q=80",
    tags: ["100% Veg", "Crispy Patty"]
  },
  {
    id: "hd-06",
    name: "Veggie Paneer Hotdog",
    category: "hotdogs",
    categoryLabel: "Hot Dogs",
    price: 129,
    isVeg: true,
    isBestseller: true,
    prepTime: "10-12m",
    rating: 4.9,
    description: "Marinated spiced cottage cheese paneer slabs grilled and nestled in a toasted bun with crunchy greens and tandoori mayo.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    tags: ["Paneer Special", "100% Veg"]
  },

  // ===================== BURGERS =====================
  {
    id: "bg-01",
    name: "Veggie Burger",
    category: "burgers",
    categoryLabel: "Burgers",
    price: 69,
    isVeg: true,
    isBestseller: false,
    prepTime: "8-10m",
    rating: 4.7,
    description: "Crispy seasoned vegetable patty layered with crisp iceberg lettuce, sliced onions, tomatoes, and creamy mayo in a sesame bun.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    tags: ["Classic Veg", "Budget Friendly"]
  },
  {
    id: "bg-02",
    name: "Cheesy Veggie Burger",
    category: "burgers",
    categoryLabel: "Burgers",
    price: 79,
    isVeg: true,
    isBestseller: true,
    prepTime: "8-10m",
    rating: 4.9,
    description: "Crispy veggie patty crowned with a slice of melted cheese, fresh tomato slices, and rich thousand island dressing.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    tags: ["Melted Cheese", "Student Favorite"]
  },
  {
    id: "bg-03",
    name: "Paneer Crispy Burger",
    category: "burgers",
    categoryLabel: "Burgers",
    price: 109,
    isVeg: true,
    isBestseller: true,
    prepTime: "10-12m",
    rating: 4.9,
    description: "Generous block of paneer coated in crunchy batter, fried golden and paired with spiced tandoori mayo and lettuce.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    tags: ["Crispy Paneer", "Chef Special"]
  },
  {
    id: "bg-04",
    name: "Chicken Burger",
    category: "burgers",
    categoryLabel: "Burgers",
    price: 99,
    isVeg: false,
    isBestseller: true,
    prepTime: "8-10m",
    rating: 4.8,
    description: "Tender seasoned chicken patty grilled to juicy perfection with mayo, sliced onions, and crisp greens.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    tags: ["Juicy Chicken", "Top Seller"]
  },
  {
    id: "bg-05",
    name: "Chicken Crispy Burger",
    category: "burgers",
    categoryLabel: "Burgers",
    price: 129,
    isVeg: false,
    isBestseller: true,
    prepTime: "10-12m",
    rating: 5.0,
    description: "Ultra-crispy golden fried chicken breast fillet drenched in house spicy sauce, pickles, and melted cheese.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    tags: ["Crunchy Chicken", "Bestseller"]
  },

  // ===================== SANDWICHES =====================
  {
    id: "sw-01",
    name: "Veg Loaded Sandwich",
    category: "sandwiches",
    categoryLabel: "Sandwiches",
    price: 109,
    isVeg: true,
    isBestseller: false,
    prepTime: "8-10m",
    rating: 4.7,
    description: "Multi-layered toasted sandwich loaded with sliced cucumbers, tomatoes, capsicum, onions, cheese, and spicy mint chutney.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    tags: ["Loaded Veggies", "Grilled Crisp"]
  },
  {
    id: "sw-02",
    name: "Cheese Corn Sandwich",
    category: "sandwiches",
    categoryLabel: "Sandwiches",
    price: 129,
    isVeg: true,
    isBestseller: true,
    prepTime: "8-10m",
    rating: 4.9,
    description: "Sweet golden corn kernels bathed in molten cheddar and mozzarella, grilled to golden buttered perfection.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    tags: ["Cheesy Corn", "Comfort Food"]
  },
  {
    id: "sw-03",
    name: "Tandoori Paneer Sandwich",
    category: "sandwiches",
    categoryLabel: "Sandwiches",
    price: 149,
    isVeg: true,
    isBestseller: true,
    prepTime: "10-12m",
    rating: 4.9,
    description: "Spiced tandoori marinated paneer cubes, sautéed bell peppers, and creamy tandoori spread in artisan grilled bread.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    tags: ["Tandoori Paneer", "Desi Grill"]
  },
  {
    id: "sw-04",
    name: "Chicken Sandwich",
    category: "sandwiches",
    categoryLabel: "Sandwiches",
    price: 189,
    isVeg: false,
    isBestseller: true,
    prepTime: "10-12m",
    rating: 5.0,
    description: "Tender shredded chicken tossed in garlic herb mayo, layered with cheese slices and grilled golden.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    tags: ["Shredded Chicken", "Protein Power"]
  },

  // ===================== WRAPS & TWISTERS =====================
  {
    id: "wrp-01",
    name: "Veg Wrap",
    category: "wraps",
    categoryLabel: "Wraps & Twisters",
    price: 67,
    isVeg: true,
    isBestseller: false,
    prepTime: "8m",
    rating: 4.7,
    description: "Crispy seasoned vegetable patty, onions, tomatoes, and zesty sauce rolled inside a soft toasted tortilla.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80",
    tags: ["Quick Bite", "100% Veg"]
  },
  {
    id: "wrp-02",
    name: "Veg Cheese Corn Wrap",
    category: "wraps",
    categoryLabel: "Wraps & Twisters",
    price: 87,
    isVeg: true,
    isBestseller: true,
    prepTime: "8m",
    rating: 4.8,
    description: "Sweet corn kernels, crunchy vegetables, and melted cheese rolled into a warm flour wrap.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80",
    tags: ["Cheese Corn", "Student Choice"]
  },
  {
    id: "wrp-03",
    name: "Paneer Cheese Wrap",
    category: "wraps",
    categoryLabel: "Wraps & Twisters",
    price: 97,
    isVeg: true,
    isBestseller: true,
    prepTime: "10m",
    rating: 4.9,
    description: "Marinated spiced cottage cheese chunks and molten cheese drizzle wrapped with crunchy iceberg lettuce.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80",
    tags: ["Paneer Wrap", "Cheesy Melt"]
  },
  {
    id: "wrp-04",
    name: "Chicken Wrap",
    category: "wraps",
    categoryLabel: "Wraps & Twisters",
    price: 137,
    isVeg: false,
    isBestseller: true,
    prepTime: "10m",
    rating: 5.0,
    description: "Succulent grilled chicken tenders rolled with pickled onions, crisp greens, garlic sauce, and herbs.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80",
    tags: ["Grilled Chicken", "Loaded Wrap"]
  },
  {
    id: "tws-01",
    name: "Peri-Peri Twister",
    category: "wraps",
    categoryLabel: "Wraps & Twisters",
    price: 89,
    isVeg: true,
    isBestseller: false,
    prepTime: "8m",
    rating: 4.8,
    description: "Crunchy spiral twister packed with fiery peri-peri spices, cool mayo, and shredded crisp cabbage.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80",
    tags: ["Peri-Peri Kick", "Twister"]
  },
  {
    id: "tws-02",
    name: "Thousand Twister",
    category: "wraps",
    categoryLabel: "Wraps & Twisters",
    price: 99,
    isVeg: true,
    isBestseller: true,
    prepTime: "8m",
    rating: 4.9,
    description: "Golden crispy twister roll smothered in rich, tangy Thousand Island dressing with fresh garden crunch.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80",
    tags: ["Thousand Island", "Special Twister"]
  },

  // ===================== DIMSUMS =====================
  {
    id: "dim-01",
    name: "Veg Steam Dimsums",
    category: "dimsums",
    categoryLabel: "Dimsums",
    price: 70,
    isVeg: true,
    isBestseller: false,
    prepTime: "8-10m",
    rating: 4.7,
    description: "Delicate thin-wrapper steamed dimsums stuffed with seasoned minced cabbage, carrots, and aromatics. Served with spicy momo dip.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
    tags: ["Steamed Fresh", "Spicy Dip"]
  },
  {
    id: "dim-02",
    name: "Paneer Steam Dimsums",
    category: "dimsums",
    categoryLabel: "Dimsums",
    price: 80,
    isVeg: true,
    isBestseller: false,
    prepTime: "8-10m",
    rating: 4.8,
    description: "Steamed dumplings filled with tender spiced paneer, coriander, and subtle Himalayan spices.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
    tags: ["Paneer Filling", "Steamed"]
  },
  {
    id: "dim-03",
    name: "Veg Kurkure Fried Dimsums",
    category: "dimsums",
    categoryLabel: "Dimsums",
    price: 99,
    isVeg: true,
    isBestseller: true,
    prepTime: "10m",
    rating: 5.0,
    description: "Crispy coated dimsums deep-fried to an extraordinary kurkure crunch. Served with fiery red chilli chutney and mayo.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
    tags: ["Extra Kurkure", "Fan Favorite"]
  },
  {
    id: "dim-04",
    name: "Chicken Steamed Dimsums",
    category: "dimsums",
    categoryLabel: "Dimsums",
    price: 100,
    isVeg: false,
    isBestseller: true,
    prepTime: "10m",
    rating: 4.9,
    description: "Authentic steamed dimsums stuffed with juicy minced chicken seasoned with ginger, garlic, and fresh scallions.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
    tags: ["Juicy Chicken", "Steamed Momos"]
  },

  // ===================== SNACKS (NON-VEG & VEG) =====================
  {
    id: "snk-01",
    name: "Chicken Pops",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 120,
    isVeg: false,
    isBestseller: true,
    prepTime: "6-8m",
    rating: 4.9,
    description: "Bite-sized tender chicken popcorn morsels tossed with peri seasoning, fried golden and crispy.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
    tags: ["Chicken Pops", "Snack Time"]
  },
  {
    id: "snk-02",
    name: "Chicken Nugget",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 120,
    isVeg: false,
    isBestseller: false,
    prepTime: "6-8m",
    rating: 4.8,
    description: "Classic golden fried minced chicken nuggets seasoned with subtle herbs and white pepper.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
    tags: ["Golden Nuggets", "Non-Veg"]
  },
  {
    id: "snk-03",
    name: "Chicken Garlic Finger",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 140,
    isVeg: false,
    isBestseller: true,
    prepTime: "8-10m",
    rating: 4.9,
    description: "Crispy chicken finger strips generously seasoned with roasted garlic and cracked black pepper.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80",
    tags: ["Garlic Flavor", "Crispy Finger"]
  },
  {
    id: "snk-04",
    name: "Veggie Nugget",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 90,
    isVeg: true,
    isBestseller: false,
    prepTime: "6m",
    rating: 4.7,
    description: "Crisp bite-sized vegetable nuggets made from mashed potatoes, peas, corn, and spices.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80",
    tags: ["Veggie Nugget", "100% Veg"]
  },
  {
    id: "snk-05",
    name: "Veggie Finger",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 90,
    isVeg: true,
    isBestseller: false,
    prepTime: "6m",
    rating: 4.7,
    description: "Golden crumb-coated vegetable sticks fried crisp, served with sweet chilli sauce.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80",
    tags: ["Veggie Finger", "Snack"]
  },
  {
    id: "snk-06",
    name: "Potato Cheese Shots",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 149,
    isVeg: true,
    isBestseller: true,
    prepTime: "8m",
    rating: 5.0,
    description: "Crispy potato shells filled with an explosion of warm, gooey cheese and jalapeño bits.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80",
    tags: ["Cheese Burst", "Bestseller Snack"]
  },
  {
    id: "snk-07",
    name: "Onion Rings",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 129,
    isVeg: true,
    isBestseller: false,
    prepTime: "6-8m",
    rating: 4.8,
    description: "Sweet, juicy onion rings in a light and crunchy tempura batter.",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&auto=format&fit=crop&q=80",
    tags: ["Crunchy Rings"]
  },
  {
    id: "snk-08",
    name: "Potato Super Wedges",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 149,
    isVeg: true,
    isBestseller: true,
    prepTime: "8m",
    rating: 4.9,
    description: "Thick skin-on seasoned potato wedges fried golden and sprinkled with herb garlic seasoning.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80",
    tags: ["Super Wedges", "Garlic Herb"]
  },

  // ===================== FRIES & CORN =====================
  {
    id: "fr-01",
    name: "Classic Salt Fries",
    category: "fries",
    categoryLabel: "Fries & Corn",
    price: 79,
    isVeg: true,
    isBestseller: false,
    prepTime: "5m",
    rating: 4.8,
    description: "Crispy golden straight-cut French fries seasoned with fine sea salt.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&auto=format&fit=crop&q=80",
    tags: ["Salt Fries", "Crispy"]
  },
  {
    id: "fr-02",
    name: "Peri-Peri Fries",
    category: "fries",
    categoryLabel: "Fries & Corn",
    price: 89,
    isVeg: true,
    isBestseller: true,
    prepTime: "5m",
    rating: 5.0,
    description: "Golden fries tossed with authentic African peri-peri seasoning for an irresistible spicy tang.",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80",
    tags: ["Peri-Peri", "Top Rated Fries"]
  },
  {
    id: "fr-03",
    name: "Cheese Fries",
    category: "fries",
    categoryLabel: "Fries & Corn",
    price: 99,
    isVeg: true,
    isBestseller: true,
    prepTime: "5-7m",
    rating: 4.9,
    description: "Crispy French fries smothered with hot melted cheese sauce and roasted garlic flakes.",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80",
    tags: ["Melted Cheese", "Cheesy Craving"]
  },
  {
    id: "crn-01",
    name: "Classic Salt Corn",
    category: "fries",
    categoryLabel: "Fries & Corn",
    price: 59,
    isVeg: true,
    isBestseller: false,
    prepTime: "3m",
    rating: 4.7,
    description: "Steamed sweet corn kernels served steaming hot with butter and sea salt.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    tags: ["Sweet Corn", "Butter Salt"]
  },
  {
    id: "crn-02",
    name: "Peri-Peri Corn",
    category: "fries",
    categoryLabel: "Fries & Corn",
    price: 69,
    isVeg: true,
    isBestseller: true,
    prepTime: "3m",
    rating: 4.8,
    description: "Juicy sweet corn tossed in melted butter and fiery peri-peri masala.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    tags: ["Spicy Corn", "Peri-Peri"]
  },
  {
    id: "crn-03",
    name: "Lemon Lite Corn",
    category: "fries",
    categoryLabel: "Fries & Corn",
    price: 79,
    isVeg: true,
    isBestseller: false,
    prepTime: "3m",
    rating: 4.8,
    description: "Refreshing sweet corn tossed with freshly squeezed lemon juice, chaat masala, and herbs.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    tags: ["Tangy Lemon", "Healthy"]
  },

  // ===================== WAFFLES =====================
  {
    id: "wf-01",
    name: "Vanilla Waffle",
    category: "waffles",
    categoryLabel: "Waffles",
    price: 169,
    isVeg: true,
    isBestseller: false,
    prepTime: "8-10m",
    rating: 4.8,
    description: "Warm, freshly baked Belgian waffle topped with vanilla ice cream and sweet golden syrup.",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80",
    tags: ["Belgian Waffle", "Vanilla Ice Cream"]
  },
  {
    id: "wf-02",
    name: "Chocolate Waffle",
    category: "waffles",
    categoryLabel: "Waffles",
    price: 189,
    isVeg: true,
    isBestseller: true,
    prepTime: "8-10m",
    rating: 5.0,
    description: "Crispy waffle drenched in hot melted chocolate fudge, dark chocolate chips, and chocolate ice cream.",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80",
    tags: ["Hot Chocolate", "Bestseller Dessert"]
  },

  // ===================== MOCKTAILS =====================
  {
    id: "mck-01",
    name: "Mojito Mint Mocktail",
    category: "mocktails",
    categoryLabel: "Mocktails",
    price: 99,
    isVeg: true,
    isBestseller: true,
    prepTime: "3m",
    rating: 4.9,
    description: "Fresh garden mint leaves, muddled lemon wedges, and chilled sparkling soda for pure refreshment.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    tags: ["Mint Mojito", "Cooler"]
  },
  {
    id: "mck-02",
    name: "Basil Mocktail",
    category: "mocktails",
    categoryLabel: "Mocktails",
    price: 99,
    isVeg: true,
    isBestseller: false,
    prepTime: "3m",
    rating: 4.8,
    description: "Aromatic sweet basil cooler infused with citrus twist and bubbly sparkling soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    tags: ["Basil Cooler"]
  },
  {
    id: "mck-03",
    name: "Watermelon Mocktail",
    category: "mocktails",
    categoryLabel: "Mocktails",
    price: 119,
    isVeg: true,
    isBestseller: true,
    prepTime: "3m",
    rating: 4.9,
    description: "Sweet juicy crushed watermelon with mint notes and chilled sparkling fizz.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    tags: ["Watermelon", "Summer Fizz"]
  },
  {
    id: "mck-04",
    name: "Blackcurrant Mocktail",
    category: "mocktails",
    categoryLabel: "Mocktails",
    price: 140,
    isVeg: true,
    isBestseller: true,
    prepTime: "3m",
    rating: 5.0,
    description: "Deep berry flavored blackcurrant syrup muddled with lemon juice and crushed ice.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    tags: ["Blackcurrant", "Berry Burst"]
  },
  {
    id: "mck-05",
    name: "Cranberry Mocktail",
    category: "mocktails",
    categoryLabel: "Mocktails",
    price: 139,
    isVeg: true,
    isBestseller: false,
    prepTime: "3m",
    rating: 4.8,
    description: "Tart and sweet cranberry beverage shaken with ice, lime, and soda.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80",
    tags: ["Cranberry", "Tart & Sweet"]
  },

  // ===================== THICK SHAKES & BEVERAGES =====================
  {
    id: "bev-01",
    name: "Cold Coffee",
    category: "beverages",
    categoryLabel: "Shakes & Beverages",
    price: 119,
    isVeg: true,
    isBestseller: true,
    prepTime: "3m",
    rating: 5.0,
    description: "Rich brewed Arabica espresso blended with ice-cold creamy milk, sweet chocolate syrup, and ice.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80",
    tags: ["Cold Coffee", "Campus Legend"]
  },
  {
    id: "bev-02",
    name: "Vanilla Smooth Shake",
    category: "beverages",
    categoryLabel: "Shakes & Beverages",
    price: 119,
    isVeg: true,
    isBestseller: false,
    prepTime: "4m",
    rating: 4.8,
    description: "Silky smooth vanilla bean shake crowned with whipped cream.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80",
    tags: ["Vanilla Shake"]
  },
  {
    id: "bev-03",
    name: "Biscoff Caramel Shake",
    category: "beverages",
    categoryLabel: "Shakes & Beverages",
    price: 139,
    isVeg: true,
    isBestseller: true,
    prepTime: "4m",
    rating: 5.0,
    description: "Rich thick shake made with authentic Lotus Biscoff spread, crushed cookies, and salted caramel.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80",
    tags: ["Lotus Biscoff", "Caramel Luxury"]
  },
  {
    id: "bev-04",
    name: "KitKat Crunch Shake",
    category: "beverages",
    categoryLabel: "Shakes & Beverages",
    price: 149,
    isVeg: true,
    isBestseller: true,
    prepTime: "4m",
    rating: 4.9,
    description: "Creamy chocolate shake loaded with crushed KitKat wafer bars and chocolate fudge drizzle.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80",
    tags: ["KitKat", "Crunchy Shake"]
  },
  {
    id: "bev-05",
    name: "Oreo Crisp Shake",
    category: "beverages",
    categoryLabel: "Shakes & Beverages",
    price: 149,
    isVeg: true,
    isBestseller: true,
    prepTime: "4m",
    rating: 4.9,
    description: "Thick cookies-and-cream shake packed with whole crushed Oreo biscuits and dark chocolate.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80",
    tags: ["Oreo Shake", "Cookies & Cream"]
  },

  // ===================== DESSERTS =====================
  {
    id: "des-01",
    name: "Muffin",
    category: "desserts",
    categoryLabel: "Desserts",
    price: 99,
    isVeg: true,
    isBestseller: false,
    prepTime: "Instant",
    rating: 4.7,
    description: "Soft, moist bakery muffin loaded with melted chocolate chips.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    tags: ["Choco Muffin"]
  },
  {
    id: "des-02",
    name: "Chocolate Brownie",
    category: "desserts",
    categoryLabel: "Desserts",
    price: 119,
    isVeg: true,
    isBestseller: false,
    prepTime: "Instant",
    rating: 4.8,
    description: "Fudgy Belgian dark chocolate brownie with a rich cakey crust.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    tags: ["Fudgy Brownie"]
  },
  {
    id: "des-03",
    name: "Choco Lava",
    category: "desserts",
    categoryLabel: "Desserts",
    price: 149,
    isVeg: true,
    isBestseller: true,
    prepTime: "3m",
    rating: 5.0,
    description: "Warm chocolate cake with an erupting molten chocolate core that flows with every spoon.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    tags: ["Molten Core", "Bestseller Dessert"]
  },
  {
    id: "des-04",
    name: "Brownie with Ice Cream",
    category: "desserts",
    categoryLabel: "Desserts",
    price: 149,
    isVeg: true,
    isBestseller: true,
    prepTime: "3m",
    rating: 5.0,
    description: "Warm sizzling chocolate brownie paired with a scoop of cool vanilla ice cream and hot chocolate fudge.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    tags: ["Sizzling Brownie", "Ice Cream"]
  }
];

// Configuration for "BUILD YOUR OWN HOT DOG" interactive builder (updated to new menu base prices)
const BUILD_YOUR_OWN_CONFIG = {
  bases: [
    {
      id: "base-veg",
      name: "Veggie Patty Base (Veg)",
      price: 99,
      isVeg: true,
      description: "100% vegetarian crispy seasoned vegetable patty in a warm toasted hotdog bun"
    },
    {
      id: "base-paneer",
      name: "Veggie Paneer Base (Veg)",
      price: 129,
      isVeg: true,
      description: "Spiced marinated paneer block & crispy patty in a warm bun"
    },
    {
      id: "base-nonveg",
      name: "American Chicken Sausage (Non-Veg)",
      price: 149,
      isVeg: false,
      description: "Juicy grilled chicken frankfurter in a warm artisan bun"
    }
  ],
  sausageUpgrades: [
    {
      id: "sausage-std",
      name: "Standard American Sausage",
      price: 0,
      appliesTo: "nonveg",
      description: "Classic chicken frankfurter"
    },
    {
      id: "sausage-tikka",
      name: "Tikka Spiced Sausage",
      price: 10,
      appliesTo: "nonveg",
      description: "Marinated with smoky North-Indian tikka masala"
    },
    {
      id: "sausage-cheese",
      name: "Cheese-Stuffed Sausage",
      price: 20,
      appliesTo: "nonveg",
      description: "Filled with molten cheese pockets that pop with every bite"
    }
  ],
  addOns: [
    {
      id: "addon-cheese",
      name: "Extra Melted Cheese Layer",
      price: 20,
      icon: "fa-cheese"
    },
    {
      id: "addon-fries-side",
      name: "Side of Peri-Peri Fries",
      price: 50,
      icon: "fa-french-fries"
    }
  ],
  sauces: [
    { id: "sauce-mayo", name: "Classic Mayo", free: true },
    { id: "sauce-mustard", name: "American Mustard", free: true },
    { id: "sauce-ketchup", name: "Tomato Ketchup", free: true },
    { id: "sauce-tandoori", name: "Tandoori Sauce", free: true }
  ],
  toppings: [
    { id: "top-onions", name: "Diced Onions" },
    { id: "top-jalapenos", name: "Jalapeños" },
    { id: "top-tomatoes", name: "Sliced Tomatoes" },
    { id: "top-relish", name: "Sweet Relish" },
    { id: "top-lettuce", name: "Iceberg Lettuce" }
  ]
};

// ===================== STORE STATUS (OPEN / CLOSED) =====================
function getStoreOpenStatus() {
  const info = getRestaurantInfo();
  
  if (info.storeStatusOverride === "open") {
    return {
      isOpen: true,
      label: "OPEN NOW",
      subtext: "Accepting Orders • 11:00 AM – 11:30 PM",
      mode: "manual-open"
    };
  }
  if (info.storeStatusOverride === "closed") {
    return {
      isOpen: false,
      label: "CURRENTLY CLOSED",
      subtext: "Kitchen Opens at 11:00 AM",
      mode: "manual-closed"
    };
  }

  // Automatic Time Detection based on Indian Standard Time (11:00 AM - 11:30 PM)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const ist = new Date(utc + (3600000 * 5.5)); // IST is UTC + 5:30
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const totalMins = (hours * 60) + minutes;

  const openMins = 11 * 60; // 11:00 AM = 660 mins
  const closeMins = (23 * 60) + 30; // 11:30 PM = 1410 mins

  const isOpen = totalMins >= openMins && totalMins < closeMins;
  return {
    isOpen,
    label: isOpen ? "OPEN NOW" : "CURRENTLY CLOSED",
    subtext: isOpen ? "Accepting Orders • 11:00 AM – 11:30 PM" : "Kitchen Opens at 11:00 AM",
    mode: "auto"
  };
}

// ===================== DATA STORAGE & MANAGEMENT =====================
const STORAGE_KEYS = {
  MENU: "hotdog_nation_menu_items_v2", // Upgraded version to reset cache to official new menu
  INFO: "hotdog_nation_restaurant_info_v2",
  CART: "hotdog_nation_cart"
};

function getRestaurantInfo() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.INFO);
    if (stored) {
      return { ...DEFAULT_RESTAURANT_INFO, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn("Could not load stored restaurant info", e);
  }
  return { ...DEFAULT_RESTAURANT_INFO };
}

function saveRestaurantInfo(info) {
  localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(info));
}

function getStoredMenu() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MENU);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not load stored menu", e);
  }
  return [...DEFAULT_MENU_ITEMS];
}

function saveMenu(menuItems) {
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
}

function resetMenuToDefault() {
  localStorage.removeItem(STORAGE_KEYS.MENU);
  localStorage.removeItem(STORAGE_KEYS.INFO);
  return {
    info: { ...DEFAULT_RESTAURANT_INFO },
    menu: [...DEFAULT_MENU_ITEMS]
  };
}

// Make accessible globally
if (typeof window !== "undefined") {
  window.HOTDOG_NATION_DATA = {
    DEFAULT_RESTAURANT_INFO,
    DEFAULT_MENU_ITEMS,
    BUILD_YOUR_OWN_CONFIG,
    getStoreOpenStatus,
    getRestaurantInfo,
    saveRestaurantInfo,
    getStoredMenu,
    saveMenu,
    resetMenuToDefault
  };
}
