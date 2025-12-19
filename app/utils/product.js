export const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone with advanced camera and A17 Pro chip",
    price: 134900,
    image: "/Featured Products/products/iphone15-pro.jpg",
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Apple",
    color: "Titanium",
    storage: "256GB",
    rating: 4.8,
    stock: 50,
    details: "Apple iPhone 15 Pro features a 6.1-inch Super Retina XDR display, A17 Pro chip, 48MP main camera with 4K video recording, and titanium design. Includes Face ID, Ceramic Shield protection, and IP68 water resistance. Available in Natural Titanium, Blue Titanium, White Titanium, and Black Titanium."
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with revolutionary Air cushioning",
    price: 12995,
    image: "/Featured Products/products/nike-airmax-270.jpg",
    category: "Fashion",
    subcategory: "Footwear",
    brand: "Nike",
    color: "Black/White",
    size: "UK 8-12",
    rating: 4.5,
    stock: 100,
    details: "Nike Air Max 270 features the tallest Air Max unit for incredible all-day comfort. Lightweight mesh upper with no-sew overlays for breathability. Rubber outsole with pressure-mapped zones for durability and traction. Perfect for casual wear and light workouts."
  },
  {
    id: 3,
    name: "MacBook Air M2",
    description: "Lightweight laptop with M2 chip and Liquid Retina display",
    price: 114900,
    image: "/Featured Products/products/macbook-air-m2.jpg",
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Apple",
    color: "Space Gray",
    storage: "256GB",
    ram: "8GB",
    rating: 4.7,
    stock: 30,
    details: "MacBook Air with M2 chip features a 13.6-inch Liquid Retina display, up to 18 hours battery life, 8-core CPU, 10-core GPU, and 16-core Neural Engine. Ultra-thin design (11.3mm), MagSafe charging, and two Thunderbolt ports. Includes Touch ID and Force Touch trackpad."
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    description: "Advanced smartwatch with health monitoring features",
    price: 41900,
    image: "/Featured Products/products/apple-watch-9.jpg",
    category: "Electronics",
    subcategory: "Wearables",
    brand: "Apple",
    color: "Midnight",
    size: "45mm",
    rating: 4.6,
    stock: 75,
    details: "Apple Watch Series 9 features S9 chip for faster performance, advanced health monitoring (ECG, blood oxygen, heart rate), always-on Retina display, GPS, and water resistance up to 50m. Includes fitness tracking, sleep monitoring, and seamless iPhone integration."
  }
];

