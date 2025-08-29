import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Recommendations from "./Recommendations";
import Scenarios from "./Scenarios";

const UserApp = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="recommendations" element={<Recommendations />} />
      <Route path="scenarios" element={<Scenarios />} />
    </Routes>
  );
};

export default UserApp;