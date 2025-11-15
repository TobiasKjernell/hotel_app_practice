import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../services/apiBookings"

export const useTodayActivity = () => {
    const { data: activities, isPending: todayIsLoading, error: todayError } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activity']
    })

    return { activities, todayIsLoading, todayError }
}