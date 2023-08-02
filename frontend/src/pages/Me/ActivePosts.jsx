/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useCurrUser } from "../../hooks/useCurrUser";
import styles from "./Me.module.scss";
import Spinner from "../../ui/Spinner/Spinner";
export default function ActivePosts() {
  const { data: me, isLoading } = useCurrUser();
  const finishedPosts = me.posts.filter((p) => p.finished);
  const activePosts = me.posts.filter((p) => !p.finished);

  if (isLoading) return <Spinner />;
  if (activePosts.length === 0)
    return (
      <div>
        <span className={styles.noContent}>Nemate aktivnih oglasa</span>
        {finishedPosts.length > 0 && <FinishedPosts posts={finishedPosts} />}
      </div>
    );
  return (
    <div className={styles.catalogBody}>
      <span>Aktivni oglasi</span>

      <div className="container">
        <div className={styles.postContainer}>
          {me.posts
            .filter((p) => !p.finished)
            .map((item) => (
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
