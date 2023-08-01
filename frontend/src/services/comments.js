const BASE_URL = `http://127.0.0.1:8000/api`;
export async function createComment(postId, comment) {
  try {
    console.log(postId, comment);
    const res = await fetch(`${BASE_URL}/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify({
        comment,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function answerComment(commentId, answer) {
  try {
    const res = await fetch(`${BASE_URL}/comments/answer/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify({
        answer,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteAnswer(commentId) {
  try {
    const res = await fetch(`${BASE_URL}/comments/answer/${commentId}`, {
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
