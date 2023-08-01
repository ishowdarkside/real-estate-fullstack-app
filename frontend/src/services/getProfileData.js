const BASE_URL = `http://127.0.0.1:8000/api`;
export async function getProfileData(profileId) {
  try {
    const res = await fetch(`${BASE_URL}/auth/profile/${profileId}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
