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

// ─── Axios Interceptor ──────────────────────────────────────────────
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// ─── App Content ─────────────────────────────────────────────────────
function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ─── Loading State ──────────────────────────────────────────────
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

  // ─── Main Layout ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ─── Sidebar ───────────────────────────────────────────── */}
      {user && (
        <Sidebar
          collapsed={sidebarCollapsed}
          toggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      )}

      {/* ─── Main Content ──────────────────────────────────────── */}
      <div
        className={`flex-1 transition-all duration-300 ${user ? (sidebarCollapsed ? 'ml-16' : 'ml-64') : 'ml-0'
          }`}
      >
        {/* ─── Navbar ─────────────────────────────────────────── */}
        {user && <Navbar />}

        {/* ─── Page Content with Transitions ────────────────── */}
        <main className="p-4 md:p-6">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* ─── Public Routes ──────────────────────── */}
              <Route
                path="/login"
                element={<PageTransition><Login /></PageTransition>}
              />

              {/* ─── Department Routes ──────────────────── */}
              <Route element={<ProtectedRoute allowedRoles={['department']} />}>
                <Route path="/" element={<PageTransition><DepartmentDashboard /></PageTransition>} />
                <Route path="/research" element={<PageTransition><ResearchExcellence /></PageTransition>} />
                <Route path="/innovation" element={<PageTransition><InnovationCommercialization /></PageTransition>} />
                <Route path="/sustainability" element={<PageTransition><SustainabilityCapacityBuilding /></PageTransition>} />
                <Route path="/my-submissions" element={<PageTransition><MySubmissionsPage /></PageTransition>} />
              </Route>

              {/* ─── Admin Routes ───────────────────────── */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
                <Route path="/admin/submissions" element={<PageTransition><ManageSubmissions /></PageTransition>} />
                <Route path="/admin/submissions/:id" element={<PageTransition><SubmissionDetailPage /></PageTransition>} />
              </Route>

              {/* ─── Fallback ───────────────────────────── */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      user
                        ? user.role === 'admin'
                          ? '/admin'
                          : '/research'
                        : '/login'
                    }
                  />
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* ─── Global Toaster ────────────────────────────────────── */}
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ marginTop: '20px', marginRight: '20px' }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'transparent',
            padding: 0,
            boxShadow: 'none',
            borderRadius: 0,
            maxWidth: '420px',
          },
        }}
      />
    </div>
  );
}

// ─── App ────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}