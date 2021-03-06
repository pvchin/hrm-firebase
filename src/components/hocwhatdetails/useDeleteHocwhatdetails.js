import { useMutation, useQueryClient } from "react-query";
import { hocwhatdetails_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteHocwhatdetails(id) {
  await fetch(hocwhatdetails_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteHocwhatdetails(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteHocwhatdetails(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("hocwhatdetails");
      toast({
        title: "HOC What details record being deleted!",
        status: "warning",
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
