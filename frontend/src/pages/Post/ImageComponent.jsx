/* eslint-disable react/prop-types */
import styles from "./Post.module.scss";
export default function ImageComponent({ post }) {
  return (
    <div className={styles.imageWrapper}>
      {post.imgs.map((image, i) => (
        <img
          src={`http://127.0.0.1:8000/${image}`}
          key={i}
          alt="slika nekretnine"
        />
      ))}
    </div>
  );
}
