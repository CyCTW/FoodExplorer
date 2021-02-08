import axios from "axios";

export const createTodo = async (data) => {
  const response = await axios.post("/.netlify/functions/todos-create", data);
  return response;
};
export const updateNewFood = async (data) => {
  /* data format:
    {
      category,
      userId,
      foodname
    }
  */
  const response = await axios.post(
    "/.netlify/functions/updateNewFood",
    JSON.stringify({category: data, userId: data, foodname: data})
  );
  return response;
};
export const createUser = async (userId) => {
  /* data format:
    {
      userId
    }
  */
  const response = await axios.post(
    "/.netlify/functions/createUser",
    JSON.stringify(userId)
  );
  return response;
};
export const getUserFoodList = async (userId) => {
  /* data format:
    {
      userId
    }
  */
  const response = await axios.post(
    "/.netlify/functions/getUserFoodList",
    JSON.stringify({ userId })
  );
  return response;
};

// export const readAll = async () => {
//   const response = await axios.get("/.netlify/functions/todos-read-all");
//   return response;
// };

export const decodeToken = ({ onFindToken }) => {
  const st = window.location.href;
  const targetURL = "#confirmation_token=";
  const pos = st.search(targetURL);
  if (pos !== -1) {
    console.log("Find confirm token!");
    const token = st.slice(pos + targetURL.length);
    onFindToken({ token });
  }
};
