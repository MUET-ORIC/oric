import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/oric-muet-eesd2026.jpeg";


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

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password || !department) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("/login", {
                username,
                password,
                department
            });
            if (response.data.success) {
                toast.success("Welcome back!");
                onLogin(response.data.user);
            } else {
                toast.error(response.data.message || "Login failed.");
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Server error.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const selectDepartment = (dept) => {
        setDepartment(dept);
        setIsDropdownOpen(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <Toaster position="top-right" />
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
                <div className="flex flex-col items-center mb-8">
                    <img src={logo} alt="ORIC MUET" className="w-20 h-20 rounded-2xl shadow-md mb-3" />
                    <h1 className="text-2xl font-bold text-blue-900 tracking-tight">ORIC MUET</h1>
                    <p className="text-sm text-gray-500">KPI Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-base bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-base bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Department
                        </label>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-gray-200 text-base bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all hover:bg-white"
                            >
                                <span className={department ? "text-gray-700" : "text-gray-400"}>
                                    {department || "Select your department"}
                                </span>
                                <svg
                                    className={`w-5 h-5 ml-2 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 right-0 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-lg z-50 top-full mt-1 md:bottom-full md:top-auto md:mb-1">
                                    {departments.map((dept) => (
                                        <button
                                            key={dept}
                                            type="button"
                                            onClick={() => selectDepartment(dept)}
                                            className={`
                                                w-full text-left px-4 py-3 text-sm
                                                hover:bg-blue-50 transition-colors
                                                ${department === dept ? "bg-blue-50 text-blue-900 font-medium" : "text-gray-700"}
                                                border-b border-gray-100 last:border-0
                                            `}
                                        >
                                            {dept}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-4 rounded-2xl bg-blue-900 text-white text-base font-semibold active:scale-[0.98] hover:bg-blue-800 transition-all shadow-md active:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                    &copy; {new Date().getFullYear()} ORIC MUET
                </p>
            </div>
        </div>
    );
}