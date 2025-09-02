# TODO:

. & .. in navigation
refer to devtools

# Script

we setup our tanstack router project manually

```bash
npm create vite@latest .
npm i
```

remove boilerplate stuff

```bash
npm i @tanstack/react-router @tanstack/react-router-devtools

npm i --save-dev @tanstack/router-plugin
```

```tsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  plugins: [
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
});
```

```json tsconfig.app.json
"paths": {
  "@/*": ["./src/*"]
},
```

```bash
npm i --save-dev @types/node
```

```bash
npm install tailwindcss @tailwindcss/vite tailwind-merge
```

```css index.css
@import "tailwindcss";

@layer components {
  .heading {
    @apply text-2xl font-bold;
  }
  .card {
    @apply inline-block border border-gray-300 rounded-md p-4 hover:bg-gray-100;
  }
  .active-card {
    @apply bg-gray-200;
  }

  .title {
    @apply text-xl font-bold;
  }

  .list {
    @apply grid grid-cols-2 gap-4;
  }

  .price {
    @apply text-lg font-bold;
  }
  .description {
    @apply text-sm text-gray-500;
  }

  .nav-link {
    @apply text-green-500;
  }
  .active-nav-link {
    @apply font-bold;
  }

  .button {
    @apply bg-green-500 text-white p-2 rounded-md uppercase cursor-pointer;
  }
  .outlined-button {
    @apply border border-green-500 text-green-500 p-2 rounded-md uppercase;
  }

  .input {
    @apply border border-gray-300 rounded-md p-2;
  }

  .label {
    @apply text-sm font-bold;
  }

  .code {
    @apply text-sm font-bold bg-gray-100 p-2 rounded-md;
  }
}
```

create routes/\_\_root.tsx

```bash
npm run dev
```

show generated files and completed \_\_root.tsx

exclude from vscode opening or closing and make readonly

```json
  "files.readonlyInclude": {
    "**/routeTree.gen.ts": true
  },
  "files.watcherExclude": {
    "**/routeTree.gen.ts": true
  },
  "search.exclude": {
    "**/routeTree.gen.ts": true
  }
```

```tsx App.tsx
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

create /routes/about.tsx & /routes/index.tsx

```tsx __root.tsx
import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Link activeProps={{ className: "text-blue-500 font-bold" }} to="/">
        Main Page
      </Link>
      <Link activeProps={{ className: "text-blue-500 font-bold" }} to="/about">
        About Page
      </Link>
      <Outlet />
    </React.Fragment>
  );
}
```

```tsx src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function wait() {
  const delay = 1000;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
```

```tsx routes/-components/nav-link.tsx
import { createLink, type LinkComponent } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type BasicLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  // extra props go here
};

const BasicLinkComponent = (
  { className, ...props }: BasicLinkProps,
  ref: React.Ref<HTMLAnchorElement>
) => {
  return <a ref={ref} {...props} className={cn("nav-link", className)} />;
};

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const NavLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return (
    <CreatedLinkComponent
      activeProps={{ className: "active-nav-link" }}
      preload="intent"
      {...props}
    />
  );
};
```

```tsx __root.tsx
import * as React from "react";
import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { NavLink } from "@/routes/-components/nav-link";

// export const Route = createRootRoute({
//   component: RootComponent,
// });

export type UserRole = "admin" | "client" | null;
export type RouterContext = {
  role: UserRole;
  login: (role: "admin" | "client") => void;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { logout, isAuthenticated, isAdmin, isClient } =
    Route.useRouteContext();
  const navigate = Route.useNavigate();
  const location = useLocation();

  return (
    <div className="container mx-auto max-w-xl">
      <div className="space-x-2">
        <NavLink to="/">Main Page</NavLink>
        <NavLink to="/about">About Page</NavLink>
      </div>
    </div>
  );
}
```

```ts lib/mock.ts
import { wait } from "@/lib/utils";

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
```

create contact-us.tsx and contact-us.$country.tsx and contact-us.$country.$city.tsx

```tsx contact-us.tsx
import { getCountries } from "@/lib/mock";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us")({
  component: RouteComponent,
  loader: async () => {
    const countries = await getCountries();
    return { countries };
  },
  pendingComponent: () => <div>Countries are loading...</div>,
});

