import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card } from "@/components/ui/card";

interface ImpactChartProps {
  data: Array<{ [key: string]: string | number }>;
  type?: "line" | "area" | "bar";
  title: string;
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
}

const ImpactChart: React.FC<ImpactChartProps> = ({
  data,
  type = "line",
  title,
  xKey,
  yKey,
  color = "#10b981",
  height = 300,
  showGrid = true,
  showTooltip = true,
}) => {
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: string | number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-gray-600">
            {`${yKey}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
            <XAxis
              dataKey={xKey}
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={color}
              fill={`url(#gradient-${yKey})`}
              strokeWidth={2}
            />
            <defs>
              <linearGradient id={`gradient-${yKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
            <XAxis
              dataKey={xKey}
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
            <XAxis
              dataKey={xKey}
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        </div>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
};

export default ImpactChart;
