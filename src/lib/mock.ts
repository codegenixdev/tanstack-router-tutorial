import { wait } from "./utils";

export const LOCALES = ["en", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];

type Data = {
  ecommerce: {
    categories: {
      id: string;
      name: string;
      subcategories: {
        id: string;
        name: string;
        products: {
          id: string;
          name: string;
          description: string;
          price: number;
          categoryId: string;
          subcategoryId: string;
        }[];
      }[];
    }[];
  };
  blog: {
    [key in Locale]: {
      id: string;
      name: string;
      posts: {
        id: string;
        title: string;
        description: string;
      }[];
    }[];
  };
  reports: {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
  };
  contact: {
    countries: {
      name: string;
      cities: string[];
    }[];
  };
};

export type Category = Data["ecommerce"]["categories"][number];
export type Subcategory = Category["subcategories"][number];
export type Product = Subcategory["products"][number];
export type Topic = Data["blog"][Locale][number];
export type Post = Topic["posts"][number];
export type Reports = Data["reports"];
export type Country = Data["contact"]["countries"][number];

export const MockData: Data = {
  ecommerce: {
    categories: [
      {
        id: "cat1",
        name: "Electronics",
        subcategories: [
          {
            id: "subcat1",
            name: "Smartphones",
            products: [
              {
                id: "prod1",
                name: "XPhone 14 Pro",
                description:
                  "Latest flagship smartphone with advanced camera system",
                price: 999.99,
                categoryId: "cat1",
                subcategoryId: "subcat1",
              },
              {
                id: "prod2",
                name: "Galaxy Ultra S23",
                description:
                  "Premium Android smartphone with exceptional battery life",
                price: 1199.99,
                categoryId: "cat1",
                subcategoryId: "subcat1",
              },
            ],
          },
          {
            id: "subcat2",
            name: "Laptops",
            products: [
              {
                id: "prod3",
                name: "MacBook Air M2",
                description: "Thin and light laptop with powerful performance",
                price: 1299.99,
                categoryId: "cat1",
                subcategoryId: "subcat2",
              },
              {
                id: "prod4",
                name: "UltraBook Pro",
                description: "High-performance laptop for professionals",
                price: 1499.99,
                categoryId: "cat1",
                subcategoryId: "subcat2",
              },
            ],
          },
          {
            id: "subcat3",
            name: "Audio",
            products: [
              {
                id: "prod5",
                name: "SoundMax Pro Headphones",
                description:
                  "Wireless noise-cancelling headphones with premium sound",
                price: 349.99,
                categoryId: "cat1",
                subcategoryId: "subcat3",
              },
              {
                id: "prod6",
                name: "AudioBlast Speaker",
                description: "Portable Bluetooth speaker with deep bass",
                price: 129.99,
                categoryId: "cat1",
                subcategoryId: "subcat3",
              },
            ],
          },
        ],
      },
      {
        id: "cat2",
        name: "Clothing",
        subcategories: [
          {
            id: "subcat4",
            name: "Men's Clothing",
            products: [
              {
                id: "prod7",
                name: "Classic Fit Dress Shirt",
                description: "Professional dress shirt for formal occasions",
                price: 59.99,
                categoryId: "cat2",
                subcategoryId: "subcat4",
              },
              {
                id: "prod8",
                name: "Slim Fit Jeans",
                description: "Comfortable everyday jeans with modern fit",
                price: 79.99,
                categoryId: "cat2",
                subcategoryId: "subcat4",
              },
            ],
          },
          {
            id: "subcat5",
            name: "Women's Clothing",
            products: [
              {
                id: "prod9",
                name: "Summer Floral Dress",
                description: "Lightweight floral pattern dress for summer",
                price: 79.99,
                categoryId: "cat2",
                subcategoryId: "subcat5",
              },
              {
                id: "prod10",
                name: "Business Blazer",
                description: "Professional blazer for office wear",
                price: 129.99,
                categoryId: "cat2",
                subcategoryId: "subcat5",
              },
            ],
          },
        ],
      },
      {
        id: "cat3",
        name: "Home & Kitchen",
        subcategories: [
          {
            id: "subcat6",
            name: "Kitchen Appliances",
            products: [
              {
                id: "prod11",
                name: "Pro Blender",
                description: "High-power blender for smoothies and food prep",
                price: 149.99,
                categoryId: "cat3",
                subcategoryId: "subcat6",
              },
              {
                id: "prod12",
                name: "Smart Coffee Maker",
                description:
                  "Programmable coffee maker with mobile app control",
                price: 99.99,
                categoryId: "cat3",
                subcategoryId: "subcat6",
              },
            ],
          },
          {
            id: "subcat7",
            name: "Furniture",
            products: [
              {
                id: "prod13",
                name: "Ergonomic Office Chair",
                description: "Comfortable chair with lumbar support",
                price: 249.99,
                categoryId: "cat3",
                subcategoryId: "subcat7",
              },
              {
                id: "prod14",
                name: "Modular Sofa",
                description: "Customizable sofa for modern living rooms",
                price: 899.99,
                categoryId: "cat3",
                subcategoryId: "subcat7",
              },
            ],
          },
        ],
      },
    ],
  },
  blog: {
    en: [
      {
        id: "topic1", // Changed from blog1 to topic1
        name: "Technology",
        posts: [
          {
            id: "post1",
            title: "The Future of AI",
            description:
              "Exploring how artificial intelligence will shape our future",
          },
          {
            id: "post2",
            title: "Web Development Trends",
            description: "Top web development trends to watch this year",
          },
        ],
      },
      {
        id: "topic2", // Changed from blog2 to topic2
        name: "Business",
        posts: [
          {
            id: "post3",
            title: "Remote Work Strategies",
            description: "Effective strategies for managing remote teams",
          },
          {
            id: "post4",
            title: "Digital Marketing Guide",
            description: "A comprehensive guide to digital marketing in 2025",
          },
        ],
      },
    ],
    fr: [
      {
        id: "topic1", // Changed from blog1 to topic1
        name: "Technologie",
        posts: [
          {
            id: "post1",
            title: "L'Avenir de l'IA",
            description:
              "Explorer comment l'intelligence artificielle façonnera notre avenir",
          },
          {
            id: "post2",
            title: "Tendances du Développement Web",
            description:
              "Les principales tendances du développement web à surveiller cette année",
          },
        ],
      },
      {
        id: "topic2", // Changed from blog2 to topic2
        name: "Affaires",
        posts: [
          {
            id: "post3",
            title: "Stratégies de Travail à Distance",
            description:
              "Stratégies efficaces pour gérer des équipes à distance",
          },
          {
            id: "post4",
            title: "Guide du Marketing Digital",
            description: "Un guide complet du marketing digital en 2025",
          },
        ],
      },
    ],
    es: [
      {
        id: "topic1", // Changed from blog1 to topic1
        name: "Tecnología",
        posts: [
          {
            id: "post1",
            title: "El Futuro de la IA",
            description:
              "Explorando cómo la inteligencia artificial dará forma a nuestro futuro",
          },
          {
            id: "post2",
            title: "Tendencias de Desarrollo Web",
            description:
              "Principales tendencias de desarrollo web para observar este año",
          },
        ],
      },
      {
        id: "topic2", // Changed from blog2 to topic2
        name: "Negocios",
        posts: [
          {
            id: "post3",
            title: "Estrategias de Trabajo Remoto",
            description: "Estrategias efectivas para gestionar equipos remotos",
          },
          {
            id: "post4",
            title: "Guía de Marketing Digital",
            description: "Una guía completa de marketing digital en 2025",
          },
        ],
      },
    ],
  },
  reports: {
    totalSales: 2345678,
    totalOrders: 34567,
    totalCustomers: 12345,
    totalProducts: 456,
  },
  contact: {
    countries: [
      {
        name: "USA",
        cities: ["New York", "LA", "Chicago"],
      },
      {
        name: "France",
        cities: ["Madrid", "Barcelona", "Paris"],
      },
      {
        name: "England",
        cities: ["London", "Manchester", "Liverpool"],
      },
    ],
  },
};

