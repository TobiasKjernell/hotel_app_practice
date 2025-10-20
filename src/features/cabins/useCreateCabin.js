import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
    const queryClient = useQueryClient();
    const { isPending: isCreating, mutate: createCabin } = useMutation({
        mutationFn: (cabin) => createEditCabin(cabin),
        onSuccess: async () => {
            toast.success('Added cabin');
            await queryClient.invalidateQueries({ queryKey: ['cabins'] });
            
        },              
        onError: (err) => toast.error(err.message)
    });

    return { isCreating, createCabin };
}   