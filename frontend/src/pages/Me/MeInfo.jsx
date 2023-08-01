import { useCurrUser } from "../../hooks/useCurrUser";
import MyReviewPanel from "./MyReviewPanel";
import styles from "./Me.module.scss";

export default function ProfileInfo() {
  const { data: me } = useCurrUser();

  return (
    <div className={styles.profileInfo}>
      <span>MOJ PROFIL</span>
      <div className={styles.infoReviewWraper}>
        <div className={styles.indentatiton}>
          <span className={styles.name}>{me.agencyName || me.fullName}</span>
          {me.contactPerson && <span>Kontakt osoba: {me.contactPerson}</span>}
          <span>{me.email}</span>
          {me.phoneNumber && <span>{me.phoneNumber}</span>}
          {me.about && <span>{me.about}</span>}
          {me.website && <span>{me.website}</span>}
        </div>
        <MyReviewPanel />
      </div>
    </div>
  );
}
