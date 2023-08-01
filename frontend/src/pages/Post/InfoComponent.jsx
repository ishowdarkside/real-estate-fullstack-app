/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../../context/modalContext";
import styles from "./Post.module.scss";
import { useFinishPost } from "../../hooks/useFinishPost";
export default function InfoComponent({ post, user }) {
  const { setIsOpenModal, setSelectedPost } = useModalContext();
  const { mutate } = useFinishPost();

  const navigate = useNavigate();
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
            {post.finished && <span>PRODAJA ZAVRŠENA</span>}
            <button
              onClick={() => navigate(`/app/profile/${post.creator._id}`)}
            >
              VIDI VIŠE
            </button>
          </>
        )}

        {user && post.creator._id === user._id && (
          <>
            <span>VAŠ OGLAS</span>
            {!post.finished && (
              <>
                <button onClick={() => mutate(post._id)}>Završi oglas</button>
                <button
                  onClick={() => {
                    setIsOpenModal(true);
                    setSelectedPost(post);
                  }}
                >
                  OBRIŠI OGLAS
                </button>
              </>
            )}
            {post.finished && <span>OGLAS JE ZAVRŠEN</span>}
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

function handleScroll() {
  const element = document.querySelector("#formComment");
  if (element) element.scrollIntoView({ behavior: "smooth" });
}
