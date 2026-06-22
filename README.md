# Carpathian Cheese House — Frontend E-commerce Demo

A frontend-only e-commerce demo for a fictional artisan cheese brand from the Ukrainian Carpathians.

The project presents a warm, local, craft-focused online store with a Ukrainian-language interface, product catalog, category filtering, product detail pages, cart functionality, and a demo checkout flow.

This is a portfolio project. It does not process real orders, payments, or customer data.

---

## Live demo

https://seacoffee.github.io/carpathian-cheese-house/

## Project concept

Carpathian Cheese House is a fictional local cheese producer inspired by small artisan dairies in the Ukrainian Carpathians.

The website interface is intentionally written in Ukrainian to match the brand concept and make the project feel like a real local business website rather than a generic e-commerce template.

---

## Features

### Home page

* Hero section with brand positioning
* Product category grid
* Featured products section
* Brand story section
* Delivery and order information
* Customer testimonials
* FAQ accordion
* Contact call-to-action

### Shop page

* Responsive product grid
* Product search by name and short description
* Category filtering
* Sorting by price and name
* Empty state for no matching results
* Category state reflected in the URL query parameter

### Product detail pages

* Static product pages generated from mock data
* Large product image
* Full product description
* Price, unit, weight, aging, and ingredients
* Quantity selector
* Add-to-cart functionality
* Related products section

### Cart

* Cart drawer in the header
* Separate cart page
* Add, remove, increase, and decrease item quantity
* Subtotal, delivery cost, and total calculation
* Minimum order notice
* Cart state persisted in `localStorage`

### Demo checkout

* Contact details form
* Delivery method selection
* Conditional address field for delivery
* Order notes field
* Order summary
* Demo success state

---

## Tech stack

* **Next.js App Router**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Lucide React**
* **Google Fonts**
* **localStorage** for cart persistence
* **Static export** for deployment on GitHub Pages or another static hosting platform

---

## Frontend-only architecture

This project is intentionally built without backend functionality.

There is no:

* backend server
* database
* authentication
* payment integration
* real order processing
* API-based business logic

All products, categories, testimonials, and FAQ content are stored as local mock data.

---

## Demo data

The project includes 12 demo products across 6 categories:

### Soft cheeses

* Traditional brynza
* Brie “Dukat”

### Hard cheeses

* Carpathian cheddar
* Hard cheese “Svitlovyr”

### Goat cheeses

* Fresh goat cheese
* Goat cheese in ash

### Blue cheeses

* Blue Peaks
* Aged Blue

### Smoked cheeses

* Smoked gouda
* Smoked budz

### Gift sets

* Master’s Selection
* Carpathian Journey

---

## Project structure

```txt
├── app/
│   ├── cart/page.tsx              # Cart page
│   ├── checkout/page.tsx          # Demo checkout page
│   ├── product/[slug]/            # Static product detail pages
│   ├── shop/page.tsx              # Shop/catalog page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   ├── not-found.tsx              # 404 page
│   └── page.tsx                   # Home page
│
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── footer.tsx                 # Site footer
│   ├── header.tsx                 # Header with cart drawer
│   └── product-card.tsx           # Product card component
│
├── lib/
│   ├── cart-context.tsx           # Cart state and localStorage logic
│   ├── data.ts                    # Mock products, categories, FAQ, testimonials
│   ├── types.ts                   # TypeScript types
│   └── utils.ts                   # Utility helpers
│
├── tailwind.config.ts             # Tailwind configuration
└── README.md
```

---

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the project in your browser:

```txt
http://localhost:3000
```

Build the project:

```bash
npm run build
```

---

## Static export

The project is prepared for static export.

After running:

```bash
npm run build
```

the static files are generated in the `out` directory and can be deployed to:

* GitHub Pages
* Netlify
* Vercel
* Cloudflare Pages
* any static hosting provider

---

## GitHub Pages deployment

The project does not require a backend runtime, so it can be deployed as a static site.

Before deployment, make sure the production build works correctly:

```bash
npm run build
```

If deploying to a GitHub Pages project repository, check whether your `next.config` needs a `basePath` and `assetPrefix` for the repository name.

For a user or organization GitHub Pages site, such as:

```txt
username.github.io
```

a base path is usually not needed.

---

## Images

Images are loaded from Pexels and are used only for demo and portfolio purposes. They do not represent real products or a real dairy business.

### Pexels photo IDs used in the project

Categories:

* Soft cheeses — `6004240`
* Hard cheeses — `33313084`
* Goat cheeses — `6004245`
* Blue cheeses — `27400768`
* Smoked cheeses — `8287389`
* Gift sets — `7175713`

Products:

* Traditional brynza — `26699215`
* Brie “Dukat” — `7089411`
* Carpathian cheddar — `36040972`
* Hard cheese “Svitlovyr” — `18780909`
* Fresh goat cheese — `8747538`
* Goat cheese in ash — `11458667`
* Blue Peaks — `2290741`
* Aged Blue — `33232578`
* Smoked gouda — `277276`
* Smoked budz — `33313085`
* Master’s Selection — `19805349`
* Carpathian Journey — `8287391`

Page images:

* Hero / About image — `5953714`

---

## Portfolio goals

This project demonstrates:

* building a frontend-only e-commerce interface
* working with Next.js App Router
* using typed mock data
* creating responsive layouts with Tailwind CSS
* implementing cart state with React Context and `localStorage`
* building static product detail pages
* preparing a project for static deployment
* presenting a localized Ukrainian-language brand concept

---

## License

This is a demo and portfolio project. It can be used as a reference for frontend-only e-commerce layouts, static product catalogs, and local brand website concepts.
