import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Zap, Leaf, DollarSign, Users } from "lucide-react";

const Dashboard = () => {
  // Sample data
  const capacityData = [
    { type: "Plants", current: 450, planned: 850, potential: 1200 },
    { type: "Storage", current: 200, planned: 450, potential: 700 },
    { type: "Pipelines", current: 1500, planned: 2800, potential: 4000 },
    { type: "Distribution", current: 300, planned: 600, potential: 900 },
  ];

  const demandSupplyData = [
    { year: "2020", demand: 100, supply: 80 },
    { year: "2021", demand: 150, supply: 120 },
    { year: "2022", demand: 200, supply: 180 },
    { year: "2023", demand: 280, supply: 250 },
    { year: "2024", demand: 350, supply: 320 },
    { year: "2025", demand: 450, supply: 430 },
    { year: "2030", demand: 800, supply: 850 },
  ];

  const renewableData = [
    { name: "Solar", value: 35, color: "hsl(48 96% 53%)" },
    { name: "Wind", value: 40, color: "hsl(201 96% 32%)" },
    { name: "Hydro", value: 15, color: "hsl(201 96% 52%)" },
    { name: "Other", value: 10, color: "hsl(215 20% 65%)" },
  ];

  const regionData = [
    { region: "Northern Europe", score: 92, co2: 2.5, investment: 450 },
    { region: "Western Europe", score: 88, co2: 2.1, investment: 380 },
    { region: "Southern Europe", score: 75, co2: 1.8, investment: 290 },
    { region: "Eastern Europe", score: 68, co2: 1.5, investment: 220 },
    { region: "Central Europe", score: 82, co2: 2.0, investment: 340 },
  ];

  const kpis = [
    {
      label: "CO₂ Avoided",
      value: "2.5M",
      unit: "tons/year",
      change: 15,
      icon: Leaf,
      color: "text-primary",
    },
    {
      label: "Investment Optimized",
      value: "$1.2B",
      unit: "total",
      change: 8,
      icon: DollarSign,
      color: "text-secondary",
    },
    {
      label: "Jobs Created",
      value: "15K",
      unit: "positions",
      change: 22,
      icon: Users,
      color: "text-accent",
    },
    {
      label: "Energy Capacity",
      value: "500",
      unit: "GW",
      change: -2,
      icon: Zap,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Impact Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights into hydrogen infrastructure and sustainability metrics
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.unit}</p>
                </div>
                <div className={`p-2 rounded-lg bg-card ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {kpi.change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-primary mr-1" />
                ) : kpi.change < 0 ? (
                  <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                ) : (
                  <Minus className="h-4 w-4 text-muted-foreground mr-1" />
                )}
                <span
                  className={
                    kpi.change > 0
                      ? "text-primary"
                      : kpi.change < 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  {Math.abs(kpi.change)}%
                </span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="capacity" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="capacity">Infrastructure</TabsTrigger>
            <TabsTrigger value="demand">Supply & Demand</TabsTrigger>
            <TabsTrigger value="renewable">Energy Mix</TabsTrigger>
            <TabsTrigger value="regions">Regional Index</TabsTrigger>
          </TabsList>

          <TabsContent value="capacity" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Infrastructure Capacity by Type</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={capacityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="current" fill="hsl(var(--primary))" name="Current" />
                  <Bar dataKey="planned" fill="hsl(var(--secondary))" name="Planned" />
                  <Bar dataKey="potential" fill="hsl(var(--accent))" name="Potential" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="demand" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Hydrogen Demand vs Supply Projection</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={demandSupplyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="demand"
                    stackId="1"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.6}
                    name="Demand (MT)"
                  />
                  <Area
                    type="monotone"
                    dataKey="supply"
                    stackId="2"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                    name="Supply (MT)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="renewable" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Renewable Energy Contribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={renewableData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {renewableData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="regions" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Regional Sustainability Index</h3>
              <div className="space-y-4">
                {regionData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-card/50 rounded-lg hover:bg-card/70 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">{region.region}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>CO₂: {region.co2}M tons</span>
                        <span>Investment: ${region.investment}M</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">{region.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;