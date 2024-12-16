import post from "../models/Post.js";
import { autores } from "../models/Autor.js";

class PostController {
  // Listar todas as publicações com os dados do autor
  static async listarPost(req, res) {
    try {
      const listaPost = await post
        .find({})
        .populate("autor", "nome materia") // Traz apenas os campos nome e materia do autor
        .exec();

      if (listaPost.length === 0) {
        return res.status(200).json({ message: "Nenhum post encontrado." });
      }

      res.status(200).json(listaPost);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao listar posts: ${erro.message}` });
    }
  }

  // Listar postagens por título (query parameter)
  static async listarPostPorTitulo(req, res) {
    const { titulo } = req.query;

    try {
      const posts = await post
        .find({ titulo })
        .populate("autor", "nome materia")
        .exec();

      if (posts.length === 0) {
        return res.status(404).json({ message: "Nenhum post encontrado com este título." });
      }

      res.status(200).json(posts);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao buscar post por título: ${erro.message}` });
    }
  }

  // Buscar postagem por ID
  static async listarPostPorId(req, res) {
    const { id } = req.params;

    try {
      const postEncontrado = await post
        .findById(id)
        .populate("autor", "nome materia")
        .exec();

      if (!postEncontrado) {
        return res.status(404).json({ message: "Post não encontrado." });
      }

      res.status(200).json(postEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `Erro ao buscar post por ID: ${erro.message}` });
    }
  }

  // Cadastrar um novo post com autor
  static async cadastrarPost(req, res) {
    const { titulo, descricao, autor } = req.body;

    try {
      // Validação do autor
      const autorEncontrado = await autores.findById(autor);

      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado. Verifique o ID fornecido." });
      }

      const novoPost = new post({
        titulo,
        descricao,
        autor: autorEncontrado._id,
        data: new Date(), // Data de criação automática
      });

      const postCriado = await novoPost.save();

      res.status(201).json({
        message: "Post criado com sucesso!",
        post: postCriado,
      });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao cadastrar post: ${erro.message}` });
    }
  }

  // Atualizar uma publicação pelo ID
  static async atualizarPost(req, res) {
    const { id } = req.params;
    const { titulo, descricao, autor } = req.body;

    try {
      // Valida se o autor é válido caso seja enviado
      if (autor) {
        const autorEncontrado = await autores.findById(autor);

        if (!autorEncontrado) {
          return res.status(404).json({ message: "Autor não encontrado. Verifique o ID fornecido." });
        }
      }

      const postAtualizado = await post.findByIdAndUpdate(
        id,
        { titulo, descricao, autor },
        { new: true, runValidators: true }
      );

      if (!postAtualizado) {
        return res.status(404).json({ message: "Post não encontrado para atualização." });
      }

      res.status(200).json({
        message: "Post atualizado com sucesso!",
        post: postAtualizado,
      });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao atualizar post: ${erro.message}` });
    }
  }

  // Excluir uma publicação pelo ID
  static async excluirPost(req, res) {
    const { id } = req.params;

    try {
      const postExcluido = await post.findByIdAndDelete(id);

      if (!postExcluido) {
        return res.status(404).json({ message: "Post não encontrado para exclusão." });
      }

      res.status(200).json({ message: "Post excluído com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `Erro ao excluir post: ${erro.message}` });
    }
  }
}

export default PostController;
