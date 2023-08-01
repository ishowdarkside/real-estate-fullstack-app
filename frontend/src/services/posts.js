const BASE_URL = `http://127.0.0.1:8000/api`;
export async function getPosts() {
  const queryString = window.location.search;
  queryString.replace("sve", "");
  try {
    const res = await fetch(`${BASE_URL}/posts${queryString}`);
    const data = res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getSinglePost(postId) {
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deletePost(postId) {
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function finishPost(postId) {
  try {
    const res = await fetch(`${BASE_URL}/posts/post/finish/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
