import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { User, KeyRound, LogIn, Home, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const Signin = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard"); // Redirect if already authenticated
        }
    }, [navigate]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://alfredtask-ydv9.onrender.com/api/users/signin", form);
            login(res.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("Signin failed");
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className={`py-4 px-6 flex justify-between items-center shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
                <h1 className="text-2xl font-bold text-indigo-600">FlashMaster</h1>
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all">
                        {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
                    </button>
                    {/* Home Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        <span>Go to Home</span>
                    </button>
                </div>
            </nav>

            {/* Signin Form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`min-h-screen flex items-center justify-center p-4 transition-all ${
                    theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"
                }`}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className={`w-full max-w-md rounded-2xl shadow-xl p-8 space-y-8 ${
                        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                    }`}
                >
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }} className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-gray-700 mb-4">
                            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold">Welcome back</h2>
                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Sign in to your account to continue</p>
                    </motion.div>

                    <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }} onSubmit={handleSubmit} className="space-y-6">
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
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg transition-all duration-200 ${
                                        theme === "dark"
                                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
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
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg transition-all duration-200 ${
                                        theme === "dark"
                                            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                                            : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <LogIn className="w-5 h-5" />
                            <span>Sign In</span>
                        </motion.button>
                    </motion.form>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }} className="text-center text-sm">
                        <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                            Don't have an account?{" "}
                            <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up
                            </a>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Signin;
