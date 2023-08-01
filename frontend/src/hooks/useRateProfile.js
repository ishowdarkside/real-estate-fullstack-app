import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  rateProfileNegative,
  rateProfilePositive,
} from "../services/rateProfile";

export function useRateProfilePositive() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (profileId) => rateProfilePositive(profileId),
    onSuccess: (res) => {
      if (res.status === "success")
        queryClient.invalidateQueries({ queryKey: ["specificProfile"] });
    },
  });

  return { mutate, isLoading };
}

export function useRateProfileNegative() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (profileId) => rateProfileNegative(profileId),
    onSuccess: (res) => {
      if (res.status === "success")
        queryClient.invalidateQueries({ queryKey: ["specificProfile"] });
    },
  });

  return { mutate, isLoading };
}
