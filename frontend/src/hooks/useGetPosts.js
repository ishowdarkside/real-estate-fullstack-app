import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/posts";
import { getAllPosts } from "../services/getAllPosts";

export function useGetPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return { data, isLoading };
}

export function useGetAllPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });

  return { data, isLoading };
}
