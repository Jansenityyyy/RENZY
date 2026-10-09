import api from './api';

// Get Statistics
export const getStatistics = async () => {
  const response = await api.get('/statistics');
  return response.data.statistics;
};