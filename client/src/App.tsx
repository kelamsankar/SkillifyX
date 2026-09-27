import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Verify from "./pages/Auth/Verify";
import Dashboard from "./pages/Dashboard";
import Forgot from "./pages/Auth/Forgot";
import Reset from "./pages/Auth/Reset";
import ProtectedRoute from "./components/ProtectedRoute";
import SkillSyncDashboard from "./pages/SkillSyncDashboard";
import StartifyDashboard from "./pages/StartifyDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/skillsync-dashboard" element={
          <ProtectedRoute>
            <SkillSyncDashboard />
          </ProtectedRoute>
        } />
        <Route path="/startify-dashboard" element={
          <ProtectedRoute>
            <StartifyDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;