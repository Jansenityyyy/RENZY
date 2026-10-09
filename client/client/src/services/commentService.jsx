import api from './api';

// Get All Comments (optional: i-filter sa isang article)
export const getComments = async (articleId) => {
  const response = await api.get('/comments', {
    params: articleId ? { article: articleId } : {},
  });
  return response.data.comments;
};

// Get a Single Comment
export const getComment = async (id) => {
  const response = await api.get(`/comments/${id}`);
  return response.data.comment;
};

// Create a New Comment
export const createComment = async (commentData) => {
  const response = await api.post('/comments/create', commentData);
  return response.data.comment;
};

// Update an Existing Comment
export const updateComment = async (id, commentData) => {
  const response = await api.patch(`/comments/${id}`, commentData);
  return response.data.comment;
};

// Delete an Existing Comment
export const deleteComment = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};