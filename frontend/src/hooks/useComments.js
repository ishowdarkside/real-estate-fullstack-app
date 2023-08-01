import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  answerComment,
  createComment,
  deleteAnswer,
  deleteComment,
} from "../services/comments";
import { toast } from "react-hot-toast";
export function usePostComment() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ postId, comment }) => createComment(postId, comment),
    onSuccess: (res) => {
      if (res.status == "success") {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["post"] });
      }
      if (res.status == "error") toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
}

export function useAnswerComment() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ commentId, answer }) => answerComment(commentId, answer),
    onSuccess: (res) => {
      toast.success(res.message);
      if (res.status == "success") {
        queryClient.invalidateQueries({ queryKey: ["post"] });
      }

      if (res.status == "fail") toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useDeleteAnswer() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (commentId) => deleteAnswer(commentId),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message),
          queryClient.invalidateQueries({ queryKey: ["post"] });
      }
      if (res.status == "fail") toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: (res) => {
      if (res.status == "success") {
        toast.success(res.mes);
        queryClient.invalidateQueries({ queryKey: ["post"] });
      }
      if (res.status == "fail") toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate, isLoading };
}
