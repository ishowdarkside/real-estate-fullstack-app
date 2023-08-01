import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../services/posts";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeletePost() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        navigate("/app/catalog");
      }
      if (res.status === "fail") toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
