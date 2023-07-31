import styles from "./Spinner.module.scss";
import { createPortal } from "react-dom";
export default function Spinner() {
  return createPortal(
    <div className={styles.spinner}>
      <div className={styles.spinnerInner}></div>
    </div>,
    document.body
  );
}
