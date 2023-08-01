/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePostComment } from "../../hooks/useComments";
import styles from "./Comments.module.scss";
import Comment from "./Comment";
export default function Comments({ post, user }) {
  const { mutate } = usePostComment();
  const [comment, setComment] = useState("");

  function handlePostComment(e) {
    e.preventDefault();
    if (!comment) return;
    mutate({ postId: post._id, comment });
    setComment("");
  }

  return (
    <div className={styles.commentsPanel}>
      {post.comments.length === 0 && <span>Objava nema javnih pitanja</span>}
      {post.comments.length > 0 && (
        <span className={styles.questionCount}>
          Pitanja: {post.comments.length}
        </span>
      )}

      {/*AKO JE CURRENT USER !== OD KREATORA POSTA, PRIKAZI FORRMU ZA OBJAVLJIVANJE KOMENTARA */}
      {user && post.creator._id !== user._id && (
        <div>
          <form
            className={styles.form}
            onSubmit={(e) => handlePostComment(e)}
            id="formComment"
          >
            <input
              type="text"
              placeholder="Postavi javno pitanje"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button>Objavi</button>
          </form>
        </div>
      )}
      {post.comments.length > 0 && (
        <div className={styles.questionsWrapper}>
          {post.comments.reverse().map((com) => (
            <Comment com={com} key={com._id} user={user} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
