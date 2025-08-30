import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/layout/PanelShell";
import PanelShell from "@/components/layout/PanelShell";
import { motion } from "framer-motion";
import { MapPin, Check, X, Eye, Shield, AlertCircle } from "lucide-react";
import MapPreview from "@/components/shared/MapPreview";

const queue = [
  { id: 1, name: "Wind_Speed_2024", uploader: "Sarah Chen", submitted: "2h ago", status: "pending" },
  { id: 2, name: "Solar_Irradiance_Data", uploader: "David Kim", submitted: "5h ago", status: "pending" },
  { id: 3, name: "Hydrogen_Demand_Survey", uploader: "Michael Rodriguez", submitted: "1d ago", status: "review" },
];

export default function AdminDataModeration() {
  return (
    <PanelShell
      title="Data Moderation"
      sidebar={<Sidebar items={[
        { label: "Dashboard", href: "/admin/dashboard", icon: "activity" },
        { label: "User Management", href: "/admin/users", icon: "users" },
        { label: "Data Moderation", href: "/admin/moderation", icon: "shield" },
        { label: "System Metrics", href: "/admin/metrics", icon: "bar-chart" },
      ]} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Queue */}
        <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border border-border">
          <CardHeader>
            <CardTitle>Submission Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queue.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">by {item.uploader} • {item.submitted}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{item.status}</Badge>
                    <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" /> View</Button>
                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-500/40"><Check className="h-4 w-4 mr-1" /> Approve</Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-500/40"><X className="h-4 w-4 mr-1" /> Reject</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Preview & Reason */}
        <div className="lg:col-span-2 space-y-6">
          <MapPreview title="Submitted Data Preview" />
          <Card className="bg-card/50 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> Moderation Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Provide reason when rejecting submissions.</div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-emerald-600 border-emerald-500/40"><Check className="h-4 w-4 mr-2" />Approve</Button>
                <Button variant="outline" className="text-red-600 border-red-500/40"><X className="h-4 w-4 mr-2" />Reject</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PanelShell>
  );
}