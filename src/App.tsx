import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import "./App.css";
import Login from "./pages/Login";
import ReceiptList from "./pages/Receipt";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/recipt" element={<ReceiptList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
