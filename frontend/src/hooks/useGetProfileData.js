import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProfileData } from "../services/getProfileData";

export function useGetProfileData() {
  const { profileId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["specificProfile"],
    queryFn: () => getProfileData(profileId),
  });

  return { data, isLoading };
}
