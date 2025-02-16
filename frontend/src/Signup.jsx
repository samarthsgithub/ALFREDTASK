import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, KeyRound, UserPlus, Home, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/dashboard");
    }, [navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://alfredtask-ydv9.onrender.com/api/users/signup", form);
            navigate("/signin");
        } catch (error) {
            alert("Signup failed");
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className={`py-4 px-6 flex justify-between items-center shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                <h1 className="text-2xl font-bold text-indigo-600">FlashMaster</h1>
                <div className="flex space-x-4">
                    <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-all">
                        {theme === "light" ? <Moon className="w-5 h-5 text-gray-900" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        <span>Go to Home</span>
                    </button>
                </div>
            </nav>

            <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"}`}>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`w-full max-w-md rounded-2xl shadow-xl p-8 space-y-8 transition-all ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
                >
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-gray-700 mb-4">
                            <UserPlus className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-3xl font-bold">Create Account</h2>
                        <p className="text-gray-500 dark:text-gray-400">Sign up to start your learning journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-400" : "bg-gray-50 border-gray-300 focus:ring-indigo-500"}`}
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyRound className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${theme === "dark" ? "bg-gray-700 text-white border-gray-600 focus:ring-indigo-400" : "bg-gray-50 border-gray-300 focus:ring-indigo-500"}`}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <UserPlus className="w-5 h-5" />
                            <span>Create Account</span>
                        </button>
                    </form>

                    <div className="text-center text-sm">
                        <p className="text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <a href="/signin" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Sign in
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Signup;
