const BASE_URL = `http://127.0.0.1:8000/api`;
export async function getPosts() {
  try {
    const res = await fetch(`${BASE_URL}/posts`);
    const data = res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
