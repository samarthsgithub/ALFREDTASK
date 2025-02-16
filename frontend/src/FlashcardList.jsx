import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Check, X, RotateCw } from "lucide-react";
import Navbar from "./Navbar";
import "./index.css";

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [boxCounts, setBoxCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  const navigate  = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin"); // Redirect if no token
    } else {
      fetchFlashcards();
    }
  }, [navigate]);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://alfredtask-ydv9.onrender.com/api/flashcards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flashcards");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setFlashcards(data);
        updateBoxCounts(data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addFlashcard = async () => {
    const token = localStorage.getItem("token");
    const newFlashcard = {
      question: prompt("Enter question:"),
      answer: prompt("Enter answer:"),
      box: 1,
    };

    try {
      const response = await fetch("https://alfredtask-ydv9.onrender.com/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFlashcard),
      });

      if (!response.ok) {
        throw new Error("Failed to add flashcard");
      }

      const addedCard = await response.json();
      setFlashcards((prev) => [...prev, addedCard]);
      updateBoxCounts([...flashcards, addedCard]);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const updateBoxCounts = (cards) => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    cards.forEach((card) => {
      counts[card.box] += 1;
    });
    setBoxCounts(counts);
  };

  const handleAnswer = async (isCorrect) => {
    if (!selectedCard) return;

    const newBox = isCorrect ? Math.min(selectedCard.box + 1, 5) : 1;

    try {
      const response = await fetch(`https://alfredtask-ydv9.onrender.com/api/flashcards/${selectedCard._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ box: newBox }),
      });

      if (!response.ok) {
        throw new Error("Failed to update flashcard");
      }

      const updatedCard = { ...selectedCard, box: newBox };
      const updatedFlashcards = flashcards.map((card) =>
        card._id === selectedCard._id ? updatedCard : card
      );

      setFlashcards(updatedFlashcards);
      updateBoxCounts(updatedFlashcards);
      setSelectedCard(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const getBoxColor = (box) => {
    const colors = {
      1: "bg-red-500",
      2: "bg-orange-500",
      3: "bg-yellow-500",
      4: "bg-green-500",
      5: "bg-blue-500"
    };
    return colors[box] || "bg-gray-500";
  };

  return (
    <>
    <Navbar/>
    <div className="flex h-screen bg-gray-50 pt-16 ">
      {/* Sidebar */}
      <div className="w-96 bg-white shadow-lg overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add a FlashCard</h2>
            <button
              onClick={addFlashcard}
              className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <PlusCircle className="w-6 h-6" />
            </button>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-4">
              <RotateCw className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-4">
              {error}
            </div>
          )}

          <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {flashcards.map((card) => (
              <motion.div
                key={card._id}
                onClick={() => {
                  setSelectedCard(card);
                  setFlipped(false);
                }}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCard?._id === card._id
                    ? "bg-blue-50 border-2 border-blue-500"
                    : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-800 font-medium">{card.question}</p>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full text-white ${getBoxColor(card.box)}`}>
                    Box {card.box}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Leitner Boxes */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((box) => (
            <motion.div
              key={box}
              className={`p-4 rounded-lg ${getBoxColor(box)} bg-opacity-90 text-white shadow-lg`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-lg font-bold">Box {box}</div>
              <div className="text-3xl font-bold">{boxCounts[box]}</div>
              <div className="text-sm opacity-75">cards</div>
            </motion.div>
          ))}
        </div>

       {/* Flashcard Display */}
{selectedCard && (
  <motion.div
    key={selectedCard._id}
    className="w-full max-w-2xl aspect-video bg-white rounded-xl shadow-2xl p-8 cursor-pointer flex items-center justify-center text-2xl font-bold text-gray-800"
    onClick={() => setFlipped(!flipped)}
    animate={{ rotateY: flipped ? 180 : 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      animate={{ rotateY: flipped ? 180 : 0 }}
      className="w-full text-center"
    >
      {flipped ? selectedCard.answer : selectedCard.question}
    </motion.div>
  </motion.div>
)}


        {selectedCard && (
          <div className="mt-4 flex gap-4">
            <button onClick={() => handleAnswer(true)} className="px-4 py-2 bg-green-500 text-white rounded">
              <Check className="inline w-5 h-5" /> Correct
            </button>
            <button onClick={() => handleAnswer(false)} className="px-4 py-2 bg-red-500 text-white rounded">
              <X className="inline w-5 h-5" /> Incorrect
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default FlashcardApp;
