/* eslint-disable react/prop-types */
import { formatDate } from "../../services/formatDate";
import { useAnswerComment } from "../../hooks/useComments";
import styles from "./Comments.module.scss";
import Spinner from "../../ui/Spinner/Spinner";
import { useState } from "react";
export default function Comment({ com, user, post }) {
  const { mutate: answer, isLoading: isAnswering } = useAnswerComment();
  const [answerInput, setAnswerInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!answerInput) return;
    answer({ commentId: com._id, answer: answerInput });
  }
  if (isAnswering) return <Spinner />;
  return (
    <div>
      <div>
        <div className={styles.questionUser}>
          <span>{com.creator.fullName || com.creator.agencyName}</span>
          <span>{formatDate(com.createdAt)}</span>
        </div>

        <div>
          <p className={styles.question}>{com.comment}</p>
          {com.answer && (
            <div className={styles.answerWrapper}>
              <span>{post.creator.fullName || post.creator.agencyName}</span>
              <p className={styles.answer}>{com.answer}</p>
            </div>
          )}

          {/*AKO USER POSTOJI I AKO JE KREATOR POSTA CURR ULOGOVANI USER I AKO KOMENTAR NEMA ODGOVOR, PRIKAZI FORMU */}
          {user && post.creator._id === user._id && !com.answer && (
            <form
              className={styles.answerForm}
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                type="text"
                placeholder="Odgovorite na pitanje"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
              />
              <button>Postavi odgovor</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
