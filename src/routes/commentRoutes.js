import express from 'express';
import CommentController from '../controllers/commentController.js';

const router = express.Router();
const commentController = new CommentController();

// Route pour ajouter un commentaire
router.post('/:postId/comments', commentController.addComment);

// Route pour récupérer les commentaires d'un post
router.get('/:postId/comments', commentController.getComments);

// Route pour supprimer un commentaire
router.delete('/comments/:commentId', commentController.deleteComment);

export default router;