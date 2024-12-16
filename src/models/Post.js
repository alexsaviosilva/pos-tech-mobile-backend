import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título é obrigatório."],
      trim: true, // Remove espaços extras
    },
    descricao: {
      type: String,
      required: [true, "A descrição é obrigatória."],
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, "A categoria é obrigatória."],
      enum: [
        "Matemática",
        "História",
        "Ciências",
        "Português",
        "Geografia",
      ], // Lista de categorias aceitas
      trim: true,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores", // Relaciona com a coleção 'autores'
      required: [true, "O autor é obrigatório."],
    },
    data: {
      type: Date,
      default: Date.now, // Atribui a data atual como padrão
    },
    imagem: {
      type: String,
      default: "placeholder.png", // Nome padrão caso não seja enviada imagem
    },
  },
  {
    timestamps: true, // Cria automaticamente 'createdAt' e 'updatedAt'
    versionKey: false, // Remove o campo '__v' do documento
  }
);

const post = mongoose.model("posts", postSchema);
export default post;
