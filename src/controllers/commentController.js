import CommentModel from '../models/commentModel';
import PostModel from '../models/postModel';

class CommentController {
  // Ajouter un commentaire à un post
  async addComment(req, res) {
    const { postId, userId, text } = req.body;

    try {
      const newComment = await CommentModel.create({
        postId,
        userId,
        text,
        createdAt: new Date(),
      });

      // Mettre à jour le nombre de commentaires dans le post
      await PostModel.findByIdAndUpdate(postId, { $inc: { comments: 1 } });

      res.status(201).json({
        success: true,
        message: 'Commentaire ajouté avec succès',
        data: newComment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'ajout du commentaire',
        error: error.message,
      });
    }
  }

  // Récupérer tous les commentaires d'un post
  async getComments(req, res) {
    const { postId } = req.params;

    try {
      const comments = await CommentModel.find({ postId }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des commentaires',
        error: error.message,
      });
    }
  }

  // Supprimer un commentaire
  async deleteComment(req, res) {
    const { commentId } = req.params;

    try {
      const deletedComment = await CommentModel.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return res.status(404).json({
          success: false,
          message: 'Commentaire non trouvé',
        });
      }

      // Mettre à jour le nombre de commentaires dans le post
      await PostModel.findByIdAndUpdate(deletedComment.postId, { $inc: { comments: -1 } });

      res.status(200).json({
        success: true,
        message: 'Commentaire supprimé avec succès',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du commentaire',
        error: error.message,
      });
    }
  }
}

export default new CommentController();