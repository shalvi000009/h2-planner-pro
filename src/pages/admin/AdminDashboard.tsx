import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion } from "framer-motion";
import { 
  Users, 
  Upload, 
  Activity, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Server,
  Globe,
  BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Sample system activity data
const systemActivityData = [
  { time: '00:00', users: 45, uploads: 12, errors: 2 },
  { time: '04:00', users: 32, uploads: 8, errors: 1 },
  { time: '08:00', users: 89, uploads: 25, errors: 3 },
  { time: '12:00', users: 156, uploads: 42, errors: 5 },
  { time: '16:00', users: 134, uploads: 38, errors: 4 },
  { time: '20:00', users: 98, uploads: 31, errors: 2 },
  { time: '24:00', users: 67, uploads: 18, errors: 1 },
];

// Real-time activity feed
const activityFeed = [
  {
    id: 1,
    type: 'user',
    user: "Sarah Chen",
    action: "logged in",
    timestamp: "2 minutes ago",
    icon: Users,
    color: "text-blue-500"
  },
  {
    id: 2,
    type: 'upload',
    user: "Michael Rodriguez",
    action: "uploaded dataset 'Wind_Speed_2024'",
    timestamp: "5 minutes ago",
    icon: Upload,
    color: "text-green-500"
  },
  {
    id: 3,
    type: 'error',
    user: "System",
    action: "API rate limit exceeded for user ID 8472",
    timestamp: "8 minutes ago",
    icon: AlertTriangle,
    color: "text-red-500"
  },
  {
    id: 4,
    type: 'approval',
    user: "Emily Watson",
    action: "approved scenario 'Coastal Expansion'",
    timestamp: "12 minutes ago",
    icon: CheckCircle,
    color: "text-emerald-500"
  },
  {
    id: 5,
    type: 'upload',
    user: "David Kim",
    action: "uploaded dataset 'Solar_Irradiance_Data'",
    timestamp: "15 minutes ago",
    icon: Upload,
    color: "text-green-500"
  },
  {
    id: 6,
    type: 'user',
    user: "Lisa Park",
    action: "created new scenario",
    timestamp: "18 minutes ago",
    icon: Users,
    color: "text-blue-500"
  }
];

const systemKpis = [
  {
    label: "Active Users",
    value: "156",
    change: "+12%",
    icon: Users,
    color: "from-blue-500 to-blue-600",
    description: "Currently online"
  },
  {
    label: "Dataset Uploads",
    value: "42",
    change: "+8%",
    icon: Upload,
    color: "from-green-500 to-green-600",
    description: "This hour"
  },
  {
    label: "System Health",
    value: "98.5%",
    change: "+0.2%",
    icon: Shield,
    color: "from-emerald-500 to-emerald-600",
    description: "Uptime"
  },
  {
    label: "Data Processing",
    value: "2.3M",
    change: "+15%",
    icon: Database,
    color: "from-purple-500 to-purple-600",
    description: "Records processed"
  }
];

const AdminDashboard: React.FC = () => {
  return (
    <PanelShell
      title="Admin Dashboard"
      sidebar={<Sidebar items={[
        { label: "Dashboard", href: "/admin/dashboard", icon: "activity" },
        { label: "User Management", href: "/admin/users", icon: "users" },
        { label: "Data Moderation", href: "/admin/moderation", icon: "shield" },
        { label: "System Metrics", href: "/admin/metrics", icon: "bar-chart" },
      ]} />}
    >
      <div className="space-y-6">
        {/* System KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemKpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center`}>
                      <kpi.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {kpi.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">{kpi.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts and Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Activity Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Activity (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={systemActivityData}>
                    <defs>
                      <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(203 89% 53%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(203 89% 53%)" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="uploadsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(160 100% 41%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(160 100% 41%)" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="hsl(203 89% 53%)" 
                      strokeWidth={2}
                      fill="url(#usersGradient)"
                      name="Active Users"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="uploads" 
                      stroke="hsl(160 100% 41%)" 
                      strokeWidth={2}
                      fill="url(#uploadsGradient)"
                      name="Dataset Uploads"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Activity Feed */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {activityFeed.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`mt-1 p-1 rounded-full bg-muted ${activity.color}`}>
                      <activity.icon className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Server className="h-4 w-4" />
                Server Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Server</span>
                  <Badge variant="secondary" className="bg-green-500 text-white">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="secondary" className="bg-green-500 text-white">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cache</span>
                  <Badge variant="secondary" className="bg-green-500 text-white">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm font-medium">45ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Uptime</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Connections</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <BarChart3 className="h-4 w-4" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">CPU Usage</span>
                  <span className="text-sm font-medium">23%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Memory</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Users className="h-5 w-5" />
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Upload className="h-5 w-5" />
                <span>Review Uploads</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Shield className="h-5 w-5" />
                <span>Security Log</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span>System Metrics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PanelShell>
  );
};

export default AdminDashboard;