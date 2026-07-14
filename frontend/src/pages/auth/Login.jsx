import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showWarning } from "../../utils/toast";
import { FiUser, FiLock, FiLogIn, FiShield, FiBriefcase, FiChevronDown } from "react-icons/fi";
import logo from "../../assets/oric-muet-eesd2026.jpeg";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [loginRole, setLoginRole] = useState("department");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    const departments = [
        "Architecture",
        "Basic Sciences & Related Studies",
        "Bio-Medical Engineering",
        "Centre of English Language & Linguistics",
        "Chemical Engineering",
        "City & Regional Planning",
        "Civil Engineering",
        "Computer Systems Engineering",
        "Electrical Engineering",
        "Electronic Engineering",
        "Environmental Engineering",
        "Industrial Engineering & Management",
        "Institute of Water Resources Engineering & Management",
        "Mechanical Engineering",
        "Mechatronic Engineering",
        "Metallurgy & Materials Engineering",
        "Mehran University Institute of Science, Technology & Development",
        "Mining Engineering",
        "Petroleum & Natural Gas Engineering",
        "Software Engineering",
        "Telecommunication Engineering",
        "Textile Engineering"
    ];

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            showWarning("Credentials Required", "Please enter both username and password.");
            return;
        }

        if (loginRole === "department" && !department) {
            showWarning("Department Required", "Please select your department.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`/auth/login`, { username, password });

            if (res.data.success) {
                const { user } = res.data;

                if (loginRole === "admin" && user.role !== "admin") {
                    showError("Access Denied", "This account is not registered as an administrator.");
                    setLoading(false);
                    return;
                }
                if (loginRole === "department" && user.role !== "department") {
                    showError("Access Denied", "This account is not registered as a department user.");
                    setLoading(false);
                    return;
                }

                if (loginRole === "department" && user.department !== department) {
                    showError(
                        "Department Mismatch",
                        `Please select the correct department.`
                    );
                    setDepartment("");
                    setLoading(false);
                    return;
                }

                login(user);
                showSuccess("Welcome Back!", `${user.username}, you have successfully logged in.`);
                navigate(user.role === "admin" ? "/admin" : "/research");
            } else {
                showError("Login Failed", res.data.message || "Invalid credentials.");
            }
        } catch (err) {
            showError("Server Error", err.response?.data?.message || "Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-blue-100 p-4">
            <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden flex flex-col md:flex-row animate-fadeInUp">
                {/* Left Panel – Branding */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-900 to-indigo-800 p-8 md:p-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow" />
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-float-delayed" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative mb-4">
                            <img
                                src={logo}
                                alt="ORIC MUET"
                                className="w-28 h-28 rounded-2xl shadow-2xl border-2 border-white/20 object-contain animate-breathing"
                            />
                            <div className="absolute -inset-2 bg-blue-400/20 rounded-3xl blur-2xl -z-10 animate-pulse-slow" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">ORIC MUET</h1>
                        <p className="text-blue-200/90 text-sm mt-1 font-light">KPI Management Portal</p>
                        <div className="w-16 h-0.5 bg-blue-400/60 rounded-full my-3" />
                        <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs">
                            Streamline your KPI submissions, track progress, and generate insightful reports.
                        </p>
                        <div className="mt-6 flex gap-2 flex-wrap justify-center">
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">Secure</span>
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">Real‑time</span>
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">Efficient</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel – Form */}
                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
                        <p className="text-sm text-slate-500 mt-1">Sign in to access your dashboard</p>

                        {/* Role toggle – sliding pill */}
                        <div className="relative flex bg-slate-100/80 backdrop-blur-sm rounded-2xl p-1.5 mt-6 border border-white/50 shadow-inner">
                            <div
                                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-md shadow-blue-100/50 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${loginRole === "department" ? "left-1.5" : "left-[calc(50%+3px)]"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setLoginRole("department")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 relative z-10 ${loginRole === "department" ? "text-blue-900" : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                <FiBriefcase className="w-4 h-4" />
                                Department
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginRole("admin")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 relative z-10 ${loginRole === "admin" ? "text-blue-900" : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                <FiShield className="w-4 h-4" />
                                Admin
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Username</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <FiUser className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-9 pr-3 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none hover:border-slate-300"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Password</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <FiLock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-9 pr-3 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none hover:border-slate-300"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Department field – dropdown opens upward */}
                            <div
                                className={`transition-all duration-300 ease-in-out ${loginRole === "department" && isDropdownOpen ? "overflow-visible" : "overflow-hidden"
                                    }`}
                            >
                                <div
                                    className={`${loginRole === "department" ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                        } transition-all duration-300 ease-in-out`}
                                >
                                    {loginRole === "department" && (
                                        <div className="relative" ref={dropdownRef}>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Department</label>
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className={`w-full flex items-center justify-between px-3 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl hover:border-slate-300 transition-all duration-200 text-sm ${department ? "text-slate-700" : "text-slate-400"
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                                            >
                                                <span className="truncate">{department || "Select your department"}</span>
                                                <FiChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                                                    }`} />
                                            </button>

                                            {/* Dropdown positioned above the button */}
                                            <div className="absolute left-0 right-0 bottom-full mb-1 z-50">
                                                <div
                                                    className={`${isDropdownOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                                                        } transition-all duration-200 ease-in-out overflow-y-auto`}
                                                    style={{
                                                        scrollbarWidth: 'thin',
                                                        scrollbarColor: '#94a3b8 #f1f5f9',
                                                    }}
                                                >
                                                    {isDropdownOpen && (
                                                        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg py-1">
                                                            {departments.map((dept) => (
                                                                <button
                                                                    key={dept}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setDepartment(dept);
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                    className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${department === dept
                                                                        ? "bg-blue-50 text-blue-900 font-medium"
                                                                        : "text-slate-600 hover:bg-slate-50"
                                                                        }`}
                                                                >
                                                                    {dept}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full py-3.5 bg-gradient-to-r from-blue-900 to-indigo-800 text-white font-semibold rounded-xl overflow-hidden shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 group"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <FiLogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-slate-400 mt-2">Secure login • Protected by SSL</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}