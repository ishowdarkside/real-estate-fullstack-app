import { useCurrUser } from "../../hooks/useCurrUser";
import { useGetProfileData } from "../../hooks/useGetProfileData";
import {
  useRateProfileNegative,
  useRateProfilePositive,
} from "../../hooks/useRateProfile";
import styles from "./RatePanel.module.scss";
export default function RatePanel() {
  const { data: user } = useCurrUser();
  const { data: activeProfile } = useGetProfileData();
  const { mutate: rateNegative } = useRateProfileNegative();
  const { mutate: ratePositive } = useRateProfilePositive();
  if (!user) return null;
  const { validProfile } = activeProfile;
  const myReview = validProfile.reviews.find((el) => el.reviewer == user._id);

  return (
    <div className={styles.ratePanel}>
      <span>Ocjenite profil</span>
      <div>
        <button
          onClick={() => ratePositive(activeProfile.validProfile._id)}
          className={
            myReview && myReview.reviewType === "positive" ? "positive" : ""
          }
        >
          <img src="/like.svg" />
        </button>
        <button
          onClick={() => rateNegative(activeProfile.validProfile._id)}
          className={
            myReview && myReview.reviewType === "negative" ? "negative" : ""
          }
        >
          <img src="/dislike.svg" />
        </button>
      </div>
    </div>
  );
}
