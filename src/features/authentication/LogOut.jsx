import ButtonIcon from "../../ui/ButtonIcon"
import { HiArrowRightOnRectangle } from "react-icons/hi2"
import { useLogout } from "./useLogout"
import SpinnerMini from "../../ui/SpinnerMini";

const LogOut = () => {
    const { logout, isLoggingOut } = useLogout();

    return (
        <ButtonIcon disabled={isLoggingOut} onClick={logout}>
            {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    )
}

export default LogOut;