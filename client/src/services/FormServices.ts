import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

export const getQuiz = (category: string, difficulty: string) => {
  return axios.get('/api/questions?category=' + category + '&difficulty=' + difficulty)
}

export const getCategories = () => {
  return axios.get('/api/categories')
}

export const submitQuiz = (submission: any) => {
  let newObject = { name: 'Jimmie Swaggthorne', email: 'jimmieswaggthorne@gmail.com', submission }
  return axios.post('/api/submit', newObject)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Error submitting quiz');
    });
}