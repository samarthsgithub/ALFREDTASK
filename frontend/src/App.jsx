import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Signup from "./Signup";
import Signin from "./Signin";
import FlashcardApp from "./FlashcardList";
import LandingPage from "./Landing";

function App() {
  // Sample flashcard data
  const flashcards = [
    { id: 1, question: "What is React?", answer: "A JavaScript library for building UI" },
    { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript" },
    { id: 3, question: "What is useState?", answer: "A React Hook for managing state" },
  ];

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<FlashcardApp/>}/>
          <Route path="/" element={<LandingPage/>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

