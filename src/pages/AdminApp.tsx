import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      {/* Add more admin routes here as they are created */}
    </Routes>
  );
};

export default AdminApp;