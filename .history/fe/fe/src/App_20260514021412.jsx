import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddMember from "./pages/AddMember";
import Login from "./pages/Login";

import Members from "./pages/Members";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/login" />;
}

function App()
 {
const [sidebarOpen, setSidebarOpen] =
  useState(false);
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-member"
          element={
            <ProtectedRoute>
              <AddMember
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </ProtectedRoute>
          }
        />

        <Route
  path="/members"
  element={
    <ProtectedRoute>

      <Members
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

    </ProtectedRoute>
  }
/>

        <Route
  path="/attendance"
  element={
    <ProtectedRoute>

      <Attendance
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

    </ProtectedRoute>
  }
/>

        <Route
  path="/payments"
  element={
    <ProtectedRoute>

      <Payments
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

    </ProtectedRoute>
  }
/>

      <Route
  path="/analytics"
  element={
    <ProtectedRoute>

      <Analytics
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

    </ProtectedRoute>
  }
/>

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;