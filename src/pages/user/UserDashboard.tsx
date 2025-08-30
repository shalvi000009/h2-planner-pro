import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Target, DollarSign, Bell, TrendingUp, Activity } from "lucide-react";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import KPICard from "@/components/shared/KPICard";
import ImpactChart from "@/components/shared/ImpactChart";
import Gauge from "@/components/shared/Gauge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { userKPIs, impactData, notifications } from "@/data/userData";

const UserDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const iconMap = {
    Leaf,
    Users,
    Target,
    DollarSign,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-amber-900 to-navy-900">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} variant="user" />
      
      <div className="lg:ml-80">
        <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} variant="user" />
        
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">User Dashboard</h1>
            <p className="text-white/70">
              Real-time insights into hydrogen infrastructure and sustainability metrics
            </p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {userKPIs.map((kpi, index) => (
              <KPICard
                key={kpi.title}
                title={kpi.title}
                value={kpi.value}
                unit={kpi.unit}
                change={kpi.change}
                icon={iconMap[kpi.icon as keyof typeof iconMap]}
                color={kpi.color}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ImpactChart
              data={impactData}
              type="line"
              title="CO₂ Reduction Progress"
              xKey="year"
              yKey="co2"
              color="#10b981"
              height={300}
            />
            
            <ImpactChart
              data={impactData}
              type="area"
              title="Jobs Created Over Time"
              xKey="year"
              yKey="jobs"
              color="#3b82f6"
              height={300}
            />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Net-Zero Gauge */}
            <div className="lg:col-span-1">
              <Gauge
                value={78}
                title="Net-Zero Alignment"
                unit="%"
                size={250}
              />
            </div>

            {/* Notifications */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Recent Notifications</span>
                  </h3>
                  <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.unread ? "bg-neon-green" : "bg-white/40"
                      }`} />
                      <div className="flex-1">
                        <p className="text-white text-sm">{notification.message}</p>
                        <p className="text-white/60 text-xs mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <Badge className="bg-neon-green text-black text-xs">
                          New
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Recommendations
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Activity className="mr-2 h-4 w-4" />
                  Create Scenario
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Users className="mr-2 h-4 w-4" />
                  Join Collaboration
                </Button>
              </div>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
