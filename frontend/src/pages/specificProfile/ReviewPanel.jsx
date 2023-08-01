import { useProfileContext } from "../../context/profileContext";
import styles from "./SpecificProfile.module.scss";

export default function ReviewPanel() {
  const { activeProfile } = useProfileContext();
  const positiveReviews = activeProfile.reviews.filter(
    (r) => r.reviewType === "positive"
  );
  const negativeReviews = activeProfile.reviews.filter(
    (r) => r.reviewType === "negative"
  );

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
        <span>{activeProfile.posts.length} AKTIVNIH OGLASA</span>
      </div>
    </div>
  );
}
