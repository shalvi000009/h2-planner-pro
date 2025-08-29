import { Routes, Route, Navigate } from "react-router-dom";

// Minimal admin pages placeholders (you can swap later)
const AdminDashboard = () => <div className="p-6">Admin Dashboard</div>;
const UserManagement = () => <div className="p-6">User Management</div>;
const DataModeration = () => <div className="p-6">Data Moderation</div>;
const SystemMetrics = () => <div className="p-6">System Metrics</div>;

const AdminApp = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="moderation" element={<DataModeration />} />
      <Route path="metrics" element={<SystemMetrics />} />
    </Routes>
  );
};

export default AdminApp;