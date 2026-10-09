import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
});

// Nagbibigay ng malinaw na error message galing sa server o sa network
export const getErrorMessage = (
  error,
  fallback = 'Something went wrong. Please try again.'
) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.request) {
    return 'Cannot connect to the server. Please make sure it is running.';
  }
  return fallback;
};

export default api;