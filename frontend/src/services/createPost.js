const BASE_URL = `/`;
import axios from "axios";
export async function createPost(formData) {
  try {
    const res = await axios({
      url: `${BASE_URL}api/posts/createPost`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}
