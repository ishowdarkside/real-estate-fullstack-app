/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../context/profileContext";
import styles from "./SpecificProfile.module.scss";

export default function ActivePostPanel() {
  const { activeProfile } = useProfileContext();
  if (!activeProfile) return null;
  const activePosts = activeProfile.posts.filter((p) => !p.finished);
  const finishedPosts = activeProfile.posts.filter((p) => p.finished);
  if (activePosts.length === 0)
    return (
      <>
        <span className={styles.noContent}>Korisnik nema aktivnih oglasa</span>
        <FinishedPosts posts={finishedPosts} />
      </>
    );
  return (
    <div className={styles.catalogBody}>
      <span>Aktivni oglasi</span>
      <div className="container">
        <div className={styles.postContainer}>
          {activePosts.map((item) => (
            <CatalogItem item={item} key={item._id} />
          ))}
        </div>
      </div>
      <FinishedPosts posts={finishedPosts} />
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
      <img src={`/${item.imgs[0]}`} />
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

function FinishedPosts({ posts }) {
  if (posts.length === 0) return null;
  return (
    <div className={styles.finishedPanel}>
      <span className={styles.finishedTitle}>Završeni oglasi</span>
      <div className={styles.finishedPostsWrapper}>
        {posts.map((p) => (
          <CatalogItem item={p} key={p._id} />
        ))}
      </div>
    </div>
  );
}
