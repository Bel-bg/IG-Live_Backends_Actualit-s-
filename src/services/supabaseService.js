import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const createPost = async (postData) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        username: postData.username,
        avatar: postData.avatar,
        content: postData.content,
        image: postData.image,
        created_at: new Date(),
        expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks expiration
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getPosts = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const likePost = async (postId) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ likes: supabase.raw('likes + 1') })
    .eq('id', postId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const addComment = async (commentData) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        post_id: commentData.postId,
        username: commentData.username,
        avatar: commentData.avatar,
        text: commentData.text,
        created_at: new Date(),
      },
    ]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getComments = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};