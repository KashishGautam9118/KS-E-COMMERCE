// Base API URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Returns featured products from static data for consistency
 */
export const getFeaturedProducts = async () => {
  // Return consistent static data to ensure featured products don&apos;t change based on login state
  return getFallbackFeaturedProducts();
};

/**
 * Enhanced fallback featured products data
 */
const getFallbackFeaturedProducts = () => {
  return [
    {
      id: 1,
      name: 'Nike Air Force 1',
      description: 'Classic sneakers with iconic style and comfort',
      price: 7999,
      originalPrice: 9999,
      image: '/Featured Products/Nike-Air-Force-1.jpg',
      category: 'Fashion',
      subcategory: 'Footwear',
      brand: 'Nike',
      rating: 4.5,
      discount: 20,
      stock: 45,
      isFeatured: true,
      colors: ['White', 'Black'],
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
    },
    {
      id: 2,
      name: 'Atomic Habits by James Clear',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      price: 799,
      originalPrice: 999,
      image: '/Featured Products/Atomic Habits.jpeg',
      category: 'Books',
      subcategory: 'Self-Help',
      brand: 'Penguin',
      rating: 4.7,
      discount: 20,
      stock: 120,
      isFeatured: true,
      author: 'James Clear',
      pages: 320
    },
    {
      id: 3,
      name: 'Adidas Adjustable Dumbbells Set',
      description: 'Adjustable weight dumbbells for home workout',
      price: 3499,
      originalPrice: 4999,
      image: '/Featured Products/Adidas Dumbbells Set.jpeg',
      category: 'Sports',
      subcategory: 'Fitness',
      brand: 'Adidas',
      rating: 4.3,
      discount: 30,
      stock: 25,
      isFeatured: true,
      weight: '10kg each',
      material: 'Cast Iron'
    },
    {
      id: 4,
      name: 'Levi\'s 501 Original Fit Jeans',
      description: 'Iconic straight leg jeans with button fly',
      price: 4999,
      originalPrice: 5999,
      image: '/Featured Products/Levi 501 Original Jeans.jpeg',
      category: 'Fashion',
      subcategory: 'Clothing',
      brand: 'Levi\'s',
      rating: 4.6,
      discount: 17,
      stock: 80,
      isFeatured: true,
      colors: ['Blue', 'Black'],
      sizes: ['28', '30', '32', '34', '36']
    },
    {
      id: 5,
      name: 'Ray-Ban Aviator Sunglasses',
      description: 'Classic aviator style with UV protection',
      price: 8999,
      originalPrice: 11999,
      image: '/Featured Products/Ray-Ban Aviator Sunglasses.png',
      category: 'Fashion',
      subcategory: 'Accessories',
      brand: 'Ray-Ban',
      rating: 4.8,
      discount: 25,
      stock: 35,
      isFeatured: true,
      lensColor: ['Green', 'Grey', 'Brown'],
      frameColor: ['Gold', 'Silver']
    },
    {
      id: 6,
      name: 'Wilson Pro Staff Tennis Racket',
      description: 'Professional tennis racket for advanced players',
      price: 12999,
      originalPrice: 15999,
      image: '/Featured Products/Wilson Tennis Racket.jpeg',
      category: 'Sports',
      subcategory: 'Tennis',
      brand: 'Wilson',
      rating: 4.4,
      discount: 19,
      stock: 15,
      isFeatured: true,
      gripSize: ['G2', 'G3', 'G4'],
      stringPattern: '16x19'
    },
    {
      id: 7,
      name: 'Apple iPhone 15 Pro',
      description: 'Latest iPhone with A17 Pro chip and titanium design',
      price: 134900,
      originalPrice: 139900,
      image: '/Featured Products/Apple iPhone 15 Pro.jpeg',
      category: 'Electronics',
      subcategory: 'Smartphones',
      brand: 'Apple',
      rating: 4.9,
      discount: 4,
      stock: 20,
      isFeatured: true,
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium'],
      storage: ['128GB', '256GB', '512GB']
    },
    {
      id: 8,
      name: 'Sony WH-1000XM5 Headphones',
      description: 'Industry-leading noise cancelling headphones',
      price: 28990,
      originalPrice: 32990,
      image: '/Featured Products/Sony WH-1000XM5 Headphones.jpeg',
      category: 'Electronics',
      subcategory: 'Audio',
      brand: 'Sony',
      rating: 4.8,
      discount: 12,
      stock: 40,
      isFeatured: true,
      batteryLife: '30 hours',
      colors: ['Black', 'Silver']
    },
    {
      id: 9,
      name: 'MacBook Pro 16-inch',
      description: 'Powerful laptop for professionals',
      price: 239900,
      originalPrice: 249900,
      image: '/Featured Products/MacBook Pro 16-inch.jpeg',
      category: 'Electronics',
      subcategory: 'Laptops',
      brand: 'Apple',
      rating: 4.9,
      discount: 4,
      stock: 15,
      isFeatured: true,
      processor: 'M3 Pro',
      storage: '512GB SSD'
    },
    {
      id: 10,
      name: 'Nike Air Max 270',
      description: 'Comfortable running shoes with Air Max technology',
      price: 11999,
      originalPrice: 14999,
      image: '/Featured Products/Nike Air Max 270.jpeg',
      category: 'Fashion',
      subcategory: 'Footwear',
      brand: 'Nike',
      rating: 4.6,
      discount: 20,
      stock: 50,
      isFeatured: true,
      colors: ['Black', 'White', 'Red'],
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
    },
    {
      id: 11,
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Flagship smartphone with S Pen',
      price: 129999,
      originalPrice: 139999,
      image: '/Featured Products/Samsung Galaxy S24 Ultra.jpeg',
      category: 'Electronics',
      subcategory: 'Smartphones',
      brand: 'Samsung',
      rating: 4.8,
      discount: 7,
      stock: 25,
      isFeatured: true,
      colors: ['Titanium Black', 'Titanium Gray'],
      storage: ['256GB', '512GB', '1TB']
    },
    {
      id: 12,
      name: 'Adidas Ultraboost 22',
      description: 'High-performance running shoes',
      price: 18999,
      originalPrice: 22999,
      image: '/Featured Products/Adidas Ultraboost 22.jpeg',
      category: 'Sports',
      subcategory: 'Footwear',
      brand: 'Adidas',
      rating: 4.7,
      discount: 17,
      stock: 35,
      isFeatured: true,
      colors: ['Black', 'White', 'Blue'],
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
    },
    {
      id: 13,
      name: 'Canon EOS R5',
      description: 'Professional mirrorless camera',
      price: 349900,
      originalPrice: 399900,
      image: '/Featured Products/Canon EOS R5.jpeg',
      category: 'Electronics',
      subcategory: 'Cameras',
      brand: 'Canon',
      rating: 4.9,
      discount: 12,
      stock: 10,
      isFeatured: true,
      sensor: '45MP Full-Frame',
      video: '8K'
    },
    {
      id: 14,
      name: 'Rolex Submariner',
      description: 'Iconic luxury dive watch',
      price: 2500000,
      originalPrice: 2800000,
      image: '/Featured Products/Rolex Submariner.jpeg',
      category: 'Fashion',
      subcategory: 'Accessories',
      brand: 'Rolex',
      rating: 5.0,
      discount: 11,
      stock: 5,
      isFeatured: true,
      material: 'Stainless Steel',
      waterResistance: '300m'
    },
    {
      id: 15,
      name: 'Dyson V15 Detect',
      description: 'Advanced cordless vacuum cleaner',
      price: 69900,
      originalPrice: 79900,
      image: '/Featured Products/Dyson V15 Detect.jpeg',
      category: 'Home & Kitchen',
      subcategory: 'Appliances',
      brand: 'Dyson',
      rating: 4.8,
      discount: 13,
      stock: 20,
      isFeatured: true,
      batteryLife: '60 minutes',
      suctionPower: '260AW'
    },
    {
      id: 16,
      name: 'Peloton Bike+',
      description: 'Interactive exercise bike with screen',
      price: 249500,
      originalPrice: 299500,
      image: '/Featured Products/Peloton Bike+.jpeg',
      category: 'Sports',
      subcategory: 'Fitness',
      brand: 'Peloton',
      rating: 4.7,
      discount: 17,
      stock: 8,
      isFeatured: true,
      screenSize: '23.8 inches',
      classes: 'Unlimited'
    }
  ];
};

