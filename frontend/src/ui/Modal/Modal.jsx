import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
export default function Modal({ children }) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.popup}>{children}</div>
    </div>,
    document.body
  );
}
