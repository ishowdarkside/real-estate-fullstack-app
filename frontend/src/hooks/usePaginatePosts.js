import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function usePaginatePosts(page) {
  console.log(page);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  useEffect(() => {
    const currSearchParams = new URLSearchParams(searchParams);
    currSearchParams.set("page", page.toString());
    setSearchParams(currSearchParams);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }, [page, searchParams]);
}
