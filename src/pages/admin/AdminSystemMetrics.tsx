import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion } from "framer-motion";
import { Activity, Gauge as GaugeIcon, Timer, Database, BarChart4 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const latencyData = [
  { t: "10:00", ms: 42 },
  { t: "10:10", ms: 38 },
  { t: "10:20", ms: 51 },
  { t: "10:30", ms: 47 },
  { t: "10:40", ms: 43 },
  { t: "10:50", ms: 39 },
];

const queryData = [
  { t: "10:00", qps: 120 },
  { t: "10:10", qps: 132 },
  { t: "10:20", qps: 115 },
  { t: "10:30", qps: 148 },
  { t: "10:40", qps: 156 },
  { t: "10:50", qps: 138 },
];

export default function AdminSystemMetrics() {
  return (
    <PanelShell
      title="System Metrics"
      sidebar={<Sidebar items={[
        { label: "Dashboard", href: "/admin/dashboard", icon: "activity" },
        { label: "User Management", href: "/admin/users", icon: "users" },
        { label: "Data Moderation", href: "/admin/moderation", icon: "shield" },
        { label: "System Metrics", href: "/admin/metrics", icon: "bar-chart" },
      ]} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Timer className="h-4 w-4" /> Server Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="t" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="ms" stroke="hsl(203 89% 53%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="h-4 w-4" /> DB Query Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={queryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="t" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="qps" stroke="hsl(160 100% 41%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </PanelShell>
  );
}