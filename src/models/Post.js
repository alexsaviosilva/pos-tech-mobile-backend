import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "O título é obrigatório."],
      trim: true, 
    },
    descricao: {
      type: String,
      required: [true, "A descrição é obrigatória."],
      trim: true,
    },
    data: {
      type: Date,
      default: Date.now, 
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Autor",
      required: [true, "O autor é obrigatório."],
    },
  },
  {
    versionKey: false, 
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
