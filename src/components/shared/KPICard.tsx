import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon: LucideIcon;
  color?: string;
  delay?: number;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  color = "text-primary",
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const numericValue = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^\d.-]/g, ""));
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(timer);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    } else if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toFixed(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 group">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
              className={`p-3 rounded-lg bg-gradient-to-r from-teal-400/20 to-amber-400/20 ${color}`}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
            {change !== undefined && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
                transition={{ delay: delay + 0.4 }}
                className={`flex items-center space-x-1 text-sm font-medium ${
                  change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                <span>{change >= 0 ? "+" : ""}{change}%</span>
              </motion.div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/70">{title}</h3>
            <div className="flex items-baseline space-x-2">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ delay: delay + 0.3 }}
                className="text-3xl font-bold text-white"
              >
                {typeof value === "number" ? formatValue(displayValue) : value}
              </motion.span>
              {unit && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ delay: delay + 0.5 }}
                  className="text-sm text-white/60"
                >
                  {unit}
                </motion.span>
              )}
            </div>
          </div>
        </div>

        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-amber-500/5 to-navy-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </Card>
    </motion.div>
  );
};

export default KPICard;
