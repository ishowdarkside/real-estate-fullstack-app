const BASE_URL = `http://127.0.0.1:8000/api`;

export async function getAllPosts() {
  try {
    const res = await fetch(`${BASE_URL}/posts/all`);
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
}
