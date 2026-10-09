import api from './api';

// Get All Articles
export const getArticles = async () => {
  const response = await api.get('/articles');
  return response.data.articles;
};

// Get a Specific Article
export const getArticle = async (id) => {
  const response = await api.get(`/articles/${id}`);
  return response.data.article;
};

// Create an Article
export const createArticle = async (articleData) => {
  const response = await api.post('/articles/create', articleData);
  return response.data.article;
};

// Update an Article
export const updateArticle = async (id, articleData) => {
  const response = await api.patch(`/articles/${id}`, articleData);
  return response.data.article;
};

// Delete an Article
export const deleteArticle = async (id) => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};

// Like an Article
export const likeArticle = async (id) => {
  const response = await api.patch(`/articles/${id}/like`);
  return response.data.article;
};