const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definição do esquema de usuário
const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // ID único gerado automaticamente
    name: { type: String, required: true }, // Nome do usuário
    email: { type: String, required: true, unique: true }, // Email do usuário
    password: { type: String, required: true }, // Senha do usuário
    role: { type: String, enum: ['admin', 'professor', 'aluno'], default: 'aluno' }, // Papel do usuário
    disciplina: { type: String, required: function () { return this.role === 'professor'; } }, // Disciplina (apenas para professores)
});

// Hash da senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Método para verificar a senha
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
