/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../context/profileContext";
import styles from "./SpecificProfile.module.scss";

export default function ActivePostPanel() {
  const { activeProfile } = useProfileContext();
  if (!activeProfile) return null;
  if (activeProfile.posts.length === 0)
    return (
      <span className={styles.noContent}>Korisnik nema aktivnih oglasa</span>
    );
  return (
    <div className={styles.catalogBody}>
      <span>Aktivni oglasi</span>
      <div className="container">
        <div className={styles.postContainer}>
          {activeProfile.posts.map((item) => (
            <CatalogItem item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CatalogItem({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.catalogItem}
      onClick={() => navigate(`/app/post/${item._id}`)}
    >
      <img src={`http://127.0.0.1:8000/${item.imgs[0]}`} />
      <div className={styles.postInfo}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.price}>
          {item.price.toLocaleString("en-US")} KM
        </span>
        <div className={styles.postLocation}>
          <img src="/pin.svg" />
          <span>{item.location[0].toUpperCase() + item.location.slice(1)}</span>
        </div>
      </div>
    </div>
  );
}
