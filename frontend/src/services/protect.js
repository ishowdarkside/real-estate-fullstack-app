const BASE_URL = `/`;
export async function protect() {
  const jwt = document.cookie;

  if (!jwt) return null;

  try {
    const res = await fetch(`${BASE_URL}api/auth/verify`);
    const data = await res.json();

    return data.user;
  } catch (err) {
    throw new Error(err);
  }
}
