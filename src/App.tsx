import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapExplorer from "./pages/MapExplorer";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Scenarios from "./pages/Scenarios";
import Login from "./pages/Login";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// User Panel Pages
import UserDashboard from "./pages/user/UserDashboard";

// Admin Panel Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// User/Admin route shells
import UserApp from "./pages/UserApp";
import AdminApp from "./pages/AdminApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Marketing/Home */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapExplorer />} />

          {/* User Panel */}
          <Route path="/user/*" element={<UserApp />}></Route>

          {/* Admin Panel */}
          <Route path="/admin/*" element={<AdminApp />}></Route>

          {/* Legacy direct pages (optional) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/scenarios" element={<Scenarios />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
