import { supabase } from '../services/supabaseService';

class UserModel {
  constructor(id, username, avatar, createdAt, expiresAt) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
  }

  static async createUser(username, avatar) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username,
          avatar,
          created_at: new Date(),
          expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks expiration
        },
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return new UserModel(data[0].id, username, avatar, data[0].created_at, data[0].expires_at);
  }

  static async getUserById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new UserModel(data.id, data.username, data.avatar, data.created_at, data.expires_at);
  }

  static async updateUser(id, username, avatar) {
    const { data, error } = await supabase
      .from('users')
      .update({ username, avatar })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return new UserModel(data[0].id, username, avatar, data[0].created_at, data[0].expires_at);
  }

  static async deleteUser(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }
}

export default UserModel;