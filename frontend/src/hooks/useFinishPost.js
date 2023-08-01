import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finishPost } from "../services/posts";
import { toast } from "react-hot-toast";
export function useFinishPost() {
  const queryClient = useQueryClient();
  const { mutate, isLaoading } = useMutation({
    mutationFn: (postId) => finishPost(postId),
    onSuccess: (res) => {
      if (res.status == "success") toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLaoading };
}
