/* eslint-disable react/prop-types */
import { useState } from "react";
import { useGetPosts } from "../../hooks/useGetPosts";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./Catalog.module.scss";
import FilterPanel from "./FilterPanel/FilterPanel";
import SearchPanel from "./SearchPanel/SearchPanel";
import { usePaginatePosts } from "../../hooks/usePaginatePosts";
import { useNavigate } from "react-router-dom";
export default function Catalog() {
  const { data, isLoading } = useGetPosts();
  const [page, setPage] = useState(1);
  usePaginatePosts(page);

  return (
    <div className={styles.catalogBody}>
      <div className="container">
        <SearchPanel />
        <FilterPanel />

        <div className={styles.postContainer}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <span className={styles.results}>Rezultati: {data.total}</span>
          )}
          {!isLoading &&
            data.posts.map((item) => (
              <CatalogItem item={item} key={item._id} />
            ))}

          {!isLoading && data.posts.length > 0 && (
            <div className={styles.pagination}>
              {page - 1 > 0 && (
                <button onClick={() => setPage((page) => page - 1)}>
                  {page - 1}
                </button>
              )}
              <button className={styles.activePage}>{page}</button>
              {data.left > 0 && (
                <button onClick={() => setPage((page) => page + 1)}>
                  {page + 1}
                </button>
              )}
            </div>
          )}
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
