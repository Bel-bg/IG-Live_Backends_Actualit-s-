import express from 'express';
import PostController from '../controllers/postController.js';

const router = express.Router();
const postController = new PostController();

// Route to create a new post
router.post('/', postController.createPost);

// Route to get all posts with pagination
router.get('/', postController.getPosts);

// Route to get a single post by ID
router.get('/:id', postController.getPostById);

// Route to update a post by ID
router.put('/:id', postController.updatePost);

// Route to delete a post by ID
router.delete('/:id', postController.deletePost);

// Route to like a post
router.post('/:id/like', postController.likePost);

// Route to add a comment to a post
router.post('/:id/comments', postController.addComment);

// Route to get comments for a post
router.get('/:id/comments', postController.getComments);

export default router;