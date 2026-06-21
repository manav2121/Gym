import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddMember from "./pages/AddMember";
import Login from "./pages/Login";

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

function App() {

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
              <AddMember />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;