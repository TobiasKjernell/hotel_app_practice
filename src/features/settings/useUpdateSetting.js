import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export const useUpdateSetting = () => {
    const queryClient = useQueryClient();
    const { isPending: isUpdating, mutate: updateSetting } = useMutation({
        mutationFn: updateSettingAPI,
        onSuccess: async () => {
            toast.success('Setting edited');
            await queryClient.invalidateQueries({ queryKey: ['settings'] });
        },
        onError: (err) => toast.error(err.message)
    });

    return { isUpdating, updateSetting }
}           