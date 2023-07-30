const BASE_URL = `http://127.0.0.1:8000/api`;
import axios from "axios";
export async function createPost(formData) {
  try {
    const res = await axios({
      url: `${BASE_URL}/posts/createPost`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      data: formData,
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
