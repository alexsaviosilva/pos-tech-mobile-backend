import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome é obrigatório."],
      trim: true, 
    },
    email: {
      type: String,
      required: [true, "O email é obrigatório."],
      unique: true, 
      lowercase: true, 
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, insira um email válido.",
      ],
    },
    password: {
      type: String,
      required: [true, "A senha é obrigatória."],
      minlength: [6, "A senha deve ter pelo menos 6 caracteres."],
    },
    role: {
      type: String,
      enum: ["admin", "professor", "aluno"], 
      default: "aluno", 
    },
    disciplina: {
      type: String,
      // Não marcar como obrigatório diretamente
      validate: {
        validator: function (value) {
          // Se o role for professor, verifica se disciplina não está vazio
          if (this.role === "professor") {
            return !!value; // Se for professor, disciplina precisa ter valor
          }
          return true; // Se for aluno ou admin, não é necessário
        },
        message: "Professores devem ter uma disciplina associada.",
      },
    },
  },
  { timestamps: true } 
);

// Hashing de senha antes de salvar o usuário
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 

  try {
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); 
    next();
  } catch (error) {
    console.error("Erro ao hashear a senha:", error);
    next(error);
  }
});

// Método para validar senha
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); 
  } catch (error) {
    console.error("Erro ao verificar a senha:", error);
    throw error;
  }
};

// Método para retornar os dados do usuário sem a senha
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password; 
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