export const categories = [
  { name: 'Electronics', icon: '💻', subcategories: ['Smartphones', 'Laptops', 'Wearables', 'Audio', 'Cameras', 'Tablets'] },
  { name: 'Fashion', icon: '👕', subcategories: ['Men', 'Women', 'Kids', 'Footwear', 'Accessories', 'Ethnic Wear'] },
  { name: 'Home', icon: '🏠', subcategories: ['Furniture', 'Kitchen', 'Decor', 'Bedding', 'Lighting', 'Appliances'] },
  { name: 'Beauty', icon: '💄', subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare', 'Bath & Body'] },
  { name: 'Books', icon: '📚', subcategories: ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Self-Help', 'Comics'] },
  { name: 'Sports', icon: '⚽', subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Cycling', 'Yoga', 'Swimming'] },
];

export const allProducts = [
  // Featured Products
  ...featuredProducts,

  // Electronics - Smartphones
  {
    id: 5,
    name: "Samsung Galaxy S23 Ultra",
    description: "Premium Android smartphone with S Pen and 200MP camera",
    price: 124999,
    image: "/Featured Products/products/samsung-s23-ultra.jpg",
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Samsung",
    color: "Phantom Black",
    storage: "256GB",
    rating: 4.7,
    stock: 40,
    details: "Samsung Galaxy S23 Ultra features 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2 chip, 200MP main camera with 100x Space Zoom, built-in S Pen, and 5000mAh battery. Includes IP68 rating, 45W fast charging, and ultrasonic fingerprint sensor."
  },
  {
    id: 6,
    name: "OnePlus 11 5G",
    description: "Flagship killer with Hasselblad camera and Snapdragon 8 Gen 2",
    price: 56999,
    image: "/Featured Products/products/oneplus-11.jpg",
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "OnePlus",
    color: "Titan Black",
    storage: "128GB",
    rating: 4.6,
    stock: 60,
    details: "OnePlus 11 features 6.7-inch Fluid AMOLED display, Snapdragon 8 Gen 2 processor, Hasselblad triple camera system (50MP main), 5000mAh battery with 100W SuperVOOC charging. Includes alert slider, Dolby Atmos, and 2-year Android updates."
  },

  // Electronics - Laptops
  {
    id: 7,
    name: "Dell XPS 13",
    description: "Premium ultrabook with InfinityEdge display",
    price: 124990,
    image: "/Featured Products/products/dell-xps13.jpg",
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Dell",
    color: "Platinum Silver",
    storage: "512GB",
    ram: "16GB",
    rating: 4.5,
    stock: 25,
    details: "Dell XPS 13 features 13.4-inch InfinityEdge display, Intel Core i7 processor, 16GB RAM, 512GB SSD, and Windows 11 Pro. Ultra-thin design (14.8mm), carbon fiber palm rest, and long battery life. Perfect for professionals and creators."
  },
  {
    id: 8,
    name: "HP Pavilion 15",
    description: "Powerful laptop for work and entertainment",
    price: 64990,
    image: "/Featured Products/products/hp-pavilion15.jpg",
    category: "Electronics",
    subcategory: "Laptops",
    brand: "HP",
    color: "Silver",
    storage: "1TB",
    ram: "16GB",
    rating: 4.3,
    stock: 45,
    details: "HP Pavilion 15 features 15.6-inch Full HD display, Intel Core i5 processor, NVIDIA GeForce MX450 graphics, 16GB RAM, 1TB SSD. Includes backlit keyboard, B&O audio, and fast charging. Great for students and professionals."
  },

  // Electronics - Audio
  {
    id: 9,
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling headphones",
    price: 29990,
    image: "/Featured Products/products/sony-xm5.jpg",
    category: "Electronics",
    subcategory: "Audio",
    brand: "Sony",
    color: "Black",
    rating: 4.8,
    stock: 80,
    details: "Sony WH-1000XM5 features industry-leading noise cancellation, 30-hour battery life, premium sound quality with LDAC, and multipoint Bluetooth. Includes speak-to-chat technology, quick attention mode, and comfortable fit for all-day wear."
  },
  {
    id: 10,
    name: "JBL Flip 6",
    description: "Portable Bluetooth speaker with powerful sound",
    price: 9990,
    image: "/Featured Products/products/jbl-flip6.jpg",
    category: "Electronics",
    subcategory: "Audio",
    brand: "JBL",
    color: "Blue",
    rating: 4.4,
    stock: 120,
    details: "JBL Flip 6 features IP67 waterproof and dustproof rating, 12 hours of playtime, JBL Pro Sound, and PartyBoost for stereo pairing. Rugged design perfect for outdoor adventures, pool parties, and travel."
  },

  // Fashion - Men
  {
    id: 11,
    name: "Levi's 501 Original Jeans",
    description: "Iconic straight fit jeans",
    price: 4999,
    image: "/Featured Products/products/levis-501.jpg",
    category: "Fashion",
    subcategory: "Men",
    brand: "Levi's",
    color: "Mid Blue",
    size: "28-42",
    rating: 4.6,
    stock: 150,
    details: "Levi's 501 Original jeans feature button fly, straight leg fit, and rigid denim that softens with wear. Made from 100% cotton with signature red tab and leather patch. A timeless classic that never goes out of style."
  },
  {
    id: 12,
    name: "Van Heusen Formal Shirt",
    description: "Premium cotton formal shirt",
    price: 1999,
    image: "/Featured Products/products/vanheusen-shirt.jpg",
    category: "Fashion",
    subcategory: "Men",
    brand: "Van Heusen",
    color: "White",
    size: "S-XXL",
    rating: 4.3,
    stock: 200,
    details: "Van Heusen formal shirt made from premium 100% cotton with easy-care finish. Features classic collar, single cuff, and perfect for office wear. Available in multiple colors and sizes."
  },

  // Fashion - Women
  {
    id: 13,
    name: "Zara Midi Dress",
    description: "Floral print midi dress with flowing silhouette",
    price: 3590,
    image: "/Featured Products/products/zara-dress.jpg",
    category: "Fashion",
    subcategory: "Women",
    brand: "Zara",
    color: "Floral Print",
    size: "XS-XL",
    rating: 4.5,
    stock: 90,
    details: "Zara floral midi dress features V-neck, flowing silhouette, and lightweight fabric. Perfect for summer occasions, parties, and casual outings. Easy care material that doesn't wrinkle easily."
  },
  {
    id: 14,
    name: "H&M Blouse",
    description: "Silk blend elegant blouse",
    price: 2499,
    image: "/Featured Products/products/hm-blouse.jpg",
    category: "Fashion",
    subcategory: "Women",
    brand: "H&M",
    color: "Black",
    size: "S-L",
    rating: 4.2,
    stock: 110,
    details: "H&M silk blend blouse features classic collar, button-down design, and premium fabric. Versatile piece that can be paired with trousers, skirts, or jeans for office or evening wear."
  },

  // Fashion - Footwear
  {
    id: 15,
    name: "Adidas Ultraboost 22",
    description: "Running shoes with responsive cushioning",
    price: 14999,
    image: "/Featured Products/products/adidas-ultraboost.jpg",
    category: "Fashion",
    subcategory: "Footwear",
    brand: "Adidas",
    color: "Core Black",
    size: "UK 6-12",
    rating: 4.7,
    stock: 85,
    details: "Adidas Ultraboost 22 features Boost midsole for energy return, Primeknit upper for adaptive fit, and Continental rubber outsole for traction. Perfect for running, training, and all-day comfort."
  },
  {
    id: 16,
    name: "Puma RS-X Sneakers",
    description: "Chunky sneakers with retro design",
    price: 6999,
    image: "/Featured Products/products/puma-rsx.jpg",
    category: "Fashion",
    subcategory: "Footwear",
    brand: "Puma",
    color: "White/Blue",
    size: "UK 6-11",
    rating: 4.4,
    stock: 95,
    details: "Puma RS-X sneakers feature chunky retro design, comfortable cushioning, and breathable mesh upper. Inspired by 80s running shoes with modern comfort technology. Perfect for casual streetwear."
  },

  // Beauty - Skincare
  {
    id: 17,
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    description: "Oil control and blemish solution",
    price: 649,
    image: "/Featured Products/products/ordinary-niacinamide.jpg",
    category: "Beauty",
    subcategory: "Skincare",
    brand: "The Ordinary",
    volume: "30ml",
    rating: 4.6,
    stock: 200,
    details: "The Ordinary Niacinamide 10% + Zinc 1% helps reduce blemishes, congestion, and oiliness. Supports skin barrier function and reduces inflammation. Suitable for oily and combination skin types."
  },
  {
    id: 18,
    name: "Cetaphil Gentle Skin Cleanser",
    description: "Mild cleanser for sensitive skin",
    price: 799,
    image: "/Featured Products/products/cetaphil-cleanser.jpg",
    category: "Beauty",
    subcategory: "Skincare",
    brand: "Cetaphil",
    volume: "250ml",
    rating: 4.7,
    stock: 180,
    details: "Cetaphil Gentle Skin Cleanser is soap-free, non-irritating, and pH-balanced. Ideal for dry to normal, sensitive skin. Removes impurities without stripping skin's natural oils."
  },

  // Books - Fiction
  {
    id: 19,
    name: "The Midnight Library",
    description: "Novel by Matt Haig about choices and regrets",
    price: 499,
    image: "/Featured Products/products/midnight-library.jpg",
    category: "Books",
    subcategory: "Fiction",
    author: "Matt Haig",
    pages: 304,
    rating: 4.5,
    stock: 75,
    details: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. A novel about all the choices that go into a life well lived."
  },
  {
    id: 20,
    name: "It Ends With Us",
    description: "Contemporary romance novel by Colleen Hoover",
    price: 399,
    image: "/Featured Products/products/it-ends-with-us.jpg",
    category: "Books",
    subcategory: "Fiction",
    author: "Colleen Hoover",
    pages: 384,
    rating: 4.6,
    stock: 120,
    details: "Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants. A brave and heartbreaking novel that digs its claws into you and doesn't let go."
  },

  // Books - Non-Fiction
  {
    id: 21,
    name: "Atomic Habits",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    price: 599,
    image: "/Featured Products/products/atomic-habits.jpg",
    category: "Books",
    subcategory: "Non-Fiction",
    author: "James Clear",
    pages: 320,
    rating: 4.8,
    stock: 150,
    details: "Tiny Changes, Remarkable Results. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results."
  },
  {
    id: 22,
    name: "Ikigai: The Japanese Secret to a Long and Happy Life",
    description: "Finding purpose and joy in everyday life",
    price: 349,
    image: "/Featured Products/products/ikigai.jpg",
    category: "Books",
    subcategory: "Non-Fiction",
    author: "Héctor García and Francesc Miralles",
    pages: 208,
    rating: 4.4,
    stock: 90,
    details: "The people of Japan believe that everyone has an ikigai - a reason to jump out of bed each morning. This book will bring you closer to finding your own ikigai."
  },

  // Home - Kitchen
  {
    id: 23,
    name: "Milton Thermosteel Flask 1 Litre",
    description: "Double wall stainless steel flask",
    price: 899,
    image: "/Featured Products/products/milton-flask.jpg",
    category: "Home",
    subcategory: "Kitchen",
    brand: "Milton",
    capacity: "1 Litre",
    rating: 4.5,
    stock: 200,
    details: "Milton Thermosteel flask features double wall vacuum insulation, keeps beverages hot for 24 hours or cold for 30 hours. 100% leak-proof, rust-proof, and durable stainless steel construction."
  },
  {
    id: 24,
    name: "Prestige Popular Aluminum Pressure Cooker",
    description: "3-litre pressure cooker for Indian cooking",
    price: 1499,
    image: "/Featured Products/products/prestige-cooker.jpg",
    category: "Home",
    subcategory: "Kitchen",
    brand: "Prestige",
    capacity: "3 Litres",
    rating: 4.6,
    stock: 150,
    details: "Prestige Popular pressure cooker features hard anodized aluminum body, 3-litre capacity, and safety valve. Perfect for Indian cooking - cooks rice, dal, vegetables quickly and efficiently."
  },

  // Home - Furniture
  {
    id: 25,
    name: "Urban Ladder Study Table",
    description: "Modern study table with storage",
    price: 7999,
    image: "/Featured Products/products/study-table.jpg",
    category: "Home",
    subcategory: "Furniture",
    brand: "Urban Ladder",
    material: "Engineered Wood",
    rating: 4.3,
    stock: 40,
    details: "Urban Ladder study table features modern design with bookshelf and drawer storage. Made from high-quality engineered wood with laminate finish. Perfect for home office or student study area."
  },
  {
    id: 26,
    name: "Wakefit Orthopedic Memory Foam Mattress",
    description: "Dual comfort mattress for back support",
    price: 12999,
    image: "/Featured Products/products/wakefit-mattress.jpg",
    category: "Home",
    subcategory: "Furniture",
    brand: "Wakefit",
    size: "Queen (60x78 inches)",
    rating: 4.7,
    stock: 30,
    details: "Wakefit Orthopedic Memory Foam mattress features dual comfort zones, 6-inch high resilience foam, and 2-inch memory foam layer. Provides excellent back support and pressure relief. 100-night trial period."
  },

  // Sports - Fitness
  {
    id: 27,
    name: "Decathlon Dumbbell Set",
    description: "Adjustable dumbbells for home workout",
    price: 2999,
    image: "/Featured Products/products/decathlon-dumbbell.jpg",
    category: "Sports",
    subcategory: "Fitness",
    brand: "Decathlon",
    weight: "10kg each",
    rating: 4.4,
    stock: 80,
    details: "Decathlon adjustable dumbbell set includes two 10kg dumbbells with weight plates and spinlock collars. Perfect for home workouts, strength training, and full-body exercises. Durable cast iron construction."
  },
  {
    id: 28,
    name: "Nike Pro Training Gloves",
    description: "Weight training gloves with wrist support",
    price: 1499,
    image: "/Featured Products/products/nike-gloves.jpg",
    category: "Sports",
    subcategory: "Fitness",
    brand: "Nike",
    size: "M-XL",
    rating: 4.3,
    stock: 120,
    details: "Nike Pro training gloves feature breathable mesh, padded palms, and adjustable wrist strap. Protects hands during weightlifting, pull-ups, and other gym exercises. Enhances grip and comfort."
  },

  // Sports - Outdoor
  {
    id: 29,
    name: "Wildcraft 45 Litre Backpack",
    description: "Water-resistant backpack for trekking",
    price: 2499,
    image: "/Featured Products/products/wildcraft-backpack.jpg",
    category: "Sports",
    subcategory: "Outdoor",
    brand: "Wildcraft",
    capacity: "45 Litres",
    rating: 4.5,
    stock: 60,
    details: "Wildcraft trekking backpack features water-resistant fabric, multiple compartments, padded shoulder straps, and waist belt. Perfect for day hikes, camping trips, and adventure travel. Comes with rain cover."
  },
  {
    id: 30,
    name: "Quechua Camping Tent 2 Person",
    description: "Waterproof tent for camping",
    price: 3999,
    image: "/Featured Products/products/quechua-tent.jpg",
    category: "Sports",
    subcategory: "Outdoor",
    brand: "Quechua",
    capacity: "2 Person",
    rating: 4.4,
    stock: 35,
    details: "Quechua 2-person camping tent features waterproof coating (2000mm), breathable mesh windows, and quick setup system. Includes carry bag, stakes, and guy lines. Perfect for weekend camping trips."
  }
];

export const getProductById = (id) => {
  return allProducts.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductsBySubcategory = (category, subcategory) => {
  return allProducts.filter(product =>
    product.category.toLowerCase() === category.toLowerCase() &&
    product.subcategory === subcategory
  );
};

export const getFeaturedProducts = () => {
  return featuredProducts;
};

export const getAllCategories = () => {
  return categories;
};

export const getBrands = () => {
  const brands = [...new Set(allProducts.map(product => product.brand))];
  return brands.filter(brand => brand !== undefined);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand?.toLowerCase().includes(searchTerm)
  );
};