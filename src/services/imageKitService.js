import axios from 'axios';

const IMAGEKIT_URL = process.env.IMAGEKIT_URL; // URL de l'API ImageKit
const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY; // Clé publique ImageKit
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY; // Clé privée ImageKit

// Fonction pour télécharger une image sur ImageKit
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('publicKey', IMAGEKIT_PUBLIC_KEY);

    const response = await axios.post(`${IMAGEKIT_URL}/v1/files/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Retourne les données de la réponse, y compris l'URL de l'image
  } catch (error) {
    throw new Error('Erreur lors du téléchargement de l\'image: ' + error.message);
  }
};

// Fonction pour récupérer l'URL d'une image à partir de son ID
export const getImageUrl = (imageId) => {
  return `${IMAGEKIT_URL}/d/${imageId}`; // Retourne l'URL de l'image
};