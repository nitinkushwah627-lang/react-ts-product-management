# Product Management App

A responsive **Product Management App** built with React and TypeScript.

The project demonstrates React fundamentals, hooks, Context API, React Router, Axios, CRUD operations, API integration, and responsive UI.

## Features

- View all products
- View product details
- Add a new product
- Edit product
- Delete product
- Product images
- Nested routes
- Loading and error handling
- Context API for state management
- Responsive UI
- 404 Not Found page

## Tech Stack

- React
- TypeScript
- React Router
- Axios
- Context API
- CSS
- DummyJSON API
- Vite

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://dummyjson.com/products
```

## Run the Project

Start the development server:

```bash
npm run dev
```

Then open the URL shown in the terminal.

## Project Structure

```text
src/
├── components/
│   ├── ProductCard.tsx
│   └── ProductForm.tsx
│
├── context/
│   └── ProductContext.tsx
│
├── pages/
│   ├── Products.tsx
│   ├── ProductDetails.tsx
│   ├── ProductInfo.tsx
│   └── ProductReviews.tsx
│
├── api.ts
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```

## API

This project uses the DummyJSON Products API:

```text
https://dummyjson.com/products
```

The API is used for product listing and CRUD operations.

## Routes

| Route | Purpose |
|---|---|
| `/products` | Product listing |
| `/add-product` | Add product |
| `/products/:id` | Product details |
| `/products/:id/details` | Product information |
| `/products/:id/reviews` | Product reviews |

## Learning Goals

This project is created for practicing:

- React components
- Props
- TypeScript
- `useState`
- `useEffect`
- `useContext`
- Context API
- Event handling
- Forms
- Conditional rendering
- Lists and `.map()`
- React Router
- Dynamic routes
- Nested routes
- API integration
- CRUD operations
- Loading and error states

## License

This project is for learning and practice purposes.