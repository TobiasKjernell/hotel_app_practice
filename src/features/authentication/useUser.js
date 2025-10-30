import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../services/apiAuth"

export const useUser = () => {
    const { isPending:isLoading, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    })

    return { isLoading, user, isAuth: user?.role === 'authenticated' }
}