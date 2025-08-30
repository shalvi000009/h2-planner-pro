import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  Leaf, 
  Award, 
  Users, 
  Zap,
  Calendar,
  MapPin,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// Sample data for CO₂ reduction time-series
const co2ReductionData = [
  { month: 'Jan', reduction: 120000, target: 150000, cumulative: 120000 },
  { month: 'Feb', reduction: 135000, target: 150000, cumulative: 255000 },
  { month: 'Mar', reduction: 142000, target: 150000, cumulative: 397000 },
  { month: 'Apr', reduction: 158000, target: 150000, cumulative: 555000 },
  { month: 'May', reduction: 165000, target: 150000, cumulative: 720000 },
  { month: 'Jun', reduction: 178000, target: 150000, cumulative: 898000 },
  { month: 'Jul', reduction: 185000, target: 150000, cumulative: 1083000 },
  { month: 'Aug', reduction: 192000, target: 150000, cumulative: 1275000 },
  { month: 'Sep', reduction: 205000, target: 150000, cumulative: 1480000 },
  { month: 'Oct', reduction: 218000, target: 150000, cumulative: 1698000 },
  { month: 'Nov', reduction: 225000, target: 150000, cumulative: 1923000 },
  { month: 'Dec', reduction: 235000, target: 150000, cumulative: 2158000 },
];

// Regional leaderboard data
const regionalLeaderboard = [
  { rank: 1, region: "Texas Gulf Coast", co2Reduction: 450000, projects: 8, growth: 12.5, trend: "up" },
  { rank: 2, region: "California Central Valley", co2Reduction: 380000, projects: 6, growth: 8.2, trend: "up" },
  { rank: 3, region: "Florida Peninsula", co2Reduction: 320000, projects: 5, growth: 15.8, trend: "up" },
  { rank: 4, region: "Washington State", co2Reduction: 290000, projects: 4, growth: 6.4, trend: "up" },
  { rank: 5, region: "Arizona Desert", co2Reduction: 265000, projects: 3, growth: 22.1, trend: "up" },
  { rank: 6, region: "Colorado Rockies", co2Reduction: 240000, projects: 4, growth: 4.7, trend: "down" },
  { rank: 7, region: "Illinois Plains", co2Reduction: 210000, projects: 3, growth: 9.3, trend: "up" },
  { rank: 8, region: "Michigan Lakes", co2Reduction: 185000, projects: 2, growth: 11.2, trend: "up" },
];

// Net-zero progress data
const netZeroProgress = {
  current: 62,
  target: 100,
  sectors: [
    { name: "Energy", progress: 75, color: "#00d084" },
    { name: "Transport", progress: 45, color: "#1da1f2" },
    { name: "Industry", progress: 38, color: "#ffb703" },
    { name: "Buildings", progress: 52, color: "#8b5cf6" },
  ]
};

const UserImpact: React.FC = () => {
  const COLORS = ['#00d084', '#1da1f2', '#ffb703', '#8b5cf6'];

  return (
    <PanelShell
      title="Impact Dashboard"
      sidebar={<Sidebar items={[
        { label: "Dashboard", href: "/user/dashboard", icon: "activity" },
        { label: "Map Workspace", href: "/user/map", icon: "map" },
        { label: "Recommendations", href: "/user/recommendations", icon: "trending-up" },
        { label: "Impact", href: "/user/impact", icon: "target" },
        { label: "Collaboration", href: "/user/collaboration", icon: "users" },
      ]} />}
    >
      <div className="space-y-6">
        {/* Impact Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +15%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total CO₂ Reduced</p>
                  <p className="text-2xl font-bold">2.16M t</p>
                  <p className="text-xs text-muted-foreground">This year</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +8%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Net-Zero Progress</p>
                  <p className="text-2xl font-bold">62%</p>
                  <p className="text-xs text-muted-foreground">Target: 100%</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Jobs Created</p>
                  <p className="text-2xl font-bold">15.3k</p>
                  <p className="text-xs text-muted-foreground">Direct & indirect</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +18%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Energy Generated</p>
                  <p className="text-2xl font-bold">1.85 GW</p>
                  <p className="text-xs text-muted-foreground">Clean energy</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CO₂ Reduction Time-Series */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                CO₂ Reduction Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={co2ReductionData}>
                    <defs>
                      <linearGradient id="reductionGradient" x1="0" y1="0" x2="0" y2="1">
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
                    <Line 
                      type="monotone" 
                      dataKey="reduction" 
                      stroke="hsl(160 100% 41%)" 
                      strokeWidth={3}
                      fill="url(#reductionGradient)"
                      dot={{ fill: 'hsl(160 100% 41%)', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="hsl(203 89% 53%)" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: 'hsl(203 89% 53%)', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Net-Zero Gauge */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Net-Zero Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Main Gauge */}
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - netZeroProgress.current / 100)}`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(160 100% 41%)" />
                          <stop offset="100%" stopColor="hsl(203 89% 53%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-foreground">{netZeroProgress.current}%</div>
                        <div className="text-sm text-muted-foreground">Complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sector Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-medium">Sector Progress</h4>
                  {netZeroProgress.sectors.map((sector, index) => (
                    <div key={sector.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{sector.name}</span>
                        <span className="font-medium">{sector.progress}%</span>
                      </div>
                      <Progress value={sector.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Leaderboard */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Regional Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalLeaderboard.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {region.rank}
                    </div>
                    <div>
                      <h4 className="font-medium">{region.region}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{region.projects} projects</span>
                        <span>{(region.co2Reduction / 1000).toFixed(0)}k t CO₂</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        {region.trend === "up" ? (
                          <ArrowUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={region.trend === "up" ? "text-green-500" : "text-red-500"}>
                          {region.growth}%
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">Growth</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PanelShell>
  );
};

export default UserImpact;
