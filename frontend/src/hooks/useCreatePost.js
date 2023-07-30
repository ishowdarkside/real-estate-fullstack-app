import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../services/createPost";
import { toast } from "react-hot-toast";
export function useCreatePost() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => createPost(formData),
    onSuccess: (res) => {
      console.log(res);
      if (res.status == "success") {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
      if (res.status == "fail") {
        toast.error(res.message);
      }
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
  return { mutate, isLoading };
}
