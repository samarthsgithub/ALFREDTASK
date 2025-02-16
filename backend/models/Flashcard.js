const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    box: { type: Number, default: 1 }, // Leitner Box (1 to 5)
    nextReviewDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);
