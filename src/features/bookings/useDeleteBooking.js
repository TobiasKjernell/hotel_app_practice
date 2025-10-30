import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export const useDeleteBooking = () => {
    const queryClient = useQueryClient();
    const { isPending, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success('Deleted booking');
            queryClient.invalidateQueries({
                queryKey: ['bookings']
            });
        },
        onError: err => toast.error(err.message)
    })

    return {isPending, deleteBooking}   
}
    