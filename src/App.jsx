// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import { requestNotificationPermission } from './utils/notification';

export default function App() {

useEffect(() => {
  requestNotificationPermission();
}, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/task/:id" element={<TaskPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}


