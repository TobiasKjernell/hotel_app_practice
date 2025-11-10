import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isPending, bookings } = useRecentBookings();
  const { isPending: isPendingStays, stays, confirmedStays } = useRecentStays();

  if (isPending || isPendingStays) return <Spinner />
  return (
    <StyledDashboardLayout>
      <div>statistics</div>
      <div>todays activity</div>
      <div>chart stay duration</div>
      <div>chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout;