export async function getCategories() {
  await wait();
  return MockData.ecommerce.categories;
}

export async function getSubcategories(categoryId: string) {
  await wait();
  const category = MockData.ecommerce.categories.find(
    (category) => category.id === categoryId
  );
  return category ? category.subcategories : [];
}

export async function getSubcategory(subcategoryId: string) {
  await wait();
  for (const category of MockData.ecommerce.categories) {
    const subcategory = category.subcategories.find(
      (sub) => sub.id === subcategoryId
    );
    if (subcategory) return subcategory;
  }
  return undefined;
}

export async function getCategory(categoryId: string) {
  await wait();
  return MockData.ecommerce.categories.find(
    (category) => category.id === categoryId
  );
}

export async function getProducts(subcategoryId: string) {
  await wait();
  const subcategory = await getSubcategory(subcategoryId);
  return subcategory ? subcategory.products : [];
}

export async function getProduct(productId: string) {
  await wait();
  for (const category of MockData.ecommerce.categories) {
    for (const subcategory of category.subcategories) {
      const product = subcategory.products.find(
        (product) => product.id === productId
      );
      if (product) return product;
    }
  }
  return undefined;
}

export async function searchProducts(params: {
  page: number;
  filter: string;
  sort: "alphabeticalAsc" | "alphabeticalDesc";
}) {
  await wait();

  const { filter, sort, page } = params;
  const pageSize = 5;

  const results: Product[] = [];
  const lowercaseFilter = filter.toLowerCase();

  for (const category of MockData.ecommerce.categories) {
    for (const subcategory of category.subcategories) {
      const matchingProducts = subcategory.products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseFilter) ||
          product.description.toLowerCase().includes(lowercaseFilter)
      );
      results.push(...matchingProducts);
    }
  }

  if (sort === "alphabeticalAsc") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    results.sort((a, b) => b.name.localeCompare(a.name));
  }

  const totalProducts = results.length;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const safetyPage = Math.max(1, Math.min(page, totalPages || 1));

  const startIndex = (safetyPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalProducts);
  const paginatedProducts = results.slice(startIndex, endIndex);

  return paginatedProducts;
}

export async function getTopics(locale: Locale = "en") {
  await wait();
  return MockData.blog[locale];
}

export async function getTopic(topicId: string, locale: Locale = "en") {
  await wait();
  return MockData.blog[locale].find((topic) => topic.id === topicId);
}

export async function getPosts(topicId: string, locale: Locale = "en") {
  await wait();
  const topic = MockData.blog[locale].find((topic) => topic.id === topicId);
  return topic ? topic.posts : [];
}

export async function getPost(postId: string, locale: Locale = "en") {
  await wait();
  for (const topic of MockData.blog[locale]) {
    const post = topic.posts.find((post) => post.id === postId);
    if (post) return post;
  }
  return undefined;
}

export async function getReports() {
  await wait();
  return MockData.reports;
}

export async function getCountries() {
  await wait();
  return MockData.contact.countries;
}

export async function getCities(countryName: string) {
  await wait();
  const country = MockData.contact.countries.find(
    (country) => country.name === countryName
  );
  return country ? country.cities : [];
}
