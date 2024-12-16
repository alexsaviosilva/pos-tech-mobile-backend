import post from "../models/Post.js";
import { autores } from "../models/Autor.js";

class PostController {
  static async listarPost(req, res) {
    try {
      const listaPost = await post
        .find({})
        .populate("autor", "nome materia") 
        .exec();

      if (listaPost.length === 0) {
        return res.status(200).json({ message: "Nenhuma publicação encontrada." });
      }

      res.status(200).json(listaPost);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao listar publicações: ${erro.message}` });
    }
  }

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

  static async cadastrarPost(req, res) {
    const { titulo, descricao, categoria, autor } = req.body;

    try {
      const autorEncontrado = await autores.findById(autor);
      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado. Verifique o ID fornecido." });
      }

      if (!categoria) {
        return res.status(400).json({ message: "O campo 'categoria' é obrigatório." });
      }

      const novaPublicacao = new post({
        titulo,
        descricao,
        categoria, 
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

  static async atualizarPost(req, res) {
    const { id } = req.params;
    const { titulo, descricao, categoria, autor } = req.body;

    try {
      if (autor) {
        const autorEncontrado = await autores.findById(autor);
        if (!autorEncontrado) {
          return res.status(404).json({ message: "Autor não encontrado. Verifique o ID fornecido." });
        }
      }

      if (!categoria) {
        return res.status(400).json({ message: "O campo 'categoria' é obrigatório." });
      }

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
