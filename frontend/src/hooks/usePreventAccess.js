import { useNavigate } from "react-router-dom";
import { useCurrUser } from "./useCurrUser";
import { useEffect } from "react";

export function usePreventAccess() {
  const { data, isLoading } = useCurrUser();
  const navigate = useNavigate();
  //if user is logged in, prevent from accessing this route
  useEffect(() => {
    if (data && !isLoading) navigate("/app");
  }, [data, isLoading, navigate]);

  return isLoading;
}
