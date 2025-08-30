import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, User, Settings, LogOut, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuToggle: () => void;
  variant?: "user" | "admin";
}

const Topbar: React.FC<TopbarProps> = ({ onMenuToggle, variant = "user" }) => {
  const [notifications] = useState([
    { id: 1, message: "New recommendation available", time: "2m ago", unread: true },
    { id: 2, message: "Scenario saved successfully", time: "5m ago", unread: true },
    { id: 3, message: "System maintenance scheduled", time: "1h ago", unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 bg-gradient-to-r from-teal-500/10 via-amber-500/10 to-navy-500/10 backdrop-blur-xl border-b border-white/20"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden text-white hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 w-64"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-neon-green text-black text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white/95 backdrop-blur-xl border-white/20">
              <DropdownMenuLabel className="text-black">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <AnimatePresence>
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <DropdownMenuItem className="flex flex-col items-start space-y-1 p-3 hover:bg-white/50">
                      <div className="flex items-center space-x-2 w-full">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          notification.unread ? "bg-neon-green" : "bg-gray-400"
                        )} />
                        <span className="text-sm font-medium text-black">
                          {notification.message}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback className="bg-gradient-to-r from-teal-400 to-amber-400 text-white">
                    {variant === "user" ? "UP" : "AP"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-xl border-white/20" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-black">
                    {variant === "user" ? "User Planner" : "Admin User"}
                  </p>
                  <p className="text-xs leading-none text-gray-500">
                    {variant === "user" ? "user@h2planner.com" : "admin@h2planner.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-black hover:bg-white/50">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:bg-white/50">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};

export default Topbar;
