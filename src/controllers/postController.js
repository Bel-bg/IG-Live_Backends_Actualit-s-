import { supabase } from '../services/supabaseService';
import { uploadImage } from '../services/imageKitService';

class PostController {
  async createPost(req, res) {
    const { username, avatar, content, image } = req.body;

    try {
      // Upload image to ImageKit if provided
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // Insert post data into Supabase
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            username,
            avatar,
            content,
            image: imageUrl,
            created_at: new Date(),
            expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks expiration
          },
        ]);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPosts(req, res) {
    try {
      const { count } = req.query; // Number of posts to return
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(count ? parseInt(count) : 10); // Default to 10 posts

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updatePost(req, res) {
    const { id } = req.params;
    const { content, image } = req.body;

    try {
      // Upload new image if provided
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const { data, error } = await supabase
        .from('posts')
        .update({
          content,
          image: imageUrl,
          updated_at: new Date(),
        })
        .eq('id', id);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deletePost(req, res) {
    const { id } = req.params;

    try {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new PostController();