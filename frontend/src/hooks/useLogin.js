import { useMutation } from "@tanstack/react-query";
import { login } from "../services/login";
import { toast } from "react-hot-toast";
import { storeCookie } from "../services/storeCookie";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate, isLoading: isLoggingIn } = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        storeCookie(res.token);
        navigate("/app");
      }
      if (res.status === "fail") toast.error(res.message);
    },
  });

  return { mutate, isLoggingIn };
}
