const BASE_URL = `/`;
export async function getProfileData(profileId) {
  try {
    const res = await fetch(`${BASE_URL}api/auth/profile/${profileId}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
