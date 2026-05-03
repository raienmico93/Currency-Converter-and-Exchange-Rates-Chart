# Currency-Converter-and-Exchange-Rates-Chart

A modern, responsive Currency Converter and Exchange Rates web application built with vanilla HTML, CSS, and JavaScript. Features real-time currency conversion, historical exchange rates, and intuitive tabbed navigation between converter and rates views.

Features
- Currency Converter
  -  Real-time conversion between 170+ currencies
  - Live exchange rate display
  - Conversion tables (1, 5, 10, 20, 50, 100, 200, 500, 1000 units)
  - Switch currencies with one click
  - Bidirectional conversion tables
- Exchange Rates
  - Filter by base currency, comparison currency, and date
  - Historical rates support
  - Switch base/comparison currencies
  - Clean tabular data display
- Additional Features
  - Fully responsive design
  - Tab state persistence (localStorage)
  - Loading spinners
  - Modern UI with Inter font
  - Hover effects and smooth transitions

Tools
- Frontend: HTML5, CSS3 (SCSS), Vanilla JavaScript (ES6+)
- API: Frankfurter Exchange Rates API (Free)
- Fonts: Google Fonts - Inter
- Responsive: CSS Grid & Flexbox
- Storage: localStorage

Installation
- Clone/Download the repository
- Open index.html in any modern web browser
- No server required - Works offline after initial API calls

Usage
- Currency Converter Tab
  - Select From and To currencies
  - Enter amount in From field
  - View converted amount and conversion tables
  - Click ⇆ Switch to reverse currencies
- Exchange Rates Tab
  - Select Base Currency (or "All Currencies")
  - Select Compare To currency (optional)
  - Pick date for historical rates
  - View filtered exchange rates table
 

API
- Frankfurter Exchange Rates API (Free, no API key required)
  -  170+ currencies
  -  Historical data (1999-present)
  -  Latest rates
  -  High rate limits
  -  CORS enabled
  -  Endpoints used:
    - GET https://api.frankfurter.dev/v2/currencies     # Currency list
    - GET https://api.frankfurter.dev/v2/latest        # Latest rates
    - GET https://api.frankfurter.dev/v2/{date}        # Historical rates

File Structure
project/
├── index.html          # Main HTML structure
├── style.css           # SCSS compiled styles
└── app.js             # Application logic


Responsive Design
- Desktop (>768px) -> 2-column converter, 3-column filters
- Tablet -> Stacked converter, 2-column filters
- Mobile (<768px) -> Single column everything
- Key responsive features:
  - CSS Grid with auto-fit
  - Mobile-first navigation
  - Touch-friendly buttons
  - Optimized table layouts
 
Troubleshooting

Issue                 - Solution
No rates loading      - Check internet connection
CORS errors           - Use HTTPS or disable browser CORS
Date picker empty     - Modern browser required
Tables not updating   - Clear localStorage




Challenges Faced
- Real-time Data Integration: Handling API connectivity issues and managing API request limits (rate limits).
- Asynchronous Updates: Ensuring the UI updates promptly when new conversion data is fetched.
- Currency Data Handling: Dynamically populating dropdowns for a large number of currencies while maintaining efficiency.
- Frontend/Backend Synchronization: Ensuring the frontend properly interprets the JSON data returned by the API for the exchange rate chart
