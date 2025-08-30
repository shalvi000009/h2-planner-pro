export const userKPIs = [
  {
    title: "CO₂ Saved",
    value: 2500000,
    unit: "tons/year",
    change: 15,
    icon: "Leaf",
    color: "text-green-400",
  },
  {
    title: "Jobs Created",
    value: 15000,
    unit: "positions",
    change: 22,
    icon: "Users",
    color: "text-blue-400",
  },
  {
    title: "Net-Zero Progress",
    value: 78,
    unit: "%",
    change: 8,
    icon: "Target",
    color: "text-purple-400",
  },
  {
    title: "Investment Optimized",
    value: 1200000000,
    unit: "$",
    change: 12,
    icon: "DollarSign",
    color: "text-amber-400",
  },
];

export const impactData = [
  { year: "2025", co2: 100, jobs: 5000, investment: 200 },
  { year: "2026", co2: 150, jobs: 7500, investment: 350 },
  { year: "2027", co2: 220, jobs: 11000, investment: 520 },
  { year: "2028", co2: 300, jobs: 15000, investment: 720 },
  { year: "2029", co2: 400, jobs: 20000, investment: 950 },
  { year: "2030", co2: 520, jobs: 26000, investment: 1200 },
];

export const recommendations = [
  {
    id: 1,
    name: "Northern Germany Hub",
    location: "Hamburg, Germany",
    score: 92,
    priority: "High",
    co2Reduction: "450K tons/year",
    investment: "$780M",
    timeline: "2025-2027",
    status: "Recommended",
    details: {
      infrastructure: ["H2 Plant", "Storage Facility", "Distribution Hub"],
      renewableSources: ["Offshore Wind", "Solar"],
      demandCenters: ["Industrial Zone", "Port Operations"],
    },
  },
  {
    id: 2,
    name: "Mediterranean Network",
    location: "Barcelona, Spain",
    score: 85,
    priority: "High",
    co2Reduction: "320K tons/year",
    investment: "$520M",
    timeline: "2025-2026",
    status: "Under Review",
    details: {
      infrastructure: ["H2 Plant", "Pipeline Network"],
      renewableSources: ["Solar", "Wind"],
      demandCenters: ["Port", "Industrial Park"],
    },
  },
  {
    id: 3,
    name: "Central European Hub",
    location: "Prague, Czech Republic",
    score: 78,
    priority: "Medium",
    co2Reduction: "280K tons/year",
    investment: "$420M",
    timeline: "2026-2028",
    status: "Planned",
    details: {
      infrastructure: ["H2 Plant", "Storage"],
      renewableSources: ["Solar", "Biomass"],
      demandCenters: ["Manufacturing", "Transport"],
    },
  },
];

export const collaborationScenarios = [
  {
    id: 1,
    name: "European Green Corridor",
    createdBy: "Sarah Johnson",
    lastModified: "2024-03-15",
    participants: 12,
    status: "Active",
    impact: {
      co2Reduction: "1.2M tons/year",
      investment: "$2.1B",
      jobs: "18K",
    },
  },
  {
    id: 2,
    name: "Baltic Sea Initiative",
    createdBy: "Michael Chen",
    lastModified: "2024-03-10",
    participants: 8,
    status: "Review",
    impact: {
      co2Reduction: "850K tons/year",
      investment: "$1.5B",
      jobs: "12K",
    },
  },
];

export const notifications = [
  {
    id: 1,
    type: "recommendation",
    message: "New high-priority site available in Hamburg",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "collaboration",
    message: "Sarah Johnson commented on European Green Corridor",
    time: "15 minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "system",
    message: "Monthly impact report is ready",
    time: "1 hour ago",
    unread: false,
  },
];
