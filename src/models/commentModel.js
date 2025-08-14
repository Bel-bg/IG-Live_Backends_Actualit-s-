import { supabase } from '../services/supabaseService';

class CommentModel {
  constructor(postId, userId, commentText) {
    this.postId = postId;
    this.userId = userId;
    this.commentText = commentText;
    this.createdAt = new Date();
  }

  async save() {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: this.postId,
          user_id: this.userId,
          text: this.commentText,
          created_at: this.createdAt,
        },
      ]);

    if (error) {
      throw new Error('Error saving comment: ' + error.message);
    }
    return data;
  }

  static async getCommentsByPostId(postId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Error fetching comments: ' + error.message);
    }
    return data;
  }

  static async deleteComment(commentId) {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      throw new Error('Error deleting comment: ' + error.message);
    }
    return data;
  }
}

export default CommentModel;