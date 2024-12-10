import jwt from 'jsonwebtoken';
import { User } from "..../models/User.js";


const AuthController = {
    // Registro de usuário
    async register(req, res) {
        const { name, email, password, role, disciplina } = req.body;

        try {
            const userExists = await User.findOne({ email });
            if (userExists) return res.status(400).json({ message: 'Usuário já cadastrado' });

            const user = new User({ name, email, password, role, disciplina });
            await user.save();

            res.status(201).json({ message: 'Usuário registrado com sucesso', user });
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor', error });
        }
    },

    // Login do usuário
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

            const isValid = await user.isValidPassword(password);
            if (!isValid) return res.status(401).json({ message: 'Credenciais inválidas' });

            // Geração do token JWT
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            res.status(200).json({ message: 'Login bem-sucedido', token });
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor', error });
        }
    },
};

export default AuthController;
