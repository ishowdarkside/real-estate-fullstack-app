import { useModalContext } from "../../../context/modalContext";
import { useDeletePost } from "../../../hooks/useDeletePost";
import Spinner from "../../../ui/Spinner/Spinner";
import styles from "./ConfirmDelete.module.scss";
export default function ConfirmDelete() {
  const { setIsOpenModal, selectedPost } = useModalContext();
  const { mutate: removePost, isLoading: isDeleting } = useDeletePost();
  if (isDeleting) return <Spinner />;
  return (
    <div className={styles.ConfirmDelete}>
      <span>Jeste li sigurni da želite obrisati ovu objavu? </span>
      <div>
        <button onClick={() => removePost(selectedPost._id)}>Da, obriši</button>
        <button onClick={() => setIsOpenModal(false)}>Otkaži</button>
      </div>
    </div>
  );
}
