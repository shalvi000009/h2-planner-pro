import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUserManagement from "./admin/AdminUserManagement";

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/users" element={<AdminUserManagement />} />
      {/* Add more admin routes here as they are created */}
    </Routes>
  );
};

export default AdminApp;