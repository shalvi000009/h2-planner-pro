import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  Target,
  Users,
  Settings,
  BarChart3,
  Shield,
  Database,
  Activity,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  variant?: "user" | "admin";
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const userNavItems: NavItem[] = [
  { label: "Dashboard", href: "/user", icon: LayoutDashboard },
  { label: "Map Workspace", href: "/user/map", icon: Map },
  { label: "Recommendations", href: "/user/recommendations", icon: TrendingUp },
  { label: "Impact Dashboard", href: "/user/impact", icon: Target },
  { label: "Collaboration", href: "/user/collaboration", icon: Users },
];

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "User Management", href: "/admin/users", icon: Users },
  { label: "Data Moderation", href: "/admin/moderation", icon: Shield },
  { label: "System Metrics", href: "/admin/metrics", icon: BarChart3 },
  { label: "Data Management", href: "/admin/data", icon: Database },
  { label: "Activity Log", href: "/admin/activity", icon: Activity },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, variant = "user" }) => {
  const location = useLocation();
  const navItems = variant === "user" ? userNavItems : adminNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed left-0 top-0 h-full z-50 w-80 bg-gradient-to-b from-teal-500/20 via-amber-500/20 to-navy-500/20 backdrop-blur-xl border-r border-white/20",
          "lg:relative lg:translate-x-0 lg:z-auto"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-amber-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H2</span>
              </div>
              <span className="text-white font-semibold text-lg">
                {variant === "user" ? "User Panel" : "Admin Panel"}
              </span>
            </motion.div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white transition-all duration-200 group",
                    "hover:bg-white/10 hover:shadow-lg hover:shadow-teal-500/20",
                    location.pathname === item.href && "bg-white/20 text-white shadow-lg shadow-teal-500/30"
                  )}
                >
                  <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute right-2 w-2 h-2 bg-neon-green rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/5 text-white/60"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
