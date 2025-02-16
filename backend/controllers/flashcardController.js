const Flashcard = require('../models/Flashcard');

exports.addFlashcard = async (req, res) => {
    const { question, answer } = req.body;

    try {
        const flashcard = await Flashcard.create({
            userId: req.user.userId,
            question,
            answer,
            box: 1, // Starts in the first box
            nextReviewDate: new Date() // Available for immediate review
        });

        res.status(201).json(flashcard);
    } catch (error) {
        console.error("Error adding flashcard:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getFlashcards = async (req, res) => {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const flashcards = await Flashcard.find({
            userId: req.user.userId,
            nextReviewDate: { $lte: new Date() } // Only fetch due flashcards
        });

        res.json(flashcards);
    } catch (error) {
        console.error("Error fetching flashcards:", error);
        res.status(500).json({ message: "Server error" });
    }
};



exports.updateFlashcard = async (req, res) => {
    const { id } = req.params;
    const { correct } = req.body;

    try {
        const flashcard = await Flashcard.findById(id);
        if (!flashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        if (flashcard.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Leitner Box intervals in days
        const intervals = [1, 2, 5, 10, 30];

        // Update box number based on correct/incorrect answer
        flashcard.box = correct ? Math.min(flashcard.box + 1, 5) : 1;

        // Update next review date based on new box level
        flashcard.nextReviewDate = new Date();
        flashcard.nextReviewDate.setDate(flashcard.nextReviewDate.getDate() + intervals[flashcard.box - 1]);

        // Save updated flashcard
        await flashcard.save();
        res.json(flashcard);
    } catch (error) {
        console.error("Error updating flashcard:", error);
        res.status(500).json({ message: "Server error" });
    }
};

