import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditCabin = () => {
    const queryClient = useQueryClient();
    const { isPending: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: async () => {
            toast.success('Cabin edited');
            await queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isEditing, editCabin }
}