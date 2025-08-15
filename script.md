run example projects

ignore route tree from linters and prettier
i18n
not found & errors routes
parent search params access
language switch

this is a very good example for hash link /products/:productId#specifications
Nested Routing and layout routes (with pathless layouts)
Non-Nested Routes
show logic colocation with -
Nested routes, layout routes (route.tsx), grouped routes
route priority matching
code splitting
Parallel data loading
Built-in Route Loaders w/ SWR Caching
Inherited Route Context
devtools reference
refer to migration guides
not found and error routes

preload?: false | 'intent'
preloadDelay?: number

some examples with link (path and search params)

. is used for simple route when you don't want to create directories for it

```tsx
const postIdRoute = createRoute({
  path: "/blog/post/$postId",
});

const link = (
  <Link from={postIdRoute.fullPath} to="../categories">
    Categories
  </Link>
);

const link = (
  <Link to="/blog/post/$postId" preload="intent" preloadTimeout={100}>
    Blog Post
  </Link>
);
```

useNavigate
createLink

. & .. in navigation

File Naming Conventions
Using loaderDeps to access search params
activeProps & activeOptions (for link)

Navigating with Optional Parameters
Imperative Navigation with Optional Parameters

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

react query (good code example on docs)
Automatic route prefetching

auth check with beforeLoad for admin pages
/products → Products list (with data loader)
/products?search queries here
Route with intentional loader failure → triggers errorComponent
Protected route → redirects to /login if unauthenticated
/old-products/:id → Redirects to /products/:id

these are equal:
posts.tsx, posts/route.tsx
Using automatic code-splitting

try posts.index.tsx & posts.route.tsx beside each other

```tsx
const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className={`p-2 text-2xl`}>
      <Spinner />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // We'll inject this when we render
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
})

<RouterProvider
  router={router}
  defaultPreload="intent"
  defaultPendingMs={pendingMs}
  defaultPendingMinMs={pendingMinMs}
  context={{
    auth,
  }}
/>
```

```tsx
export const Route = createFileRoute('/posts')({
  loader: fetchPosts,
  component: PostsLayoutComponent,
})

function PostsLayoutComponent() {
  const posts = Route.useLoaderData()

```

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params: { postId } }) => fetchPost(postId),
  errorComponent: PostErrorComponent,
  notFoundComponent: () => {
    return <p>Post not found</p>
  },
  component: PostComponent,
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PostComponent() {
  const post = Route.useLoaderData()
```

```tsx
from={Route.fullPath}
```

---

# Done

- `/` - Home page
- `/about` - About page
- `/login` - User login

- `/categories` - All categories
- `/categories/:categoryId` - Single category view
- `/categories/:categoryId/subcategories` - Subcategories listing

- `/products` - All products
- `/products/featured` - Featured products
- `/products/:productId` - Single product detail
- `/products/:productId/reviews` - Product reviews
- `/search` - Search results
- `/search?q=:query` - Search with query parameter
- `/account` - Account dashboard
- `/account/orders` - Order history
- `/account/orders/:orderId` - Single order details
- `/admin` - Admin dashboard
- `/admin/reports` - Reporting tools
- `/admin/products` - Product listing
- `/admin/products/create` - Create new product
- `/admin/products/:productId` - Edit product
- `/admin/categories` - Category management
- `/admin/categories/:categoryId` - Edit category
- `/files/*` - Wildcard/catch-all routes for file serving

---

- `/products/:productId#specifications` - Hash links for page sections
