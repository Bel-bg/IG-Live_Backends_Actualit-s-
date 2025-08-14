import { supabase } from '../services/supabaseService';

class PostModel {
  constructor() {
    this.tableName = 'posts';
  }

  async createPost({ username, avatar, content, image }) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([
        {
          username,
          avatar,
          content,
          image,
          created_at: new Date(),
          expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks expiration
        },
      ]);

    if (error) throw new Error(error.message);
    return data;
  }

  async getPosts(limit = 10, offset = 0) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return data;
  }

  async getPostById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updatePost(id, updates) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }

  async deletePost(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }

  async likePost(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update({ likes: supabase.raw('likes + 1') })
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }

  async addComment(postId, comment) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, ...comment }]);

    if (error) throw new Error(error.message);
    return data;
  }

  async getComments(postId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId);

    if (error) throw new Error(error.message);
    return data;
  }
}

export default new PostModel();