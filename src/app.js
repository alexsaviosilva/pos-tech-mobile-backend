import express from "express";
import cors from "cors"; 
import bodyParser from "body-parser"; 
import conectaBanco from "./config/dbconnect.js"; 
import routes from "./routes/index.js";

const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Endereço do front-end
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

// Middleware para processar requisições com JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Função para iniciar o servidor
async function startServer() {
  try {
    const conexao = await conectaBanco(); // Conecta ao banco de dados

    conexao.on("error", (error_problem) => {
      console.error("Erro de conexão com o banco de dados!", error_problem);
    });

    conexao.once("open", () => {
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    });

    routes(app); // Configura todas as rotas
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

startServer(); // Inicia o servidor

export default app;
