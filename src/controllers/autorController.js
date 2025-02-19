import User from "../models/User.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      // Buscar todos os autores, sem restringir ao role 'professor'
      const listaAutores = await User.find();

      if (listaAutores.length === 0) {
        return res.status(200).json({ message: "Nenhum autor encontrado." });
      }

      res.status(200).json(listaAutores);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao listar autores: ${erro.message}` });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await User.findById(id);

      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado." });
      }

      res.status(200).json(autorEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao buscar autor: ${erro.message}` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const { name, email, password, role, disciplina } = req.body;

      // Verificando se os dados obrigatórios foram passados
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
      }

      // Se o role for 'professor', disciplina é obrigatória
      if (role === "professor" && !disciplina) {
        return res.status(400).json({ message: "Professores devem ter uma disciplina associada." });
      }

      // Criação do autor
      const novoAutor = new User({ name, email, password, role, disciplina: role === "professor" ? disciplina : undefined });
      const autorCriado = await novoAutor.save();

      res.status(201).json({ message: "Autor criado com sucesso!", autor: autorCriado });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao cadastrar autor: ${erro.message}` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      const { name, email, password, disciplina } = req.body;

      // Verificar se o autor existe
      const autorEncontrado = await User.findById(id);

      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado." });
      }

      // Atualizar dados do autor
      const autorAtualizado = await User.findByIdAndUpdate(id, { name, email, password, disciplina }, { new: true });

      if (!autorAtualizado) {
        return res.status(404).json({ message: "Autor não encontrado para atualização." });
      }

      res.status(200).json({ message: "Autor atualizado com sucesso!", autor: autorAtualizado });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao atualizar autor: ${erro.message}` });
    }
  }

  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;

      // Verificar se o autor existe
      const autorEncontrado = await User.findById(id);

      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado." });
      }

      // Excluir autor
      const autorExcluido = await User.findByIdAndDelete(id);

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
