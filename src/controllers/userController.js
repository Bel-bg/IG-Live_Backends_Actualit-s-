import UserModel from '../models/userModel';
import { supabase } from '../services/supabaseService';

class UserController {
  async register(req, res) {
    const { username, password, avatar } = req.body;

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ username, password, avatar }]);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json({ user: data });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      return res.status(200).json({ user: data });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getProfile(req, res) {
    const userId = req.params.id;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ user: data });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateProfile(req, res) {
    const userId = req.params.id;
    const { username, avatar } = req.body;

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ username, avatar })
        .eq('id', userId);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ user: data });
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();