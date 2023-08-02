const BASE_URL = `/`;
export async function getPosts() {
  const queryString = window.location.search;
  queryString.replace("sve", "");
  try {
    const res = await fetch(`${BASE_URL}api/posts${queryString}`);
    const data = res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getSinglePost(postId) {
  try {
    const res = await fetch(`${BASE_URL}api/posts/${postId}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deletePost(postId) {
  try {
    const res = await fetch(`${BASE_URL}api/posts/${postId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function finishPost(postId) {
  try {
    const res = await fetch(`${BASE_URL}api/posts/post/finish/${postId}`, {
      method: "PATCH",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
