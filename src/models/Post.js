import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título é obrigatório."],
      trim: true,
      minlength: [3, "O título deve ter no mínimo 3 caracteres."],
      maxlength: [100, "O título deve ter no máximo 100 caracteres."],
    },
    descricao: {
      type: String,
      required: [true, "A descrição é obrigatória."],
      trim: true,
      minlength: [10, "A descrição deve ter no mínimo 10 caracteres."],
      maxlength: [1000, "A descrição deve ter no máximo 1000 caracteres."],
    },
    categoria: {
      type: String,
      enum: ["Matemática", "História", "Ciências", "Português", "Geografia"],
      required: [true, "A categoria é obrigatória."],
    },
    data: {
      type: Date,
      default: Date.now, // Define a data atual como padrão
    },
    imagem: {
      type: String,
      default: "placeholder.png", // Nome do arquivo padrão caso nenhuma imagem seja fornecida
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores", // Referência ao modelo de autores
      required: [true, "O autor é obrigatório."],
    },
  },
  {
    versionKey: false, 
    timestamps: true, 
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