function RouteComponent() {
  const { countries } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">What country are you at?</h2>
      <div className="list">
        {countries.map((country) => (
          <Link
            className="card"
            activeProps={{ className: "active-card" }}
            to="/contact-us/$country"
            params={{
              country: country.name,
            }}
            key={country.name}
          >
            <p className="title">{country.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
```

```tsx contact-us.$country.tsx
import { getCities } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us/$country")({
  component: RouteComponent,
  loader: async ({ params: { country } }) => {
    const cities = await getCities(country);
    if (cities.length === 0) {
      throw notFound();
    }
    return { cities };
  },
  pendingComponent: () => <div>Cities are loading...</div>,
});

function RouteComponent() {
  const { cities } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">Cities:</h2>
      <div className="list">
        {cities.map((city) => (
          <Link
            className="card"
            activeProps={{
              className: "active-card",
            }}
            from={Route.fullPath}
            to="/contact-us/$country/$city"
            params={{
              city,
            }}
            key={city}
          >
            <p className="title">{city}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
```

add start and end console log for $country loader then inside contact-us add preload="intent" and show when hover what happens and also show at app.tsx that can be globally config
also add and show devtools to root.tsx and explain a little what happens

```tsx $city.tsx
import { getCities } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/contact-us/$country/$city")({
  component: RouteComponent,
  loader: async ({ params: { country, city } }) => {
    const cities = await getCities(country);
    if (!cities.includes(city)) {
      throw notFound();
    }
    return { city };
  },
  pendingComponent: () => <div>City is loading...</div>,
});

function RouteComponent() {
  const { city } = Route.useLoaderData();

  return (
    <>
      <h2 className="heading">Selected City:</h2>
      <p className="title">{city}</p>
    </>
  );
}
```

if notice, there is no loading because delay is 1s, increase to 3s and show that loadings are shown

add defaultPendingMs: 0, to default config and explain then change 3000 to 1000 on wait function

tell about parallel fetching

create these

```bash
(public)/categories/route.tsx
(public)/categories/$categoryId/route.tsx
(public)/categories/$categoryId/$subcategoryId/route.tsx
(public)/categories/$categoryId/$subcategoryId/$productId/route.tsx
```

add categories navlink to root

```tsx categories/route.tsx
import { getCategories } from "@/lib/mock";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/categories")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
  pendingComponent: () => <div>Categories are loading...</div>,
  errorComponent: () => <div>Error...</div>,
});

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">Categories:</h2>
      <div className="list">
        {categories.map((category) => (
          <Link
            className="card"
            activeProps={{
              className: "active-card",
            }}
            to="/categories/$categoryId"
            params={{ categoryId: category.id }}
            key={category.id}
          >
            <p className="title">{category.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
```

```tsx $categoryId/route.tsx
import { getSubcategories } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/categories/$categoryId")({
  component: RouteComponent,
  loader: async ({ params: { categoryId } }) => {
    const subcategories = await getSubcategories(categoryId);
    if (subcategories.length === 0) {
      throw notFound();
    }
    return { subcategories };
  },
  pendingComponent: () => <div>Subcategories are loading...</div>,
});

function RouteComponent() {
  const { subcategories } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <h2 className="heading">Subcategories:</h2>
      <div className="list">
        {subcategories.map((subcategory) => (
          <Link
            className="card"
            activeProps={{
              className: "active-card",
            }}
            from="/categories/$categoryId"
            to="/categories/$categoryId/$subcategoryId"
            params={{ subcategoryId: subcategory.id }}
            key={subcategory.id}
          >
            <p className="title">{subcategory.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
```

```tsx $subcategoryId/route.tsx
import { getProducts } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(public)/categories/$categoryId/$subcategoryId"
)({
  component: RouteComponent,
  loader: async ({ params: { subcategoryId } }) => {
    const products = await getProducts(subcategoryId);
    if (products.length === 0) {
      throw notFound();
    }
    return { products };
  },
  pendingComponent: () => <div>Products are loading...</div>,
});

function RouteComponent() {
  const { products } = Route.useLoaderData();

  return (
    <div className="space-y-3">
      <h2 className="heading">Products:</h2>
      <div className="list">
        {products.map((product) => (
          <Link
            className="card"
            activeProps={{
              className: "bg-gray-200",
            }}
            from="/categories/$categoryId/$subcategoryId"
            to="/categories/$categoryId/$subcategoryId/$productId"
            params={{
              productId: product.id.toString(),
            }}
            hash="product-details"
            key={product.id}
          >
            <p className="title">{product.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
```

```tsx $productId/route.tsx
import { getProduct } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(public)/categories/$categoryId/$subcategoryId/$productId"
)({
  component: RouteComponent,
  loader: async ({ params: { productId } }) => {
    const product = await getProduct(productId);
    if (!product) {
      throw notFound();
    }
    return { product };
  },
  pendingComponent: () => <div>Product is loading...</div>,
});

function RouteComponent() {
  const { product } = Route.useLoaderData();
  return (
    <>
      <h2 className="heading">Product Details:</h2>
      <div id="product-details" className="card">
        <p className="title">{product.name}</p>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
      </div>
    </>
  );
}
```

don't forget to show hash scrolling for product details

```tsx search/route.tsx
import { searchProducts } from "@/lib/mock";
import { FilterPanel } from "@/routes/(public)/search/-components/filter-panel";
import { searchSchema } from "@/routes/(public)/search/-types/searchSchema";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/search")({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => {
    const products = await searchProducts(search);
    return { products };
  },
});

function RouteComponent() {
  // show also an example o getRouterApi
  const { products } = Route.useLoaderData();

  return (
    <>
      <FilterPanel />
      <div className="list">
        {products.map((product) => (
          <Link
            className="card"
            to="/categories/$categoryId/$subcategoryId/$productId"
            params={{
              productId: product.id,
              categoryId: product.categoryId,
              subcategoryId: product.subcategoryId,
            }}
            key={product.id}
          >
            <p className="title">{product.name}</p>
            <p className="description">{product.description}</p>
            <p className="price">{product.price}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
```

```tsx search/-types/searchSchema.ts
import z from "zod";

export const sortOptions = {
  alphabeticalAsc: "alphabeticalAsc",
  alphabeticalDesc: "alphabeticalDesc",
} as const;
// show that if error, url correctly redirect to catch
export const searchSchema = z.object({
  page: z.number().default(1).catch(1),
  filter: z.string().default("").catch(""),
  sort: z.enum(sortOptions).default("alphabeticalAsc").catch("alphabeticalAsc"),
});

export type SearchParams = z.infer<typeof searchSchema>;
```

```bash
npm i zod
```

```tsx search/-components/filter-panel.tsx
import {
  sortOptions,
  type SearchParams,
} from "@/routes/(public)/search/-types/searchSchema";
import { getRouteApi, Link } from "@tanstack/react-router";
import { useState } from "react";

const searchRouterApi = getRouteApi("/(public)/search");
const FilterPanel = () => {
  const { filter, page, sort } = searchRouterApi.useSearch();
  const [filterInput, setFilterInput] = useState(filter);
  const [pageInput, setPageInput] = useState(page.toString());

  const getSearchParams = (updates: Partial<SearchParams>) => {
    return {
      filter: updates.filter !== undefined ? updates.filter : filter,
      page: updates.page !== undefined ? updates.page : page,
      sort: updates.sort !== undefined ? updates.sort : sort,
    };
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="label">
          Filter:
          <input
            className="input"
            type="text"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </label>
        <Link
          className="outlined-button"
          to="/search"
          search={getSearchParams({ filter: filterInput })}
        >
          Apply Filter
        </Link>
      </div>

      <div>
        <label className="label">
          Page:
          <input
            className="input"
            type="number"
            min="1"
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
          />
        </label>
        <div className="space-x-2 inline">
          <Link
            className="outlined-button"
            to="/search"
            search={getSearchParams({ page: parseInt(pageInput) || 1 })}
          >
            Go to Page
          </Link>

          <Link
            className="outlined-button"
            to="/search"
            search={getSearchParams({ page: Math.max(1, page - 1) })}
            disabled={page <= 1}
          >
            Previous
          </Link>
          <Link
            className="outlined-button"
            to="/search"
            search={getSearchParams({ page: page + 1 })}
          >
            Next
          </Link>
        </div>
      </div>

      <div className="space-x-2">
        <label className="label">Sort:</label>
        {Object.values(sortOptions).map((sortOption) => (
          <Link
            className="outlined-button"
            to="/search"
            search={getSearchParams({ sort: sortOption })}
            key={sortOption}
          >
            {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
          </Link>
        ))}
      </div>

      <pre className="code">
        {JSON.stringify({ filter, page, sort }, null, 2)}
      </pre>
    </div>
  );
};

export { FilterPanel };
```

add search to \_\_root.tsx and show

add context

```tsx __root.tsx
import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { NavLink } from "@/routes/-components/nav-link";

// export const Route = createRootRoute({
//   component: RootComponent,
// });

export type UserRole = "admin" | "client" | null;
export type RouterContext = {
  role: UserRole;
  login: (role: "admin" | "client") => void;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  // for now tell we can use these after implement from anywhere
  // const { logout, isAuthenticated, isAdmin, isClient } =
  //   Route.useRouteContext();

  return (
    <React.Fragment>
      <NavLink to="/">Main Page</NavLink>
      <NavLink to="/about">About Page</NavLink>
      <NavLink to="/contact-us">Contact Us</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/search">Search</NavLink>
      <Outlet />
    </React.Fragment>
  );
}
```

```tsx app.tsx
import { useRouterContextState } from "@/lib/use-router-context-state";
import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
  context: {
    role: null,
    login: () => {},
    logout: () => {},
    isAdmin: false,
    isClient: false,
    isAuthenticated: false,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const routerContextState = useRouterContextState();
  return <RouterProvider router={router} context={routerContextState} />;
}

export default App;
```

```tsx lib/use-router-context-state.tsx
import type { RouterContext, UserRole } from "@/routes/__root";
import { useState, useEffect } from "react";

export function useRouterContextState(): RouterContext {
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;
    return savedRole || null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  const login = (newRole: "admin" | "client") => {
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
  };

  const isAdmin = role === "admin";
  const isClient = role === "client";
  const isAuthenticated = !!role;

  return {
    role,
    login,
    logout,
    isAdmin,
    isClient,
    isAuthenticated,
  };
}
```

```tsx routes/login.tsx
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import z from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().default("/"),
  }),
  beforeLoad: async ({ context, search }) => {
    const { isAdmin, isAuthenticated } = context;
    if (isAuthenticated) {
      throw redirect({
        to: search.redirect || (isAdmin ? "/admin" : "/client"),
      });
    }
  },
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const { login } = Route.useRouteContext();
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [username, setUsername] = useState("");
  return (
    <form>
      <input
        className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      <button
        className="button"
        type="submit"
        onClick={() => {
          if (username === "admin") {
            login("admin");
          } else {
            login("client");
          }
          router.invalidate();
          navigate({ to: search.redirect });
        }}
      >
        Login
      </button>
    </form>
  );
}
```

```tsx __root.tsx
import * as React from "react";
import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { NavLink } from "@/routes/-components/nav-link";

// export const Route = createRootRoute({
//   component: RootComponent,
// });

export type UserRole = "admin" | "client" | null;
export type RouterContext = {
  role: UserRole;
  login: (role: "admin" | "client") => void;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { logout, isAuthenticated, isAdmin, isClient } =
    Route.useRouteContext();
  const navigate = Route.useNavigate();
  const location = useLocation();

  return (
    <React.Fragment>
      <div className="space-x-2">
        <NavLink to="/">Main Page</NavLink>
        <NavLink to="/about">About Page</NavLink>
        <NavLink to="/contact-us">Contact Us</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/{-$locale}/blog">Blog</NavLink>
        {isClient && <NavLink to="/client">Account</NavLink>}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        {isAuthenticated ? (
          <button
            className="button"
            onClick={() => {
              logout();
              navigate({ to: "/login", search: { redirect: location.href } });
            }}
          >
            Sign out
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
      <Outlet />
    </React.Fragment>
  );
}
```

```tsx _auth/route.tsx
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
```

```tsx _auth/admin/routes.tsx
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.isAdmin) {
      throw redirect({
        to: "/client",
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
```

```tsx _auth/client/routes.tsx
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/client")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.isClient) {
      throw redirect({
        to: "/admin",
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
```

```tsx client/files/$/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/client/files/$/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat } = Route.useParams();
  const [filepath, setFilepath] = useState(_splat);

  return (
    <>
      <input
        className="input"
        type="text"
        value={filepath}
        onChange={(e) => setFilepath(e.target.value)}
      />
      <Link
        className="button"
        to="/client/files/$"
        params={{ _splat: filepath }}
      >
        Go to file
      </Link>
      {_splat ? (
        <h2 className="title">File: {_splat}</h2>
      ) : (
        <h2 className="title">No file found</h2>
      )}
    </>
  );
}
```

```tsx client/route.tsx
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/client")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.isClient) {
      throw redirect({
        to: "/admin",
      });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Link className="nav-link" to="/client/files/$">
        Files
      </Link>
      <Outlet />
    </>
  );
}
```

```tsx admin/reports.tsx
import { getReports } from "@/lib/mock";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/reports")({
  component: RouteComponent,
  loader: async () => {
    const reports = await getReports();
    return { reports };
  },
});

function RouteComponent() {
  const { reports } = Route.useLoaderData();
  return (
    <div className="space-y-2">
      <p className="text-2xl font-bold">Reports:</p>
      <div className="card">Total Sales: {reports.totalSales}</div>
      <div className="card">Total Orders: {reports.totalOrders}</div>
      <div className="card">Total Customers: {reports.totalCustomers}</div>
      <div className="card">Total Products: {reports.totalProducts}</div>
    </div>
  );
}
```

```tsx admin/route.tsx
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.isAdmin) {
      throw redirect({
        to: "/client",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="space-x-2 space-y-3">
      <Link
        className="card"
        activeProps={{ className: "active-card" }}
        to="/admin/reports"
      >
        Reports
      </Link>

      <Outlet />
    </div>
  );
}
```

```bash
create these
admin/categories/routes.tsx
admin/categories/$categoryId/index.tsx
```

```tsx categories/route.tsx
import { getCategories } from "@/lib/mock";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/categories")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
});

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  return (
    <>
      <div className="heading">Categories:</div>
      <div className="list">
        {categories.map((category) => (
          <Link
            className="card"
            activeProps={{ className: "active-card" }}
            to="/admin/categories/$categoryId"
            params={{ categoryId: category.id.toString() }}
            key={category.id}
          >
            <p className="title">{category.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );
}
```

```tsx categories/$categoryId/index.tsx
import { getCategory } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/categories/$categoryId/")({
  component: RouteComponent,
  loader: async ({ params: { categoryId } }) => {
    const category = await getCategory(categoryId);
    if (!category) {
      throw notFound();
    }
    return { category };
  },
});

function RouteComponent() {
  const { category } = Route.useLoaderData();
  return (
    <div className="space-y-3">
      <div className="heading">Category:</div>
      <p className="title">{category?.name}</p>
    </div>
  );
}
```

```tsx admin/route.tsx
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.isAdmin) {
      throw redirect({
        to: "/client",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="space-x-2 space-y-3">
      <Link
        className="card"
        activeProps={{ className: "active-card" }}
        to="/admin/reports"
      >
        Reports
      </Link>

      <Link
        className="card"
        activeProps={{ className: "active-card" }}
        activeOptions={{ exact: true }}
        to="/admin/categories"
      >
        Categories
      </Link>

      <Outlet />
    </div>
  );
}
```

```tsx categories_.create.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/categories_/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Create Category</div>;
}
```

```tsx admin/categories/route.tsx
import { getCategories } from "@/lib/mock";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/admin/categories")({
  component: RouteComponent,
  loader: async () => {
    const categories = await getCategories();
    return { categories };
  },
});

function RouteComponent() {
  const { categories } = Route.useLoaderData();
  return (
    <>
      <Link className="button" to="/admin/categories/create">
        New Category
      </Link>
      <div className="heading">Categories:</div>
      <div className="list">
        {categories.map((category) => (
          <Link
            className="card"
            activeProps={{ className: "active-card" }}
            to="/admin/categories/$categoryId"
            params={{ categoryId: category.id.toString() }}
            key={category.id}
          >
            <p className="title">{category.name}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );
}
```

```bash
create these
_auth/{$locale}/blog/route.tsx
_auth/{$locale}/blog/$topicId/route.tsx
_auth/{$locale}/blog/$topicId/$postId/route.tsx
```

```tsx blog/route.tsx
import { getTopics, LOCALES, type Locale } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/{-$locale}/blog")({
  component: RouteComponent,
  loader: async ({ params: { locale } }) => {
    if (!["en", "fr", "es"].includes(locale ?? "en")) {
      throw redirect({ to: "/{-$locale}/blog", params: { locale: undefined } });
    }
    const topics = await getTopics(locale as Locale);
    return { topics };
  },
  pendingComponent: () => <div>Topics are loading...</div>,
});

function RouteComponent() {
  const { topics } = Route.useLoaderData();
  const { locale } = Route.useParams();

  return (
    <div className="space-y-2">
      <h1 className="heading">Blog</h1>
      <p className="label">Select your language</p>

      <div className="space-x-2">
        {LOCALES.map((item) => (
          <Link
            className={`outlined-button ${!locale && item === "en" ? "bg-green-500 text-white" : ""}`}
            activeProps={{ className: "bg-green-500 text-white" }}
            to="/{-$locale}/blog"
            params={{ locale: item }}
            key={item}
          >
            {item}
          </Link>
        ))}
      </div>
      <h2 className="heading">Topics:</h2>
      <div className="list">
        {topics.map((topic) => (
          <Link
            className="card"
            activeProps={{ className: "active-card" }}
            to="/{-$locale}/blog/$topicId"
            params={{ topicId: topic.id.toString() }}
            key={topic.id}
          >
            <p className="title">{topic.name}</p>
            <p className="description">
              {topic.posts.map((post) => post.title).join(", ")}
            </p>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
```

```tsx blog/$topicId/route.tsx
import { getTopic } from "@/lib/mock";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/{-$locale}/blog/$topicId")({
  component: RouteComponent,
  loader: async ({ params: { topicId } }) => {
    const topic = await getTopic(topicId);
    if (!topic) {
      throw notFound();
    }
    return { topic };
  },
  pendingComponent: () => <div>Posts are loading...</div>,
});

function RouteComponent() {
  const { topic } = Route.useLoaderData();
  return (
    <>
      <h2 className="heading">Posts:</h2>
      <div className="list">
        {topic?.posts.map((post) => (
          <Link
            className="card"
            activeProps={{ className: "active-card" }}
            from="/{-$locale}/blog/$topicId"
            to="/{-$locale}/blog/$topicId/$postId"
            params={{ postId: post.id }}
            key={post.id}
          >
            <p className="title">{post.title}</p>
          </Link>
        ))}
      </div>
      <Outlet />
    </>
  );
}
```

```tsx blog/$topicId/$postId/route.tsx
import { getPost } from "@/lib/mock";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/{-$locale}/blog/$topicId/$postId")(
  {
    component: RouteComponent,
    loader: async ({ params: { postId } }) => {
      // add some console logs for post route that when hover, it starts loading
      const post = await getPost(postId);
      if (!post) {
        throw notFound();
      }
      return { post };
    },
    pendingComponent: () => <div>Post is loading...</div>,
  }
);

function RouteComponent() {
  const { post } = Route.useLoaderData();
  return (
    <>
      <h1 className="heading">Post:</h1>
      <p className="title">{post?.title}</p>
      <p className="description">{post?.description}</p>
    </>
  );
}
```
