const BASE_URL = `/`;

export async function getAllPosts() {
  try {
    const res = await fetch(`${BASE_URL}api/posts/all`);
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err);
  }
}
