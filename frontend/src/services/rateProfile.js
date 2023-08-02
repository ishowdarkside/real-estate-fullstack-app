const BASE_URL = `/`;

export async function rateProfilePositive(profileId) {
  try {
    const res = await fetch(`${BASE_URL}api/auth/rate/${profileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const res = await fetch(`${BASE_URL}api/auth/rate/${profileId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
