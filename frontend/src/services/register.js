const BASE_URL = `/`;

export async function registerUser(formData) {
  formData.phoneNumber === ""
    ? (formData.phoneNumber = undefined)
    : formData.phoneNumber;

  try {
    const res = await fetch(`${BASE_URL}api/auth/user/register`, {
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

export async function registerAgency(formData) {
  formData.phoneNumber === ""
    ? (formData.phoneNumber = undefined)
    : formData.phoneNumber;
  try {
    const res = await fetch(`${BASE_URL}api/auth/agency/register`, {
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
