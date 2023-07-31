import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/posts";

export function useGetPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return { data, isLoading };
}
