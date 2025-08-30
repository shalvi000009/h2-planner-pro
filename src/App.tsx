import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MapExplorer from "./pages/MapExplorer";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Scenarios from "./pages/Scenarios";
import Login from "./pages/Login";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// User/Admin route shells
import UserApp from "./pages/UserApp";
import AdminApp from "./pages/AdminApp";

// Auth
import { AuthProvider, useAuth } from "./lib/auth";

const queryClient = new QueryClient();

function RequireRole({ role, children }: { role: "user" | "admin"; children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/map" element={<MapExplorer />} />

            {/* User Panel (guarded) */}
            <Route
              path="/user/*"
              element={
                <RequireRole role="user">
                  <UserApp />
                </RequireRole>
              }
            />

            {/* Admin Panel (guarded) */}
            <Route
              path="/admin/*"
              element={
                <RequireRole role="admin">
                  <AdminApp />
                </RequireRole>
              }
            />

            {/* Legacy direct pages (optional) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/scenarios" element={<Scenarios />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
