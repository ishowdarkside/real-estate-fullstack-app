import styles from "./SearchPanel.module.scss";
export default function SearchPanel() {
  return (
    <div className={styles.searchPanel}>
      <div className={styles.searchWrapper}>
        <img src="/search.svg" alt="lupa" />
        <input type="search" name="gsearch" placeholder="Traži po naslovu" />
      </div>
    </div>
  );
}
