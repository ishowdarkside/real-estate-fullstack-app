const BASE_URL = `http://127.0.0.1:8000/api`;
export async function protect() {
  const jwt = document.cookie;

  if (!jwt) return null;
  const token = jwt.split("=")[1];

  try {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data.user;
  } catch (err) {
    throw new Error(err);
  }
}
