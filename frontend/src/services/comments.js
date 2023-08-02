const BASE_URL = `/`;
export async function createComment(postId, comment) {
  try {
    const res = await fetch(`${BASE_URL}api/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const res = await fetch(`${BASE_URL}api/comments/answer/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    const res = await fetch(`${BASE_URL}api/comments/answer/${commentId}`, {
      method: "PATCH",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteComment(commentId) {
  try {
    const res = await fetch(`${BASE_URL}api/comments/comment/${commentId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
