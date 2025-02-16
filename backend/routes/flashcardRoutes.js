const express = require('express');
const { addFlashcard, getFlashcards, updateFlashcard } = require('../controllers/flashcardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/', authMiddleware, addFlashcard);
router.get('/', authMiddleware, getFlashcards);
router.put('/:id', authMiddleware, updateFlashcard);

module.exports = router;
