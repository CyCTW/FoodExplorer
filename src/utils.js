import axios from "axios";

export const createTodo = async (data) => {
  const response = await axios.post("/.netlify/functions/todos-create", data);
  return response;
};
export const updateNewFood = async (data) => {
  /* data format:
    {
      category,
      email,
      originFoodnames,
      foodname {
       name: ,
        lat: ,
        lng: ,
      }
    }
  */
  console.log("data", data);
  const response = await axios.post(
    "/.netlify/functions/updateNewFood",
    JSON.stringify(data)
  );
  return response;
};
export const deleteCategory = async (data) => {
  /* data format:
    {
      category,
      email
    }
  */
  console.log("data", data);
  const response = await axios.post(
    "/.netlify/functions/deleteCategory",
    JSON.stringify(data)
  );
  return response;
};
export const createUser = async (email) => {
  /* data format:
    {
      userId
    }
  */
  const response = await axios.post(
    "/.netlify/functions/createUser",
    JSON.stringify(email)
  );
  return response;
};
export const getUserFoodList = async (email) => {
  /* data format:
    {
      userId
    }
  */
  const response = await axios.post(
    "/.netlify/functions/getUserFoodList",
    JSON.stringify({ email })
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

export const getPlaceDetails = async ({
  mapAPILoaded,
  mapAPI,
  mapInstance,
  placeId,
  category,
  onFinishLoaded
}) => {
  if (mapAPILoaded) {
    console.log("Enter", placeId)
    const service = new mapAPI.places.PlacesService(mapInstance);
    const request = {
      placeId,
      fields: [
        "name",
        "rating", // 評價
        "formatted_address", // 地址
        "formatted_phone_number", // 電話
        "geometry", // 幾何資訊
        "opening_hours", // 營業時間資訊
        "photos",
        "utc_offset_minutes",
      ],
    };
    service.getDetails(request, (results, status) => {
      if (status === mapAPI.places.PlacesServiceStatus.OK){
        onFinishLoaded({results, placeId, category})
      }
    });

  } else {
    console.log("FUckck")
  }
};
