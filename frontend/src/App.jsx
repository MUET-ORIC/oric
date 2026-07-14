import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { AuthProvider, useAuth } from './context/AuthContext';

// ─── Components ──────────────────────────────────────────────────────
import ProtectedRoute from './components/common/ProtectedRoute';
import PageTransition from './components/common/PageTransition';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';

// ─── Pages ──────────────────────────────────────────────────────────
import Login from './pages/auth/Login';
import DepartmentDashboard from './pages/department/DepartmentDashboard';
import ResearchExcellence from './pages/department/ResearchExcellence';
import InnovationCommercialization from './pages/department/InnovationCommercialization';
import SustainabilityCapacityBuilding from './pages/department/SustainabilityCapacityBuilding';
import MySubmissionsPage from './pages/department/MySubmissionsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageSubmissions from './pages/admin/ManageSubmissions';
import SubmissionDetailPage from './pages/admin/SubmissionDetailPage';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
console.log("🔗 Axios is pointing to:", axios.defaults.baseURL);

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
          <p className="mt-2 text-slate-500 text-sm font-medium">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {user && (
        <Sidebar
          collapsed={sidebarCollapsed}
          toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}
      <div
        className={`flex-1 transition-all duration-300 ${user ? (sidebarCollapsed ? 'ml-16' : 'ml-64') : 'ml-0'
          }`}
      >
        {user && <Navbar />}
        <main className="p-4 md:p-6">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public route */}
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />

              {/* ─── Department Routes ─────────────────────────────── */}
              <Route element={<ProtectedRoute allowedRoles={['department']} />}>
                {/* Root redirects to department dashboard */}
                <Route path="/" element={<Navigate to="/department" replace />} />
                <Route path="/department" element={<PageTransition><DepartmentDashboard /></PageTransition>} />
                <Route path="/research" element={<PageTransition><ResearchExcellence /></PageTransition>} />
                <Route path="/innovation" element={<PageTransition><InnovationCommercialization /></PageTransition>} />
                <Route path="/sustainability" element={<PageTransition><SustainabilityCapacityBuilding /></PageTransition>} />
                <Route path="/my-submissions" element={<PageTransition><MySubmissionsPage /></PageTransition>} />
              </Route>

              {/* ─── Admin Routes ──────────────────────────────────── */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
                <Route path="/admin/submissions" element={<PageTransition><ManageSubmissions /></PageTransition>} />
                <Route path="/admin/submissions/:id" element={<PageTransition><SubmissionDetailPage /></PageTransition>} />
              </Route>

              {/* ─── Catch‑all Redirect ───────────────────────────── */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      user
                        ? user.role === 'admin'
                          ? '/admin'
                          : '/department'
                        : '/login'
                    }
                    replace
                  />
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}