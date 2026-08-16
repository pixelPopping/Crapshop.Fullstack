# 🛍️ CrapShop

CrapShop is a React-based e-commerce application built as a portfolio project.

The project focuses on building a functional webshop with product browsing, searching, categories, favorites, a shopping cart, authentication and API communication.

The project also includes automated tests using Jest and React Testing Library.

---

## 🚀 Features

- Product overview
- Product search
- Product category filtering
- Product details
- Favorites
- Shopping cart
- User authentication
- Login and sign-up pages
- Product categories
- API communication with Axios
- Loading and error handling
- Responsive layouts
- Automated testing

---

## 🛠️ Technologies

### Frontend

- React
- React Router
- JavaScript
- CSS Modules
- Font Awesome

### State management

The application uses React Context for shared application state:

- `AuthContext`
- `FavoriteContext`
- `ShoppingCartContext`

### API

- Axios
- Custom Axios client
- Product API functions

### Testing

- Jest
- React Testing Library
- Jest DOM
- Mock functions
- API mocking
- Async testing
- React hook testing

---

## 📁 Project Structure

The project is structured around components, pages, hooks, API functions, helpers and contexts.

```text
src/
│
├── api/
│   ├── axiosClient.js
│   ├── productsApi.js
│   └── productsApi.test.js
│
├── components/
│   ├── cartItem/
│   ├── categoryCard/
│   ├── counterbutton/
│   ├── detailcard/
│   ├── dropdown/
│   ├── favorietenitem/
│   ├── navbar/
│   ├── searchFilter/
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.module.css
│   │   └── SearchBar.test.jsx
│   ├── shoppingCart/
│   └── ...
│
├── context/
│   ├── AuthContext.jsx
│   ├── FavoriteContext.jsx
│   └── ShoppingCartContext.jsx
│
├── helpers/
│   ├── filteredProducts.jsx
│   └── filteredProducts.test.jsx
│
├── hooks/
│   ├── useProducts.js
│   └── useProducts.test.js
│
├── pages/
│   ├── checkout/
│   ├── favoritepage/
│   ├── home/
│   ├── profile/
│   ├── shop/
│   ├── signIn/
│   ├── signUP/
│   └── ...
│
├── App.jsx
├── main.jsx
└── setupTests.js