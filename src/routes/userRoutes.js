import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();

// Route pour l'inscription d'un utilisateur
router.post('/register', userController.register);

// Route pour la connexion d'un utilisateur
router.post('/login', userController.login);

// Route pour récupérer le profil d'un utilisateur
router.get('/profile/:id', userController.getProfile);

// Route pour mettre à jour le profil d'un utilisateur
router.put('/profile/:id', userController.updateProfile);

// Route pour supprimer un utilisateur
router.delete('/profile/:id', userController.deleteProfile);

export default router;