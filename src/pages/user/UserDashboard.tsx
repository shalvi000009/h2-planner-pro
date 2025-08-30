import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion } from "framer-motion";
import { Activity, Leaf, Users, Zap, TrendingUp, AlertCircle, CheckCircle, Clock, Bell, Map } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Sample data for decarbonization progress
const decarbonizationData = [
  { month: 'Jan', progress: 45, target: 100 },
  { month: 'Feb', progress: 52, target: 100 },
  { month: 'Mar', progress: 58, target: 100 },
  { month: 'Apr', progress: 62, target: 100 },
  { month: 'May', progress: 67, target: 100 },
  { month: 'Jun', progress: 71, target: 100 },
  { month: 'Jul', progress: 75, target: 100 },
  { month: 'Aug', progress: 78, target: 100 },
  { month: 'Sep', progress: 82, target: 100 },
  { month: 'Oct', progress: 85, target: 100 },
  { month: 'Nov', progress: 88, target: 100 },
  { month: 'Dec', progress: 92, target: 100 },
];

const notifications = [
  {
    id: 1,
    type: 'success',
    title: 'New site recommendation available',
    message: 'AI has identified 3 new optimal locations for hydrogen plants',
    time: '2 hours ago',
    icon: CheckCircle
  },
  {
    id: 2,
    type: 'warning',
    title: 'Infrastructure update required',
    message: 'Grid capacity analysis shows potential bottlenecks in Region A',
    time: '4 hours ago',
    icon: AlertCircle
  },
  {
    id: 3,
    type: 'info',
    title: 'Collaboration invitation',
    message: 'Sarah Chen invited you to review Scenario "Coastal Expansion"',
    time: '1 day ago',
    icon: Clock
  },
  {
    id: 4,
    type: 'success',
    title: 'Impact milestone reached',
    message: 'Your projects have collectively saved 1M tons of CO₂',
    time: '2 days ago',
    icon: CheckCircle
  }
];

const kpis = [
  { 
    label: "CO₂ Saved", 
    value: "2.1M t", 
    change: "+12%",
    icon: <Leaf className="h-4 w-4" />, 
    color: "from-emerald-400 to-emerald-600",
    description: "Total carbon dioxide emissions avoided"
  },
  { 
    label: "Jobs Created", 
    value: "15.3k", 
    change: "+8%",
    icon: <Users className="h-4 w-4" />, 
    color: "from-sky-400 to-sky-600",
    description: "Employment opportunities generated"
  },
  { 
    label: "Net-Zero Progress", 
    value: "62%", 
    change: "+5%",
    icon: <Zap className="h-4 w-4" />, 
    color: "from-amber-400 to-amber-600",
    description: "Progress toward carbon neutrality"
  },
  { 
    label: "Investment Optimized", 
    value: "$1.2B", 
    change: "+15%",
    icon: <TrendingUp className="h-4 w-4" />, 
    color: "from-purple-400 to-purple-600",
    description: "Capital efficiency improvements"
  }
];

const UserDashboard: React.FC = () => {
  return (
    <PanelShell
      title="User Dashboard"
      sidebar={<Sidebar items={[
        { label: "Dashboard", href: "/user/dashboard", icon: "activity" },
        { label: "Map Workspace", href: "/user/map", icon: "map" },
        { label: "Recommendations", href: "/user/recommendations", icon: "trending-up" },
        { label: "Impact", href: "/user/impact", icon: "target" },
        { label: "Collaboration", href: "/user/collaboration", icon: "users" },
      ]} />}
    >
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 16 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${kpi.color} text-white flex items-center justify-center`}>
                      {kpi.icon}
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

        {/* Charts and Notifications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Decarbonization Progress Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Decarbonization Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={decarbonizationData}>
                      <defs>
                        <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(160 100% 41%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(160 100% 41%)" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(203 89% 53%)" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="hsl(203 89% 53%)" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
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
                        dataKey="progress" 
                        stroke="hsl(160 100% 41%)" 
                        strokeWidth={2}
                        fill="url(#progressGradient)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="target" 
                        stroke="hsl(203 89% 53%)" 
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        fill="url(#targetGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border border-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Smart Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className={`mt-1 p-1 rounded-full ${
                        notification.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                        notification.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <notification.icon className="h-3 w-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Map className="h-5 w-5" />
                <span>Open Map Workspace</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>View Recommendations</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Users className="h-5 w-5" />
                <span>Start Collaboration</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PanelShell>
  );
};

export default UserDashboard;