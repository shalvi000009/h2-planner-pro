import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUserManagement from "./admin/AdminUserManagement";
import AdminDataModeration from "./admin/AdminDataModeration";
import AdminSystemMetrics from "./admin/AdminSystemMetrics";

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/users" element={<AdminUserManagement />} />
      <Route path="/moderation" element={<AdminDataModeration />} />
      <Route path="/metrics" element={<AdminSystemMetrics />} />
    </Routes>
  );
};

export default AdminApp;