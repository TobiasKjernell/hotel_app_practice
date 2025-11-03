import { useMutation } from "@tanstack/react-query"
import { signUp as signUpAPI } from "../../services/apiAuth"
import toast from "react-hot-toast";

export const useSignup = () => {

    const { mutate: signUp, isPending: isSigningUp } = useMutation({
        mutationFn: signUpAPI,
        onSuccess: (user) => {
            toast.success(`User added!`)
            console.log(user);  
        },
        onError: err => {
            console.log(err);
            toast.error('something went wrong');
        }
    })

    return { signUp, isSigningUp }
}