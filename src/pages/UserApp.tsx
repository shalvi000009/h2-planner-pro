import React from "react";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./user/UserDashboard";
import UserMapWorkspace from "./user/UserMapWorkspace";
import UserRecommendations from "./user/UserRecommendations";
import UserImpact from "./user/UserImpact";
import UserCollaboration from "./user/UserCollaboration";

const UserApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/map" element={<UserMapWorkspace />} />
      <Route path="/recommendations" element={<UserRecommendations />} />
      <Route path="/impact" element={<UserImpact />} />
      <Route path="/collaboration" element={<UserCollaboration />} />
    </Routes>
  );
};

export default UserApp;