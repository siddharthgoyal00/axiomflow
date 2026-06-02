import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage    from "./pages/LandingPage";
import LoginPage      from "./pages/LoginPage";
import RegisterPage   from "./pages/RegisterPage";
import ChatPage       from "./pages/ChatPage";
import DashboardPage  from "./pages/DashboardPage";
import BillingPage    from "./pages/BillingPage";
import PricingPage    from "./pages/PricingPage";
import AppLayout      from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<LandingPage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/chat"      element={<ChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/billing"   element={<BillingPage />} />
          <Route path="/pricing"   element={<PricingPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
