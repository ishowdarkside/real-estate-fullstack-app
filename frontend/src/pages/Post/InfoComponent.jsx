/* eslint-disable react/prop-types */
import styles from "./Post.module.scss";
export default function InfoComponent({ post, user }) {
  function handleScroll() {
    const element = document.querySelector("#formComment");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className={styles.infoWrapper}>
      <h2>{post.title}</h2>
      <h3>{post.subtitle}</h3>
      <div className={styles.userInfo}>
        {post.creator._id !== user?._id && (
          <>
            <span>
              {post.creator.role === "User" ? "Korisnik:" : "Agencija"}
            </span>
            <span>{post.creator.fullName || post.creator.agencyName}</span>
            <button>VIDI VIŠE</button>
          </>
        )}

        {user && post.creator._id === user._id && (
          <>
            <span>VAŠ OGLAS</span>
            <button>OBRIŠI OGLAS</button>
          </>
        )}
      </div>
      <p>{post.description}</p>

      {user && post.creator._id !== user._id && (
        <button onClick={() => handleScroll()}>
          Postavi pitanje
          {post.creator.role === "User" ? " korisniku" : " agenciji"}
        </button>
      )}
    </div>
  );
}
