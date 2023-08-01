import styles from "./Me.module.scss";
import Spinner from "../../ui/Spinner/Spinner";
import MeInfo from "./MeInfo";
import ActivePosts from "./ActivePosts";
import { useCurrUser } from "../../hooks/useCurrUser";

export default function Me() {
  const { isLoading } = useCurrUser();
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.pageBody}>
      <div className={`container ${styles.profileContainer}`}>
        <MeInfo />
        <ActivePosts />
      </div>
    </div>
  );
}
