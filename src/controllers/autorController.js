import { autores } from "../models/Autor.js";

class AutorController {
  // Lista todos os autores
  static async listarAutores(req, res) {
    try {
      const listaAutores = await autores.find({});
      if (listaAutores.length === 0) {
        return res.status(200).json({ message: "Nenhum autor encontrado." });
      }
      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao listar autores: ${erro.message}` });
    }
  }

  // Lista autor por ID
  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autores.findById(id);
      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado." });
      }
      res.status(200).json(autorEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao buscar autor: ${erro.message}` });
    }
  }

  // Cadastra um novo autor
  static async cadastrarAutor(req, res) {
    try {
      const { nome, materia } = req.body;

      if (!nome) {
        return res.status(400).json({ message: "O campo 'nome' é obrigatório." });
      }

      const novoAutor = new autores({ nome, materia });
      const autorCriado = await novoAutor.save();

      res.status(201).json({ message: "Autor criado com sucesso!", autor: autorCriado });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao cadastrar autor: ${erro.message}` });
    }
  }

  // Atualiza um autor
  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      const autorAtualizado = await autores.findByIdAndUpdate(id, req.body, { new: true });

      if (!autorAtualizado) {
        return res.status(404).json({ message: "Autor não encontrado para atualização." });
      }

      res.status(200).json({ message: "Autor atualizado com sucesso!", autor: autorAtualizado });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao atualizar autor: ${erro.message}` });
    }
  }

  // Exclui um autor
  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;
      const autorExcluido = await autores.findByIdAndDelete(id);

      if (!autorExcluido) {
        return res.status(404).json({ message: "Autor não encontrado para exclusão." });
      }

      res.status(200).json({ message: "Autor excluído com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao excluir autor: ${erro.message}` });
    }
  }
}

export default AutorController;
