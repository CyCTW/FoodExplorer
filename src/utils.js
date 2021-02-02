import axios from "axios";

export const createTodo = async (data) => {
  const response = await axios.post('/.netlify/functions/todos-create', data);
  return response;
};

export const readAll = async () => {
  const response = await axios.get('/.netlify/functions/todos-read-all');
  return response;
}
