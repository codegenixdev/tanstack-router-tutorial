type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

type Subcategory = {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string;
};

type ProductSpecification = {
  [key: string]: string | string[] | number;
};

type Product = {
  id: number;
  subcategoryId: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  specifications: ProductSpecification;
};

export async function getCategories(): Promise<Category[]> {
  return [
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices and gadgets",
    },
    {
      id: 2,
      name: "Clothing",
      slug: "clothing",
      description: "Apparel and fashion items",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      slug: "home-kitchen",
      description: "Home decor and kitchen appliances",
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      slug: "sports-outdoors",
      description: "Athletic and outdoor equipment",
    },
    {
      id: 5,
      name: "Books",
      slug: "books",
      description: "Books and publications",
    },
  ];
}

export async function getSubcategories(): Promise<Subcategory[]> {
  return [
    {
      id: 101,
      categoryId: 1,
      name: "Smartphones",
      slug: "smartphones",
      description: "Mobile phones and accessories",
    },
    {
      id: 102,
      categoryId: 1,
      name: "Laptops",
      slug: "laptops",
      description: "Notebook computers and accessories",
    },
    {
      id: 103,
      categoryId: 1,
      name: "Audio",
      slug: "audio",
      description: "Headphones, speakers, and sound equipment",
    },

    {
      id: 201,
      categoryId: 2,
      name: "Men's Clothing",
      slug: "mens-clothing",
      description: "Clothing for men",
    },
    {
      id: 202,
      categoryId: 2,
      name: "Women's Clothing",
      slug: "womens-clothing",
      description: "Clothing for women",
    },
    {
      id: 203,
      categoryId: 2,
      name: "Accessories",
      slug: "accessories",
      description: "Fashion accessories",
    },

    {
      id: 301,
      categoryId: 3,
      name: "Kitchen Appliances",
      slug: "kitchen-appliances",
      description: "Appliances for the kitchen",
    },
    {
      id: 302,
      categoryId: 3,
      name: "Furniture",
      slug: "furniture",
      description: "Home furniture items",
    },
    {
      id: 303,
      categoryId: 3,
      name: "Bedding",
      slug: "bedding",
      description: "Sheets, pillows, and bedding items",
    },

    {
      id: 401,
      categoryId: 4,
      name: "Fitness Equipment",
      slug: "fitness-equipment",
      description: "Equipment for exercise and fitness",
    },
    {
      id: 402,
      categoryId: 4,
      name: "Outdoor Gear",
      slug: "outdoor-gear",
      description: "Equipment for outdoor activities",
    },

    {
      id: 501,
      categoryId: 5,
      name: "Fiction",
      slug: "fiction",
      description: "Fictional books and novels",
    },
    {
      id: 502,
      categoryId: 5,
      name: "Non-Fiction",
      slug: "non-fiction",
      description: "Non-fictional books and literature",
    },
  ];
}

