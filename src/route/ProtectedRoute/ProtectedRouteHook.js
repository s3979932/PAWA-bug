import { useContext } from "react";
import AuthContext from "../../auth/state/AuthContext";

const useProtectedRoutePolicy = () => {

    const { state, dispatch } = useContext(AuthContext)

    const setUser = newUser =>
        dispatch({ type: "SET_USER", payload: newUser});

    return {
        user: state?.user,
        setUser
    };
};

export default useProtectedRoutePolicy;