import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../services/posts";
export function useGetSinglePost() {
  const { postId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => getSinglePost(postId),
  });

  return { data, isLoading };
}
