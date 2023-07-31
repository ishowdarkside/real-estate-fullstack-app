/* eslint-disable react/prop-types */

import Carousel from "../../ui/Slider/Slider";
import styles from "./ImageComponent.module.scss";
export default function ImageComponent({ post }) {
  return (
    <div className={styles.imageWrapper}>
      <Carousel>
        {post.imgs.map((image, i) => (
          <img
            src={`http://127.0.0.1:8000/${image}`}
            key={i}
            alt="slika nekretnine"
          />
        ))}
      </Carousel>
    </div>
  );
}
