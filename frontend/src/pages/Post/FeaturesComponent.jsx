/* eslint-disable react/prop-types */
import { formatDate } from "../../services/formatDate";

import styles from "./Post.module.scss";

export default function FeaturesComonent({ post }) {
  return (
    <div className={styles.features}>
      <div className={styles.generalPanel}>
        <div>
          <img src="/pin-sm.svg" />
          <span>{post.location[0].toUpperCase() + post.location.slice(1)}</span>
        </div>
        <div className={styles.createdAt}>
          <img src="/calendar-sm.svg" />
          {formatDate(post.createdAt)}
        </div>

        <div>
          <img src="/money.svg" />
          <p className={styles.priceTag}>
            {post.price.toLocaleString("en-US")} KM
          </p>
        </div>
      </div>

      <div className={styles.featuresPanel}>
        {post.novogradnja && (
          <div>
            <img src="/building-sm.svg" />
            <span>NOVOGRADNJA</span>
          </div>
        )}

        {post.namjesten && (
          <div>
            <img src="/couch.svg" />
            <span>NAMJEŠTEN</span>
          </div>
        )}

        <div>
          <img src="/fire.svg" />
          <span>{post.grijanje.toUpperCase()}</span>
        </div>
        <div>
          <img src="/door.svg" />
          <span>BROJ SOBA: {post.roomNum}</span>
        </div>
        <div>
          <span> {post.vrstaOglasa.toUpperCase()}</span>
        </div>
        <div>
          <img src="/elevator.svg" />
          <span>
            {post.tipNekrentine === "kuća" ? "BROJ SPRATOVA" : "SPRAT"}{" "}
            {post.sprat}
          </span>
        </div>
        {post.indexed && (
          <div>
            <img src="/books.svg" />
            <span>UKNJIŽEN</span>
          </div>
        )}
        <div>
          <img src="/cube.svg" />
          <span>KVADRATA: {post.kvadrata}</span>
        </div>
        {post.garage && (
          <div>
            <img src="/garage.svg" />
            <span>GARAŽA</span>
          </div>
        )}
      </div>
    </div>
  );
}
