import React from "react";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./user/UserDashboard";

const UserApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      {/* Add more user routes here as they are created */}
    </Routes>
  );
};

export default UserApp;