export async function getProducts(): Promise<Product[]> {
  return [
    {
      id: 1001,
      subcategoryId: 101,
      name: "XPhone 14 Pro",
      slug: "xphone-14-pro",
      description: "Latest flagship smartphone with advanced camera system",
      price: 999.99,
      stock: 50,
      images: ["xphone14-1.jpg", "xphone14-2.jpg"],
      specifications: {
        display: "6.1-inch Super Retina XDR",
        processor: "A16 Bionic",
        storage: "256GB",
        camera: "48MP main camera",
      },
    },
    {
      id: 1002,
      subcategoryId: 101,
      name: "Galaxy Ultra S23",
      slug: "galaxy-ultra-s23",
      description: "Premium Android smartphone with exceptional battery life",
      price: 1199.99,
      stock: 35,
      images: ["galaxy-s23-1.jpg", "galaxy-s23-2.jpg"],
      specifications: {
        display: "6.8-inch Dynamic AMOLED 2X",
        processor: "Snapdragon 8 Gen 2",
        storage: "512GB",
        camera: "200MP main camera",
      },
    },
    {
      id: 2001,
      subcategoryId: 102,
      name: "MacBook Air M2",
      slug: "macbook-air-m2",
      description: "Thin and light laptop with powerful performance",
      price: 1299.99,
      stock: 25,
      images: ["macbook-air-1.jpg", "macbook-air-2.jpg"],
      specifications: {
        display: "13.6-inch Liquid Retina",
        processor: "Apple M2",
        storage: "512GB SSD",
        memory: "16GB unified memory",
      },
    },
    {
      id: 3001,
      subcategoryId: 103,
      name: "SoundMax Pro Headphones",
      slug: "soundmax-pro-headphones",
      description: "Wireless noise-cancelling headphones with premium sound",
      price: 349.99,
      stock: 100,
      images: ["soundmax-1.jpg", "soundmax-2.jpg"],
      specifications: {
        type: "Over-ear",
        battery: "30 hours",
        connectivity: "Bluetooth 5.2",
        features: "Active Noise Cancellation",
      },
    },
    {
      id: 4001,
      subcategoryId: 201,
      name: "Classic Fit Dress Shirt",
      slug: "classic-fit-dress-shirt",
      description: "Professional dress shirt for formal occasions",
      price: 59.99,
      stock: 200,
      images: ["dress-shirt-1.jpg", "dress-shirt-2.jpg"],
      specifications: {
        material: "100% Cotton",
        fit: "Classic",
        care: "Machine washable",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    },
    {
      id: 5001,
      subcategoryId: 202,
      name: "Summer Floral Dress",
      slug: "summer-floral-dress",
      description: "Lightweight floral pattern dress for summer",
      price: 79.99,
      stock: 150,
      images: ["floral-dress-1.jpg", "floral-dress-2.jpg"],
      specifications: {
        material: "Rayon blend",
        fit: "A-line",
        care: "Hand wash cold",
        sizes: ["XS", "S", "M", "L", "XL"],
      },
    },
  ];
}

export async function getSubcategoriesByCategory(
  categoryId: number
): Promise<Subcategory[]> {
  const subcategories = await getSubcategories();
  return subcategories.filter(
    (subcategory) => subcategory.categoryId === categoryId
  );
}

export async function getProductsBySubcategory(
  subcategoryId: number
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.subcategoryId === subcategoryId);
}

export async function getProductsByCategory(
  categoryId: number
): Promise<Product[]> {
  const subcategories = await getSubcategoriesByCategory(categoryId);
  const subcategoryIds = subcategories.map((subcategory) => subcategory.id);
  const products = await getProducts();

  return products.filter((product) =>
    subcategoryIds.includes(product.subcategoryId)
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const lowercaseQuery = query.toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
  );
}

export async function getProductById(
  productId: number
): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.id === productId) || null;
}

export async function getCategoryById(
  categoryId: number
): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.id === categoryId) || null;
}

export async function getReports() {
  return {
    totalSales: 100000,
    totalOrders: 1000,
    totalCustomers: 100,
    totalProducts: 100,
    totalCategories: 10,
    totalSubcategories: 10,
  };
}

