import React, { useReducer, useEffect } from "react";
import { authReducer, initialState, ACTIONS } from "../reducer/useAuthReducer";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log("AuthProvider state.token =", state.token);
  // On mount, check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: ACTIONS.LOGIN, payload: { token } });
    }
  }, []);

  // Save token to localStorage on login
  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
    }
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;