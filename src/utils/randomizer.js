import { random } from 'lodash';

export const getRandomPosts = (posts, count) => {
  if (!Array.isArray(posts) || posts.length === 0) {
    return [];
  }

  const shuffledPosts = posts.sort(() => 0.5 - Math.random());
  return shuffledPosts.slice(0, count);
};