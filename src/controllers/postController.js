import post from "../models/Post.js";
import { autores } from "../models/Autor.js";

class PostController {
  // Listar todas as publicações com dados do autor
  static async listarPost(req, res) {
    try {
      const listaPost = await post
        .find({})
        .populate("autor", "nome materia") // Pega apenas os campos 'nome' e 'materia' do autor
        .exec();

      if (listaPost.length === 0) {
        return res.status(200).json({ message: "Nenhuma publicação encontrada." });
      }

      res.status(200).json(listaPost);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao listar publicações: ${erro.message}` });
    }
  }

  // Buscar uma publicação por ID
  static async listarPostPorId(req, res) {
    const { id } = req.params;

    try {
      const postEncontrado = await post
        .findById(id)
        .populate("autor", "nome materia")
        .exec();

      if (!postEncontrado) {
        return res.status(404).json({ message: "Publicação não encontrada." });
      }

      res.status(200).json(postEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao buscar publicação por ID: ${erro.message}` });
    }
  }

  // Cadastrar uma nova publicação
  static async cadastrarPost(req, res) {
    const { titulo, descricao, categoria, autor } = req.body;

    try {
      // Validação do autor
      const autorEncontrado = await autores.findById(autor);
      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado. Verifique o ID fornecido." });
      }

      // Validação do campo categoria
      if (!categoria) {
        return res.status(400).json({ message: "O campo 'categoria' é obrigatório." });
      }

      // Criação da publicação
      const novaPublicacao = new post({
        titulo,
        descricao,
        categoria, // Inclui a categoria como obrigatória
        autor: autorEncontrado._id,
        data: new Date(),
      });

      const postCriado = await novaPublicacao.save();

      res.status(201).json({
        message: "Publicação criada com sucesso!",
        post: postCriado,
      });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao cadastrar publicação: ${erro.message}` });
    }
  }

  // Atualizar uma publicação existente
  static async atualizarPost(req, res) {
    const { id } = req.params;
    const { titulo, descricao, categoria, autor } = req.body;

    try {
      // Validação opcional do autor, caso seja enviado
      if (autor) {
        const autorEncontrado = await autores.findById(autor);
        if (!autorEncontrado) {
          return res.status(404).json({ message: "Autor não encontrado. Verifique o ID fornecido." });
        }
      }

      // Validação opcional do campo categoria
      if (!categoria) {
        return res.status(400).json({ message: "O campo 'categoria' é obrigatório." });
      }

      // Atualização do post
      const postAtualizado = await post.findByIdAndUpdate(
        id,
        { titulo, descricao, categoria, autor },
        { new: true, runValidators: true }
      );

      if (!postAtualizado) {
        return res.status(404).json({ message: "Publicação não encontrada para atualização." });
      }

      res.status(200).json({
        message: "Publicação atualizada com sucesso!",
        post: postAtualizado,
      });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao atualizar publicação: ${erro.message}` });
    }
  }

  // Excluir uma publicação por ID
  static async excluirPost(req, res) {
    const { id } = req.params;

    try {
      const postExcluido = await post.findByIdAndDelete(id);

      if (!postExcluido) {
        return res.status(404).json({ message: "Publicação não encontrada para exclusão." });
      }

      res.status(200).json({ message: "Publicação excluída com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao excluir publicação: ${erro.message}` });
    }
  }
}

export default PostController;
