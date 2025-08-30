import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Upload, Activity, Database, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import KPICard from "@/components/shared/KPICard";
import ImpactChart from "@/components/shared/ImpactChart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminKPIs, dailyActiveUsers, activityLog } from "@/data/adminData";

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const iconMap = {
    Users,
    Upload,
    Activity,
    Database,
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      default:
        return "text-blue-400";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-amber-900 to-navy-900">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} variant="admin" />
      
      <div className="lg:ml-80">
        <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} variant="admin" />
        
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/70">
              System overview and administrative controls for H2 Planner Pro
            </p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {adminKPIs.map((kpi, index) => (
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
              data={dailyActiveUsers}
              type="line"
              title="Daily Active Users"
              xKey="date"
              yKey="users"
              color="#3b82f6"
              height={300}
            />
            
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">System Status</h3>
                <Badge className="bg-green-500 text-white">All Systems Operational</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-white">API Services</span>
                  </div>
                  <span className="text-white/60">99.9% uptime</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-white">Database</span>
                  </div>
                  <span className="text-white/60">Healthy</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-white">File Storage</span>
                  </div>
                  <span className="text-white/60">85% capacity</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Activity Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </h3>
                <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activityLog.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className={`mt-1 ${getSeverityColor(log.severity)}`}>
                      {getSeverityIcon(log.severity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-white text-sm font-medium">{log.user}</p>
                        <p className="text-white/60 text-xs">{log.timestamp}</p>
                      </div>
                      <p className="text-white/80 text-sm mt-1">{log.action}</p>
                      <p className="text-white/60 text-xs mt-1">{log.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="bg-gradient-to-r from-teal-500 to-amber-500 hover:from-teal-600 hover:to-amber-600 text-white">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Upload className="mr-2 h-4 w-4" />
                  Review Uploads
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Database className="mr-2 h-4 w-4" />
                  System Metrics
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Activity className="mr-2 h-4 w-4" />
                  Activity Log
                </Button>
              </div>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
