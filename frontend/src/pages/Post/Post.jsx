/* eslint-disable react/prop-types */
import { useGetSinglePost } from "../../hooks/useGetSinglePost";
import { useCurrUser } from "../../hooks/useCurrUser";
import Spinner from "../../ui/Spinner/Spinner";
import FeaturesComonent from "./FeaturesComponent";
import ImageComponent from "./ImageComponent";
import InfoComponent from "./InfoComponent";
import styles from "./Post.module.scss";
import PostMap from "./PostMap";
import Comments from "./Comments";
import Modal from "../../ui/Modal/Modal";
import { useModalContext } from "../../context/modalContext";
import ConfirmDelete from "./ConfirmDelete/ConfirmDelete";

export default function Post() {
  const { data, isLoading } = useGetSinglePost();
  const { data: user, isLoading: isGettingUser } = useCurrUser();
  const { isOpenModal } = useModalContext();
  if (isLoading) return <Spinner />;
  if (isGettingUser) return <Spinner />;
  if (data.status === "fail")
    return (
      <span className={styles.notFound}>
        Objava koju tražite nije pronađena, pokušajte ponovo.
      </span>
    );
  const { post } = data;
  //nema potrebe za contextom jer je jedan level prop drillinga (Ak bude vise children componenti koje budu koristile - prebaciti na context)
  return (
    <div className={styles.postBody}>
      <div className={`container ${styles.postContainer}`}>
        <ImageComponent post={post} />
        <InfoComponent post={post} user={user} />
        <FeaturesComonent post={post} />
        <PostMap post={post} />
        <Comments post={post} user={user} />

        {isOpenModal && (
          <Modal>
            <ConfirmDelete />
          </Modal>
        )}
      </div>
    </div>
  );
}
