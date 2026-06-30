import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/oric-muet-eesd2026.jpeg";
import Login from "./components/Login";

import ResearchExcellence from "./components/ResearchExcellence";
import InnovationCommercialization from "./components/InnovationCommercialization";
import SustainabilityCapacity from "./components/SustainabilityCapacityBuilding";

axios.defaults.withCredentials = true;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState("research");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  const modules = [
    { key: "research", label: "Research Excellence", short: "RE" },
    { key: "innovation", label: "Innovation & Commercialization", short: "IC" },
    { key: "sustainability", label: "Sustainability & Capacity", short: "SC" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me");
        if (res.data.success) {
          setUser(res.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout");
    } catch (error) {
      console.log(error)
    }
    setIsLoggedIn(false);
    setUser(null);
    setShowLogoutDropdown(false);
  };

  const renderModule = () => {
    switch (activeModule) {
      case "research": return <ResearchExcellence />;
      case "innovation": return <InnovationCommercialization />;
      case "sustainability": return <SustainabilityCapacity />;
      default: return <ResearchExcellence />;
    }
  };

  // Helper: department short form (first 2 letters, or first letters of each word)
  const getDepartmentShort = (dept) => {
    if (!dept) return "??";
    const parts = dept.split(" ");
    if (parts.length === 1) return dept.slice(0, 2).toUpperCase();
    const initials = parts.map(p => p[0]).join("");
    return initials.slice(0, 2).toUpperCase();
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* ─── MOBILE TOP BAR ──────────────────────────── */}
      <div className="md:hidden flex justify-between items-center bg-white shadow px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10 rounded-lg" alt="ORIC MUET" />
          <div>
            <h1 className="font-bold text-blue-900 text-sm">ORIC MUET</h1>
            <p className="text-xs text-gray-500">KPI Dashboard</p>
          </div>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-3xl text-blue-900 font-bold leading-none"
        >
          ☰
        </button>
      </div>

      {/* ─── MOBILE SIDEBAR ───────────────────────────── */}
      {mobileSidebarOpen && (
        <>
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
          <div className="fixed top-0 right-0 h-full w-64 z-50 bg-white shadow-2xl p-6 transition-transform duration-300 md:hidden flex flex-col">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Module buttons */}
            <div className="space-y-3 flex-1">
              {modules.map((m) => (
                <button
                  key={m.key}
                  onClick={() => {
                    setActiveModule(m.key);
                    setMobileSidebarOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl font-medium transition
                    ${activeModule === m.key
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }
                  `}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* ── Mobile Department + Logout (integrated) ── */}
            <div className="mt-6 border-t pt-4">
              <div className="relative">
                <button
                  onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
                  className="w-full flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 transition"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                    {getDepartmentShort(user?.department)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {user?.department || "Department"}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-auto transition-transform duration-200 ${showLogoutDropdown ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showLogoutDropdown && (
                  <div className="mt-1 bg-white border rounded-xl shadow-lg py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── DESKTOP SIDEBAR ──────────────────────────── */}
      <aside
        className={`
          hidden md:block fixed top-0 left-0 h-screen bg-white border-r shadow
          transition-all duration-300
          ${collapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Logo & collapse toggle */}
        <div
          className="flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-gray-50 transition"
          onClick={() => setCollapsed(!collapsed)}
        >
          <img src={logo} className="w-12 h-12 rounded-xl shadow-sm" alt="ORIC MUET" />
          {!collapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-bold text-blue-900 text-sm leading-tight">ORIC MUET</h1>
              <p className="text-xs text-gray-500 leading-tight">KPI Dashboard</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-2">
          {modules.map((m) => {
            const isActive = activeModule === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setActiveModule(m.key)}
                className={`
                  relative w-full flex items-center rounded-xl transition-all duration-200
                  ${collapsed ? "justify-center px-0" : "justify-start px-4"}
                  py-3
                  ${isActive ? "bg-blue-900 text-white shadow-lg" : "hover:bg-blue-50 text-gray-700"}
                `}
              >
                {!collapsed ? (
                  <span className="text-sm font-medium whitespace-nowrap">{m.label}</span>
                ) : (
                  <>
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-white text-blue-900 font-bold text-xs shadow-sm">
                      {m.short}
                    </div>
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {m.label}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* ─── USER AVATAR / DEPARTMENT BUTTON ────────── */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="relative">
            <button
              onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
              className={`
                w-full flex items-center gap-3 rounded-xl transition-all duration-200
                ${collapsed ? "justify-center px-0" : "justify-start px-4"}
                py-3 hover:bg-gray-100
              `}
            >
              <div className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {getDepartmentShort(user?.department)}
              </div>
              {!collapsed && (
                <span className="text-sm font-medium text-gray-700 truncate">
                  {user?.department || "Department"}
                </span>
              )}
              {!collapsed && (
                <svg
                  className={`w-4 h-4 ml-auto transition-transform duration-200 ${showLogoutDropdown ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {/* ─── UPDATED LOGOUT DROPDOWN ───────────── */}
            {showLogoutDropdown && (
              <div
                className={`
                  absolute bg-white border rounded-xl shadow-lg py-1 min-w-[150px] z-50
                  ${collapsed
                    ? 'left-full ml-2 top-1/2 -translate-y-1/2'
                    : 'bottom-full left-0 right-0 mb-2'
                  }
                `}
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ───────────────────────────────── */}
      <main
        className={`
          transition-all duration-300 p-4 md:p-6
          ${collapsed ? "md:ml-20" : "md:ml-72"}
          ml-0
        `}
      >
        {renderModule()}
      </main>
    </div>
  );
}