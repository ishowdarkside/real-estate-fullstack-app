import { useDashboardContext } from "../../context/dashboardContext";
import { useGetAllPosts } from "../../hooks/useGetPosts";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./DashBoard.module.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function BuildingModal() {
  const { activeBuilding, setActiveBuilding } = useDashboardContext();
  const { data: allPosts, isLoading } = useGetAllPosts();
  const coordsStr = activeBuilding && activeBuilding.join(",");
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  const post =
    activeBuilding &&
    allPosts?.posts.find((post) => post.coords[0] === coordsStr);

  return (
    <div
      className={`${styles.buildingModal} ${
        activeBuilding ? styles.showModal : ""
      }`}
    >
      {post && (
        <>
          <button
            className={styles.closeModal}
            onClick={() => setActiveBuilding(null)}
          >
            <AiFillCloseCircle />
          </button>
          <img src={`/${post.imgs[0]}`} />
          <div className={styles.generalInfo}>
            <span>{post.tipNekretnine}</span>
            <span>{post.vrstaOglasa}</span>
            <span>
              <img src="/pin.svg" />
              {post.location}
            </span>
          </div>

          <div className={styles.info}>
            <h2>{post.title}</h2>
            <span className={styles.subtitle}>{[post.subtitle]}</span>
            <span className={styles.price}>
              {post.price.toLocaleString("en-US")} KM
            </span>
            <span className={styles.description}>{post.description}</span>
          </div>
          <button
            className={styles.buttonAdvanced}
            onClick={() => navigate(`/app/post/${post._id}`)}
          >
            DETALJNO
          </button>
        </>
      )}
    </div>
  );
}
