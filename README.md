# 🌱 AgriAgent — Autonomous Agricultural Market Intelligence & Negotiation Platform

> **AgriAgent** is a full-stack, autonomous agricultural market intelligence platform designed for Indian farmers. It eliminates middleman exploitation by evaluating buyer offers using **net take-home profit** (factoring real-time APMC Mandi rates, logistics haulage costs, and platform escrow) rather than deceptive gross sticker prices.

---

## 📌 Key Features

### 🤖 1. AgriAgent AI Market Advisor
- **Conversational Market Intelligence**: Interactive chat grounded in APMC mandi rates, buyer demand curves, and freight economics.
- **Voice-Enabled & Multilingual**: Supports voice input and speech synthesis in regional Indian languages (Hindi, Telugu, Kannada, English).
- **Autonomous Tool Execution**: Transparent function calling (`get_market_prices()`, `search_buyers()`, `compare_offers()`) displayed directly within recommendations.
- **Chat Persistence**: Automatically preserves conversations across sessions and browser tabs with one-click **New Chat** reset.

### 📈 2. Today's APMC Mandi Rates & Dynamic Analytics
- **Crop-Specific Dynamic Trends**: Interactive crop filtering that dynamically updates 7-day price charts, modal rates, and price momentum.
- **Arrival Volumes & Volatility**: Track peak arrival hours, modal vs. maximum rates, and historical price movements across local mandis (e.g., Bowenpally, Gudimalkapur, L.B. Nagar).

### ⚖️ 3. Compare Buyers & Freight Netting
- **Net Take-Home Calculation**: Compares buyer offers by subtracting transport haulage and platform escrow fees from the gross price.
- **Filter by Crop**: Choose any crop from your listings (Tomatoes, Chillies, Potatoes, Onions, Cotton) to compare relevant buyers and net revenue.
- **Direct Deal Execution**: Accept offers or initiate autonomous counter-negotiation directly from the comparison view.

### 📦 4. My Produce Listings & Crop Management
- **Listing Management**: Add and manage harvested crops with quantity, grade (Grade A/B/C), packaging, and target asking price.
- **Accurate Crop Metadata**: Verified crop details and categorization (Tomatoes, Green Chillies, Potatoes, Cotton, etc.) to ensure buyers receive clear listings.

### 🚚 5. Smart Logistics & Vehicle Dispatch
- **Logistics Matching**: Match crop orders with verified local transporters (Tata Ace, Pickup 8ft, Eicher 14ft, Tractor Trolley).
- **Fare Transparency**: Real-time breakdown of base fare, distance (₹/km), and estimated delivery transit times.

### 🔒 6. Milestone Escrow Payments & Order Tracking
- **Escrow Protection**: Buyer deposits funds into platform escrow before dispatch; payments release to farmers upon delivery verification.
- **End-to-End Tracking**: Order progression from *Harvest Confirmed* ➔ *In Transit* ➔ *Quality Inspection* ➔ *Payment Disbursed*.

### 👥 7. Multi-Role Portal
- Seamless toggle between **Farmer**, **Buyer**, and **Admin** dashboards for simulated end-to-end trading workflows.

---

## 🛠️ Architecture & Tech Stack

```
agriagent/
├── src/
│   ├── components/
│   │   ├── farmer/          # Farmer Dashboard, AI Chat, Mandi Rates, Buyer Matching
│   │   ├── buyer/           # Buyer Dashboard & Bidding Interfaces
│   │   ├── admin/           # Admin Analytics & Platform Oversight
│   │   ├── layout/          # Navbar, Mobile Navigation, Notifications Modal
│   │   └── landing/         # Public Landing Page & Onboarding
│   ├── context/             # Global App State (AppContext)
│   ├── data/                # APMC Mandi Data, Buyer Demands, Seed Listings
│   ├── services/
│   │   ├── ai/              # Agent Engine, Tool Execution, Local TTS/STT
│   │   ├── api/             # Groq LPU & Gemini API integrations
│   │   └── market/          # Market Price Aggregation & Freight Economics
│   └── utils/               # Currency, Date, and Crop Helper Resolvers
├── server/
│   └── index.js             # Express API proxy for secure AI model execution
└── public/                  # Static assets & icons
```

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18 with TypeScript |
| **Styling** | Tailwind CSS with responsive layout |
| **Icons** | Lucide React |
| **State Management** | React Context API (`AppContext`) + LocalStorage Persistence |
| **Backend / Proxy** | Node.js + Express (`server/index.js`) |
| **AI Integration** | Groq LPU API / Google Gemini API |

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### 2. Clone the Repository
```bash
git clone https://github.com/Hamsini-0001/AgriAgent...git
cd AgriAgent..
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables (Optional)
If you wish to connect your own AI API keys for live model execution:
```bash
# Create a .env file in the project root
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

### 5. Run the Application

**Run Frontend Development Server:**
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

**Run Backend API Server (Optional for Live AI inference):**
```bash
node server/index.js
```

---

## 🧪 Testing & Validation

To verify TypeScript code compilation:
```bash
npx tsc --noEmit
```

To build for production:
```bash
npm run build
```

---

## 📄 License
This project is open source and available under the MIT License.