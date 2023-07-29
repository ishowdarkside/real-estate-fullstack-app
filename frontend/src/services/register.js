const BASE_URL = `http://127.0.0.1:8000/api`;

export async function registerUser(formData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
