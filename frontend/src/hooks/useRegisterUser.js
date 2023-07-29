import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../services/register";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export function useRegisterUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (res) => {
      if (res.status === "success") {
        //cache user
        queryClient.setQueriesData(["user"], res.user);
        //if successfull login, store token from response to cookie
        let expirationDate = new Date();
        expirationDate.setTime(
          expirationDate.getTime() + 60 * 24 * 60 * 60 * 1000
        );
        let expires = "expires=" + expirationDate.toUTCString();
        document.cookie = "jwt" + "=" + res.token + "; " + expires + "; path=/";
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
