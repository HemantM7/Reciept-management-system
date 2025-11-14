# 🧾 Receipt Management Pro

A modern, feature-rich receipt management application built with React, TypeScript, and Material-UI.

## ✨ Features

### 🎨 Modern UI/UX
- **Gradient Color Scheme** - Beautiful purple gradient theme throughout the app
- **Smooth Animations** - Fade-in effects and hover transitions
- **Responsive Design** - Works seamlessly on all device sizes
- **Dark Mode Toggle** - Switch between light and dark themes

### 📊 Dashboard & Analytics
- **Statistics Cards** - Real-time metrics for receipts, revenue, items, and averages
- **Interactive Charts** - Pie charts, bar charts, line charts, and radar charts
- **Visual Insights** - Track your receipt data with beautiful visualizations

### 🧾 Receipt Management
- **Create & Edit Receipts** - Full CRUD operations for receipts
- **Status Tracking** - Track receipts as Draft, Pending, Paid, or Cancelled
- **Item Categories** - Organize items by category (Electronics, Food, Clothing, etc.)
- **Auto-calculations** - Automatic calculation of gross amount, discounts, and net amount
- **Multiple Units** - Support for kg, g, l, ml, pcs, box

### 🔍 Search & Filter
- **Smart Search** - Search receipts by receipt number or person name
- **Status Filter** - Filter receipts by their status
- **Real-time Filtering** - Instant results as you type

### 📤 Export & Print
- **CSV Export** - Export filtered receipts to CSV format
- **Print Support** - Print receipt lists directly from the browser
- **Timestamp Tracking** - Track creation and update times

### 🔐 Authentication
- **Modern Login Page** - Beautiful gradient login interface
- **Password Visibility Toggle** - Show/hide password feature
- **Form Validation** - Client-side validation for all inputs

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd taskmanagementapp
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Day.js** - Date manipulation

## 📁 Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── StatsCard.tsx
│   └── Charts/
├── pages/           # Page components
│   ├── HomePage.tsx
│   ├── Login.tsx
│   ├── Receipt.tsx
│   └── ReceiptList.tsx
├── types/           # TypeScript types
│   └── receipt.ts
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## 🎯 Key Features Explained

### Statistics Dashboard
The homepage displays real-time statistics:
- Total number of receipts
- Total revenue (sum of all net amounts)
- Total items sold
- Average receipt value

### Receipt Status Workflow
1. **Draft** - Initial state when creating a receipt
2. **Pending** - Receipt awaiting payment
3. **Paid** - Payment completed
4. **Cancelled** - Receipt cancelled

### Data Persistence
All receipt data is stored in browser's localStorage, ensuring data persists across sessions.

## 🎨 Color Palette

- **Primary Gradient**: `#667eea → #764ba2`
- **Secondary Gradient**: `#f093fb → #f5576c`
- **Success Gradient**: `#4facfe → #00f2fe`
- **Warning Gradient**: `#fa709a → #fee140`

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Material-UI for the amazing component library
- Recharts for beautiful data visualizations
- The React team for the incredible framework
