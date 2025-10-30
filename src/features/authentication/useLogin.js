import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export const useLogin = () => {
    const navigate = useNavigate();
    const ql = useQueryClient();        
    const { mutate: login, isPending: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            toast.success(`Welcome ${user.user.email}`)
            ql.setQueriesData['user', user]
            navigate('/dashboard')
        },
        onError: err => {
            console.log(err);
            toast.error('Provided email or password is incorrect!');
        }
    })

    return { login, isLoggingIn }
}