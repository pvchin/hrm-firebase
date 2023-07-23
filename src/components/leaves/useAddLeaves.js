import { useMutation, useQueryClient } from "react-query";
import { leaves_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addLeaves(data) {
  await fetch(leaves_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddLeaves(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addLeaves(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("leaves");
      queryClient.invalidateQueries("leavesperiod");
      queryClient.invalidateQueries("leavesstatus");
      queryClient.invalidateQueries("leavesperiodbymth");
      toast({
        title: "Leave record being added!",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "Network Error! Please check your internet connection!",
        status: "warning",
      });
    },
  });

  return mutate;
}