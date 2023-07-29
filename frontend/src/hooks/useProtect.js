import { useQuery } from "@tanstack/react-query";
import { protect } from "../services/protect";

export function useProtect() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: protect,
  });

  return { data, isLoading };
}
