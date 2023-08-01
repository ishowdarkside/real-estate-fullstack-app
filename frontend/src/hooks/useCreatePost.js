import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../services/createPost";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCreatePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => createPost(formData),
    onSuccess: (res) => {
      if (res.status == "success") {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate("/app/me");
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
