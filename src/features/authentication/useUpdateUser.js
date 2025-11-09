import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { isPending: isUpdating, mutate: updateUser } = useMutation({
        mutationFn: updateCurrentUser,  
        onSuccess: async () => {
            toast.success('User account successfully updated');
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isUpdating, updateUser }
}       