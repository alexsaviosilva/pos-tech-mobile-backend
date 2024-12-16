import mongoose from "mongoose";

// Definição do esquema para Autor
const autorSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O campo 'nome' é obrigatório."],
      trim: true, // Remove espaços extras
    },
    materia: {
      type: String,
      trim: true,
      default: "Não especificada", // Valor padrão caso não seja informado
    },
  },
  {
    timestamps: true, // Adiciona automaticamente 'createdAt' e 'updatedAt'
    versionKey: false, // Remove o campo '__v'
  }
);

// Criação do modelo 'autores' com base no esquema
const autores = mongoose.model("autores", autorSchema);

export { autores, autorSchema };
