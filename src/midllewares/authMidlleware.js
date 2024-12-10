const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        req.userRole = user.role; // Papel do usuário
        req.userName = user.name; // Nome do usuário
        req.userDisciplina = user.disciplina; // Disciplina do professor (se aplicável)
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };
