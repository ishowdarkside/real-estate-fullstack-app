/* eslint-disable react/prop-types */

import Carousel from "../../ui/Slider/Slider";
import styles from "./ImageComponent.module.scss";
export default function ImageComponent({ post }) {
  return (
    <div className={styles.imageWrapper}>
      <Carousel>
        {post.imgs.map((image, i) => (
          <img src={`/${image}`} key={i} alt="slika nekretnine" />
        ))}
      </Carousel>
    </div>
  );
}
