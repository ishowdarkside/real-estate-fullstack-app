const BASE_URL = `http://127.0.0.1:8000/api`;

export async function rateProfilePositive(profileId) {
  try {
    const res = await fetch(`${BASE_URL}/auth/rate/${profileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify({
        reviewType: "positive",
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function rateProfileNegative(profileId) {
  try {
    const res = await fetch(`${BASE_URL}/auth/rate/${profileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify({
        reviewType: "negative",
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
