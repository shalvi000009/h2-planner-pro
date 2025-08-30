import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface GaugeProps {
  value: number;
  maxValue?: number;
  title: string;
  unit?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const Gauge: React.FC<GaugeProps> = ({
  value,
  maxValue = 100,
  title,
  unit = "%",
  color = "#10b981",
  size = 200,
  strokeWidth = 12,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / maxValue, 1);
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress * circumference);

  const getColor = (progress: number) => {
    if (progress >= 0.8) return "#10b981"; // Green
    if (progress >= 0.6) return "#f59e0b"; // Amber
    if (progress >= 0.4) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

  const currentColor = getColor(progress);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
          
          <div className="relative" style={{ width: size, height: size }}>
            {/* Background circle */}
            <svg
              width={size}
              height={size}
              className="transform -rotate-90"
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              
              {/* Progress circle */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={currentColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white">
                  {value.toFixed(1)}
                </div>
                <div className="text-sm text-white/60">{unit}</div>
              </motion.div>
            </div>
          </div>
          
          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-4 flex items-center space-x-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentColor }}
            />
            <span className="text-sm text-white/80">
              {progress >= 0.8 ? "Excellent" : 
               progress >= 0.6 ? "Good" : 
               progress >= 0.4 ? "Fair" : "Needs Improvement"}
            </span>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Gauge;
