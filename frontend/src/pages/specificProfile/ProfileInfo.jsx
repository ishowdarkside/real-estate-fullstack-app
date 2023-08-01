import { useProfileContext } from "../../context/profileContext";
import ReviewPanel from "./ReviewPanel";
import styles from "./SpecificProfile.module.scss";

export default function ProfileInfo() {
  const { activeProfile } = useProfileContext();
  if (!activeProfile) return null;

  return (
    <div className={styles.profileInfo}>
      <span>{activeProfile.role === "User" ? "KORISNIK" : "AGENCIJA"}</span>

      <div className={styles.infoReviewWraper}>
        <div className={styles.indentatiton}>
          <span className={styles.name}>
            {activeProfile.agencyName || activeProfile.fullName}
          </span>
          {activeProfile.contactPerson && (
            <span>Kontakt osoba: {activeProfile.contactPerson}</span>
          )}
          <span>{activeProfile.email}</span>
          {activeProfile.phoneNumber && (
            <span>{activeProfile.phoneNumber}</span>
          )}
          {activeProfile.about && <span>{activeProfile.about}</span>}
          {activeProfile.website && <span>{activeProfile.website}</span>}
        </div>
        <ReviewPanel />
      </div>
    </div>
  );
}
