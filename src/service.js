import axios from 'axios';

const apiUrl = 'http://localhost:5053'; // שנה לכתובת ה-API שלך
axios.defaults.baseURL = apiUrl;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

const service = {
  getTasks: async () => {
    const result = await axios.get(`/items`)
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name)
    const result = await axios.post(`/items`, { name })
    return result.data;
  },
  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    const tasks = await service.getTasks();
    const existingTask = tasks.find(task => task.id === id);
    const updatedTask = { ...existingTask, isComplete: isComplete };
    const result = await axios.put(`/items/${id}`, updatedTask);
    return result.data;
  },
  deleteTask: async (id) => {
    console.log('deleteTask')
    const result = await axios.delete(`/items/${id}`); // הוספת ה-ID לכתובת ה-API
    return result.data
  }
};
export default service;
