import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Brain, Zap, BarChart } from "lucide-react";
import { Button } from "./Button";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-indigo-100 text-gray-800"}>
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <main className="container mx-auto px-6 py-12 mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4">Master Any Subject with FlashMaster</h2>
          <p className="text-xl mb-8">Harness the power of the Leitner system for efficient learning</p>
          <Button size="lg" className="text-lg px-8 py-4" onClick={() => navigate("/signup")}>
            Get Started <ChevronRight className="ml-2" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Brain, title: "Smart Repetition", description: "Optimize learning with our Leitner system algorithm" },
            { icon: Zap, title: "Quick Learning", description: "Learn faster and retain information longer" },
            { icon: BarChart, title: "Track Progress", description: "Detailed analytics and insights" },
          ].map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
              className={`rounded-lg shadow-lg p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            >
              <feature.icon className={`w-12 h-12 mb-4 ${theme === "dark" ? "text-blue-400" : "text-indigo-600"}`} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
