CrapShop/
│
├── assets/                     # Afbeeldingen en statische bestanden
│
├── backend/
│   ├── app/
│   │   ├── data/
│   │   │   └── webshop.db      # SQLite database
│   │   │
│   │   ├── database/           # Database connectie & initialisatie
│   │   ├── middleware/         # JWT, authenticatie, decorators
│   │   ├── routes/             # Flask API endpoints
│   │   ├── schemas/            # Request validatie
│   │   ├── services/           # Business logic & database queries
│   │   │   ├── users.py
│   │   │   ├── products.py
│   │   │   ├── categories.py
│   │   │   └── orders.py
│   │   │
│   │   └── utils/              # Algemene hulpfuncties
│   │
│   ├── app.py                  # Flask applicatie
│   ├── config.py               # Configuratie
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Omgevingsvariabelen
│
├── src/
│   ├── api/                    # API communicatie (Axios)
│   ├── components/             # Herbruikbare React componenten
│   ├── context/                # React Contexts
│   ├── helpers/                # Helper functies & hooks
│   ├── pages/                  # Pagina's
│   ├── styles/                 # CSS
│   └── App.jsx
│
├── icons/                      # Eigen iconen
├── node_modules/
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md


React (Cart.jsx)
        │
        ▼
ShoppingCartContext
        │
        ▼
getCart()
        │
        ▼
Axios
        │
HTTP GET /api/cart/
        │
        ▼
Flask Route
        │
        ▼
token_required
        │
JWT controleren
        │
g.user_id = 1
        │
        ▼
Cart Service
        │
        ▼
SQLite
        │
SELECT ...
        │
        ▼
Resultaat
        │
        ▼
Flask → JSON
        │
        ▼
Axios
        │
        ▼
setCartItems(...)
        │
        ▼
React rendert opnieuw