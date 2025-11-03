import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutAPI } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export const useLogout = () => {
    const navigate = useNavigate();
    const ql = useQueryClient();
    const { mutate: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            toast.success(`Logged out`)
            ql.removeQueries();
            navigate('/login', { replace: true })
        },
        onError: err => {
            console.log(err);
            toast.error(err.message);
        }
    })

    return { logout, isLoggingOut }
}