export const LOCALES = ["en", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export type BlogPost = {
  id: number;
  title: string;
  description: string;
  slug: string;
};

export type BlogCategory = {
  categoryId: number;
  title: string;
  description: string;
  slug: string;
  posts: BlogPost[];
};

export type BlogData = {
  [key in Locale]: BlogCategory[];
};

const blog: BlogData = {
  en: [
    {
      categoryId: 1,
      title: "Technology",
      description: "Latest tech news and updates",
      slug: "technology",
      posts: [
        {
          id: 1,
          title: "The Future of AI",
          description:
            "Exploring how artificial intelligence will shape our future",
          slug: "future-of-ai",
        },
        {
          id: 2,
          title: "Web Development Trends",
          description: "Top web development trends to watch this year",
          slug: "web-development-trends",
        },
      ],
    },
    {
      categoryId: 2,
      title: "Business",
      description: "Business insights and strategies",
      slug: "business",
      posts: [
        {
          id: 3,
          title: "Remote Work Strategies",
          description: "Effective strategies for managing remote teams",
          slug: "remote-work-strategies",
        },
        {
          id: 4,
          title: "Digital Marketing Guide",
          description: "A comprehensive guide to digital marketing in 2025",
          slug: "digital-marketing-guide",
        },
      ],
    },
  ],
  fr: [
    {
      categoryId: 1,
      title: "Technologie",
      description: "Dernières nouvelles et mises à jour technologiques",
      slug: "technologie",
      posts: [
        {
          id: 1,
          title: "L'Avenir de l'IA",
          description:
            "Explorer comment l'intelligence artificielle façonnera notre avenir",
          slug: "avenir-de-ia",
        },
        {
          id: 2,
          title: "Tendances du Développement Web",
          description:
            "Les principales tendances du développement web à surveiller cette année",
          slug: "tendances-developpement-web",
        },
      ],
    },
    {
      categoryId: 2,
      title: "Affaires",
      description: "Perspectives et stratégies commerciales",
      slug: "affaires",
      posts: [
        {
          id: 3,
          title: "Stratégies de Travail à Distance",
          description: "Stratégies efficaces pour gérer des équipes à distance",
          slug: "strategies-travail-distance",
        },
        {
          id: 4,
          title: "Guide du Marketing Digital",
          description: "Un guide complet du marketing digital en 2025",
          slug: "guide-marketing-digital",
        },
      ],
    },
  ],
  es: [
    {
      categoryId: 1,
      title: "Tecnología",
      description: "Últimas noticias y actualizaciones tecnológicas",
      slug: "tecnologia",
      posts: [
        {
          id: 1,
          title: "El Futuro de la IA",
          description:
            "Explorando cómo la inteligencia artificial dará forma a nuestro futuro",
          slug: "futuro-de-ia",
        },
        {
          id: 2,
          title: "Tendencias de Desarrollo Web",
          description:
            "Principales tendencias de desarrollo web para observar este año",
          slug: "tendencias-desarrollo-web",
        },
      ],
    },
    {
      categoryId: 2,
      title: "Negocios",
      description: "Perspectivas y estrategias empresariales",
      slug: "negocios",
      posts: [
        {
          id: 3,
          title: "Estrategias de Trabajo Remoto",
          description: "Estrategias efectivas para gestionar equipos remotos",
          slug: "estrategias-trabajo-remoto",
        },
        {
          id: 4,
          title: "Guía de Marketing Digital",
          description: "Una guía completa de marketing digital en 2025",
          slug: "guia-marketing-digital",
        },
      ],
    },
  ],
};

/**
 * Get all blog categories for a specific locale
 */
export function getBlogCategories(locale: Locale = "en"): BlogCategory[] {
  return blog[locale] || blog.en;
}

/**
 * Get all posts from all categories for a specific locale
 */
export function getAllBlogPosts(locale: Locale = "en"): BlogPost[] {
  const categories = getBlogCategories(locale);
  return categories.flatMap((category) => category.posts);
}

/**
 * Get all posts for a specific category
 */
export function getBlogPostsByCategory(
  categoryId: number,
  locale: Locale = "en"
): BlogPost[] {
  const categories = getBlogCategories(locale);
  const category = categories.find((cat) => cat.categoryId === categoryId);
  return category?.posts || [];
}

/**
 * Get a specific blog post by ID
 */
export function getBlogPostById(
  postId: number,
  locale: Locale = "en"
): BlogPost | undefined {
  const allPosts = getAllBlogPosts(locale);
  return allPosts.find((post) => post.id === postId);
}

/**
 * Get a specific blog category by ID
 */
export function getBlogCategoryById(
  categoryId: number,
  locale: Locale = "en"
): BlogCategory | undefined {
  const categories = getBlogCategories(locale);
  return categories.find((category) => category.categoryId === categoryId);
}

/**
 * Get a specific blog post by slug
 */
export function getBlogPostBySlug(
  slug: string,
  locale: Locale = "en"
): BlogPost | undefined {
  const allPosts = getAllBlogPosts(locale);
  return allPosts.find((post) => post.slug === slug);
}

/**
 * Get a specific blog category by slug
 */
export function getBlogCategoryBySlug(
  slug: string,
  locale: Locale = "en"
): BlogCategory | undefined {
  const categories = getBlogCategories(locale);
  return categories.find((category) => category.slug === slug);
}
