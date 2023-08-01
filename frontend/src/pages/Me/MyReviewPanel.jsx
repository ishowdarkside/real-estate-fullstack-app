import { useCurrUser } from "../../hooks/useCurrUser";
import styles from "./Me.module.scss";

export default function MyReviewPanel() {
  const { data: me } = useCurrUser();
  const positiveReviews = me.reviews.filter((r) => r.reviewType === "positive");
  const negativeReviews = me.reviews.filter((r) => r.reviewType === "negative");
  const finishedPosts = me.posts.filter((p) => p.finished);
  const activePosts = me.posts.filter((p) => !p.finished);
  return (
    <div className={styles.reviewsWrapper}>
      <div>
        <img src="/like.svg" />
        <span>{positiveReviews.length} POZITIVNIH OCJENA</span>
      </div>

      <div>
        <img src="/dislike.svg" />
        <span>{negativeReviews.length} NEGATIVNIH OCJENA</span>
      </div>

      <div>
        <img src="/oglas.svg" />
        <span>{activePosts.length} AKTIVNIH OGLASA</span>
      </div>

      <div>
        <img src="/trophy.svg" />
        <span>{finishedPosts.length} USPJEŠNIH PRODAJA</span>
      </div>
    </div>
  );
}