/**
 * Fetches categories from API with fallback to static data
 */
export const getCategories = async () => {
  try {
    // Use timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Increased timeout to 10 seconds

    const res = await fetch(`${API_BASE_URL}/api/products/categories`, {
      cache: 'no-store',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    // Transform and validate category data
    return data.map(category => ({
      id: category.id || category._id,
      name: category.name || 'Unnamed Category',
      icon: category.icon || getDefaultIcon(category.name),
      description: category.description || '',
      image: category.image 
        ? (category.image.startsWith('http') ? category.image : `${API_BASE_URL}${category.image}`)
        : '/default-category.jpg',
      slug: category.slug || generateSlug(category.name),
      productCount: category.productCount || 0,
      isActive: category.isActive !== undefined ? category.isActive : true,
      subcategories: category.subcategories || []
    }));
    
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    
    // Fallback to enhanced static categories
    return getFallbackCategories();
  }
};

/**
 * Enhanced fallback categories data
 */
const getFallbackCategories = () => {
  return [
    {
      id: 1,
      name: 'Fashion',
      icon: 'fa-shirt',
      description: 'Clothing, footwear, and accessories for men, women, and kids',
      image: '/categories/fashion.jpg',
      slug: 'fashion',
      productCount: 1250,
      isActive: true,
      subcategories: ['Men', 'Women', 'Kids', 'Footwear', 'Accessories', 'Ethnic Wear']
    },
    {
      id: 2,
      name: 'Electronics',
      icon: 'fa-laptop',
      description: 'Latest gadgets, smartphones, laptops, and home appliances',
      image: '/categories/electronics.jpg',
      slug: 'electronics',
      productCount: 890,
      isActive: true,
      subcategories: ['Smartphones', 'Laptops', 'Audio', 'Wearables', 'Cameras', 'Gaming']
    },
    {
      id: 3,
      name: 'Beauty',
      icon: 'fa-spa',
      description: 'Skincare, makeup, fragrances, and personal care products',
      image: '/categories/beauty.jpg',
      slug: 'beauty',
      productCount: 670,
      isActive: true,
      subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare', 'Bath & Body']
    },
    {
      id: 4,
      name: 'Home & Living',
      icon: 'fa-couch',
      description: 'Furniture, decor, kitchenware, and home improvement',
      image: '/categories/home-living.jpg',
      slug: 'home-living',
      productCount: 540,
      isActive: true,
      subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Lighting', 'Storage']
    },
    {
      id: 5,
      name: 'Sports & Fitness',
      icon: 'fa-dumbbell',
      description: 'Sports equipment, fitness gear, and outdoor accessories',
      image: '/categories/sports.jpg',
      slug: 'sports-fitness',
      productCount: 320,
      isActive: true,
      subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Yoga', 'Cycling', 'Swimming']
    },
    {
      id: 6,
      name: 'Books & Stationery',
      icon: 'fa-book',
      description: 'Books, magazines, educational material, and stationery',
      image: '/categories/books.jpg',
      slug: 'books-stationery',
      productCount: 210,
      isActive: true,
      subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Stationery', 'Office Supplies']
    },
    {
      id: 7,
      name: 'Toys & Games',
      icon: 'fa-gamepad',
      description: 'Toys, board games, video games, and educational toys',
      image: '/categories/toys.jpg',
      slug: 'toys-games',
      productCount: 180,
      isActive: true,
      subcategories: ['Action Figures', 'Board Games', 'Educational Toys', 'Outdoor Toys', 'Puzzles']
    },
    {
      id: 8,
      name: 'Groceries',
      icon: 'fa-shopping-basket',
      description: 'Fresh produce, packaged foods, beverages, and daily essentials',
      image: '/categories/groceries.jpg',
      slug: 'groceries',
      productCount: 1500,
      isActive: true,
      subcategories: ['Fresh Produce', 'Snacks', 'Beverages', 'Dairy', 'Bakery', 'Frozen Foods']
    }
  ];
};

/**
 * Helper function to get default icon for category
 */
const getDefaultIcon = (categoryName) => {
  const iconMap = {
    'fashion': 'fa-shirt',
    'electronics': 'fa-laptop',
    'beauty': 'fa-spa',
    'home': 'fa-home',
    'sports': 'fa-dumbbell',
    'books': 'fa-book',
    'toys': 'fa-gamepad',
    'groceries': 'fa-shopping-basket',
    'automotive': 'fa-car',
    'health': 'fa-heart',
    'baby': 'fa-baby',
    'pets': 'fa-paw',
    'jewelry': 'fa-gem',
    'travel': 'fa-suitcase',
    'office': 'fa-briefcase',
    'music': 'fa-music',
    'movies': 'fa-film',
    'garden': 'fa-seedling'
  };
  
  const lowerName = categoryName.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) {
      return icon;
    }
  }
  
  return 'fa-tag';
};

