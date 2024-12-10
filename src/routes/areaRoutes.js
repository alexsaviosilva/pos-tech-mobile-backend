const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Área do professor
router.get('/professor-area', authMiddleware, roleMiddleware(['professor']), (req, res) => {
    res.json({ 
        message: `Bem-vindo, ${req.userName}`, 
        disciplina: req.userDisciplina 
    });
});

// Área do aluno
router.get('/aluno-area', authMiddleware, roleMiddleware(['aluno']), (req, res) => {
    res.json({ message: `Bem-vindo, ${req.userName}` });
});

// Área acessível por todos
router.get('/geral', authMiddleware, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.userName}` });
});

module.exports = router;
