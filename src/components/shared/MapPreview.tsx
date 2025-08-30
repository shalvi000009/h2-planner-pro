import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Marker {
  id: string;
  x: number; // 0..100 percent
  y: number; // 0..100 percent
  color?: string;
  label?: string;
}

interface MapPreviewProps {
  title?: string;
  markers?: Marker[];
  height?: number;
}

const defaultMarkers: Marker[] = [
  { id: "m1", x: 30, y: 40, color: "bg-emerald-400", label: "Site A" },
  { id: "m2", x: 60, y: 55, color: "bg-cyan-400", label: "Site B" },
  { id: "m3", x: 75, y: 28, color: "bg-amber-400", label: "Site C" },
];

const MapPreview: React.FC<MapPreviewProps> = ({ title = "Map Preview", markers = defaultMarkers, height = 260 }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-md border border-white/20 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="text-xs text-muted-foreground">Placeholder</div>
      </div>
      <div
        className="relative w-full"
        style={{ height }}
      >
        {/* Gradient map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-sky-900/30 to-emerald-900/30" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        {/* Markers */}
        {markers.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            className={`absolute w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg ${m.color || 'bg-emerald-400'}`}
            style={{ left: `${m.x}%`, top: `${m.y}%`, boxShadow: "0 0 12px rgba(16,185,129,0.6)" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.08 }}
              className="absolute -top-6 -left-3 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur"
            >
              {m.label}
            </motion.span>
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ boxShadow: [
                "0 0 6px rgba(16,185,129,0.6)",
                "0 0 18px rgba(16,185,129,1)",
                "0 0 6px rgba(16,185,129,0.6)"
              ]}}
              transition={{ repeat: Infinity, duration: 2.2 }}
            />
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default MapPreview;