import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function usePaginatePosts(page) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  useEffect(() => {
    const currSearchParams = new URLSearchParams(searchParams);
    currSearchParams.set("page", page.toString());
    setSearchParams(currSearchParams);
    //invalidate-ujem queries zato sto su koncipirani na search query params
    //sto znaci da ce mutation funkcija opet citati search params i na osnovu njih vrsiti filtering
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }, [page, searchParams, queryClient, setSearchParams]);
}