/**
 * Helper function to generate slug from category name
 */
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

/**
 * Fetches all products with pagination support
 */
export const getAllProducts = async (page = 1, limit = 20, filters = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });

    const res = await fetch(`${API_BASE_URL}/api/products?${queryParams}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    return {
      products: data.products || [],
      total: data.total || 0,
      page: data.page || page,
      totalPages: data.totalPages || 1
    };
    
  } catch (err) {
    console.error('Error fetching products:', err.message);
    return {
      products: getFallbackFeaturedProducts().slice(0, limit),
      total: getFallbackFeaturedProducts().length,
      page: 1,
      totalPages: Math.ceil(getFallbackFeaturedProducts().length / limit)
    };
  }
};

/**
 * Fetches single product by ID
 */
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const product = await res.json();
    return {
      ...product,
      price: parseFloat(String(product.price).replace(/,/g, '')) || 0,
      image: product.image 
        ? (product.image.startsWith('http') ? product.image : `${API_BASE_URL}${product.image}`)
        : '/default-product.jpg'
    };
    
  } catch (err) {
    console.error('Error fetching product:', err.message);
    // Return matching product from fallback data
    const fallbackProducts = getFallbackFeaturedProducts();
    const foundProduct = fallbackProducts.find(product => product.id === parseInt(id)) || fallbackProducts[0];
    return foundProduct || null;
  }
};