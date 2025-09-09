import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
    const queryClient = useQueryClient();
    const { isPending, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinAPI(id),
        onSuccess: () => {
            toast.success('Deleted cabin');
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },
        onError: err => toast.error(err.message)
    })

    return {isPending, deleteCabin}
}
    