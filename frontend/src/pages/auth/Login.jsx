import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showWarning } from "../../utils/toast";
import {
    FiUser,
    FiLock,
    FiArrowRight,
    FiShield,
    FiBriefcase,
    FiCheckCircle,
    FiChevronDown
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/oric-muet-eesd2026.jpeg";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [loginRole, setLoginRole] = useState("department");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
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
            const res = await axios.post(`${API_BASE}/auth/login`, { username, password });

            if (res.data.success) {
                const { user, token } = res.data;

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

                login(user, token);
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

    // ─── Animation Variants ──────────────────────────────────────────────
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                when: "beforeChildren",
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const logoVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.1
            }
        }
    };

    const buttonVariants = {
        idle: { scale: 1 },
        hover: {
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 10 }
        },
        tap: {
            scale: 0.97,
            transition: { type: "spring", stiffness: 400, damping: 10 }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row"
            >
                {/* ─── Left Panel – Branding ──────────────────────────────── */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-900 to-blue-800 p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    {/* Animated background pattern */}
                    <motion.div
                        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, 0]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            variants={logoVariants}
                            className="mb-5"
                        >
                            <img src={logo} alt="ORIC MUET" className="w-20 h-20 rounded-2xl shadow-lg" />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h1 className="text-2xl font-bold text-white tracking-tight">ORIC MUET</h1>
                            <p className="text-blue-200/80 text-sm mt-0.5">KPI Management Portal</p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-4 w-12 h-0.5 bg-blue-400/60 rounded-full"
                        />

                        <motion.p
                            variants={itemVariants}
                            className="text-blue-100/70 text-sm mt-4 leading-relaxed max-w-xs"
                        >
                            Streamline your KPI submissions, track progress, and generate reports – all in one place.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-6 space-y-2 text-xs text-blue-200/60"
                        >
                            {["Secure & reliable", "Real‑time dashboard", "Exportable reports"].map((text, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-2 justify-center"
                                    whileHover={{ x: 4 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <FiCheckCircle className="w-3.5 h-3.5 text-blue-300" />
                                    <span>{text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 text-blue-300/40 text-xs"
                        >
                            &copy; {new Date().getFullYear()} ORIC MUET
                        </motion.div>
                    </div>
                </div>

                {/* ─── Right Panel – Login Form ────────────────────────────── */}
                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="max-w-sm mx-auto w-full">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
                            <p className="text-sm text-slate-500 mt-1">Sign in to access your dashboard</p>
                        </motion.div>

                        {/* ─── Role Toggle ──────────────────────────────────── */}
                        <motion.div
                            variants={itemVariants}
                            className="flex bg-slate-100 rounded-xl p-1 mt-6 relative"
                        >
                            <motion.div
                                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm"
                                animate={{
                                    x: loginRole === "department" ? 0 : "calc(100% + 4px)"
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                            <button
                                type="button"
                                onClick={() => setLoginRole("department")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 relative z-10 ${loginRole === "department"
                                    ? "text-blue-900"
                                    : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                <FiBriefcase className="w-4 h-4" />
                                Department
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginRole("admin")}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 relative z-10 ${loginRole === "admin"
                                    ? "text-blue-900"
                                    : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                <FiShield className="w-4 h-4" />
                                Admin
                            </button>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                            {/* ─── Username ──────────────────────────────────── */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Username
                                </label>
                                <motion.div
                                    className="relative"
                                    animate={{
                                        scale: focusedField === "username" ? 1.01 : 1
                                    }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <FiUser className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onFocus={() => setFocusedField("username")}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-9 pr-3 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-500 transition-colors text-sm text-slate-700 placeholder:text-slate-400 outline-none hover:border-slate-300"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </motion.div>
                            </motion.div>

                            {/* ─── Password ──────────────────────────────────── */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                    Password
                                </label>
                                <motion.div
                                    className="relative"
                                    animate={{
                                        scale: focusedField === "password" ? 1.01 : 1
                                    }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <FiLock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedField("password")}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-9 pr-3 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-500 transition-colors text-sm text-slate-700 placeholder:text-slate-400 outline-none hover:border-slate-300"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </motion.div>
                            </motion.div>

                            {/* ─── Department Dropdown ───────────────────────── */}
                            {loginRole === "department" && (
                                <motion.div
                                    variants={itemVariants}
                                    className="relative"
                                    ref={dropdownRef}
                                >
                                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                                        Department
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`w-full flex items-center justify-between px-3 py-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors text-sm ${department ? "text-slate-700" : "text-slate-400"
                                            }`}
                                    >
                                        <span className="truncate">{department || "Select your department"}</span>
                                        <motion.div
                                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiChevronDown className="w-4 h-4 text-slate-400" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                                transition={{ duration: 0.15, ease: "easeOut" }}
                                                className="absolute left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50"
                                            >
                                                <div className="p-1">
                                                    {departments.map((dept) => (
                                                        <button
                                                            key={dept}
                                                            type="button"
                                                            onClick={() => {
                                                                setDepartment(dept);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${department === dept
                                                                ? "bg-blue-50 text-blue-900 font-medium"
                                                                : "text-slate-600 hover:bg-slate-50"
                                                                }`}
                                                        >
                                                            {dept}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}

                            {/* ─── Submit Button ────────────────────────────── */}
                            <motion.div variants={itemVariants}>
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    variants={buttonVariants}
                                    initial="idle"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="w-full py-3.5 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-sm hover:shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <motion.div
                                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            />
                                            <span>Signing in...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <motion.div
                                                animate={{ x: 0 }}
                                                whileHover={{ x: 4 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <FiArrowRight className="w-4 h-4" />
                                            </motion.div>
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>

                            <motion.p
                                variants={itemVariants}
                                className="text-center text-xs text-slate-400 pt-1"
                            >
                                {loginRole === "admin"
                                    ? "Administrator access is restricted."
                                    : "Select your department to continue."
                                }
                            </motion.p>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}