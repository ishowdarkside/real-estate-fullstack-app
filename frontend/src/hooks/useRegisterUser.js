import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/register";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { storeCookie } from "../services/storeCookie";
export function useRegisterUser() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (res) => {
      if (res.status === "success") {
        storeCookie(res.token);
        toast.success(res.message);
        navigate("/app");
      }
      if (res.status === "fail") {
        toast.error(res.message);
      }
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
