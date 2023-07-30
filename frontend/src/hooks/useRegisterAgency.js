import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAgency } from "../services/register";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { storeCookie } from "../services/storeCookie";
export function useRegisterAgency() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => registerAgency(data),
    onSuccess: (res) => {
      if (res.status === "success") {
        //cache agency
        queryClient.setQueriesData(["user"], res.user);
        //store token in cookie
        storeCookie(res.token);
        toast.success(res.message);
        navigate("/app");
      }
      if (res.status === "fail") {
        toast.error(res.message);
      }
    },
  });
  return { mutate, isLoading };
}
