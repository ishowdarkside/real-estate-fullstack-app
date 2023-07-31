/* eslint-disable react/prop-types */
import { useGetPosts } from "../../hooks/useGetPosts";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./Catalog.module.scss";
import FilterPanel from "./FilterPanel/FilterPanel";
import SearchPanel from "./SearchPanel/SearchPanel";
export default function Catalog() {
  const { data, isLoading } = useGetPosts();

  return (
    <div className={styles.catalogBody}>
      <div className="container">
        <SearchPanel />
        <FilterPanel />

        <div className={styles.postContainer}>
          {isLoading && <Spinner />}
          {!isLoading &&
            data.posts.map((item) => <CatalogItem item={item} key={item.id} />)}
        </div>
      </div>
    </div>
  );
}

function CatalogItem({ item }) {
  console.log(item.imgs[0]);
  return (
    <div className={styles.catalogItem}>
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
