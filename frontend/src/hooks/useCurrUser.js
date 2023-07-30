import { useQuery } from "@tanstack/react-query";
import { protect } from "../services/protect";

export function useCurrUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: protect,
  });

  return { data, isLoading };
}
