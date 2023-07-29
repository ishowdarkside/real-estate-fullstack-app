/* eslint-disable react/prop-types */
import { HiArrowLeft } from "react-icons/hi";
import styles from "./ReturnButton.module.scss";
export default function ReturnButton({ cb }) {
  return (
    <button onClick={cb} className={styles.returnBtn}>
      <HiArrowLeft />
    </button>
  );
}
