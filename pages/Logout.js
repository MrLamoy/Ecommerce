import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Logout() {

  const { unsetUser, setUser } = useContext(UserContext);

  useEffect(() => {
    // Set the user state back to its original value
    setUser({
      id: null,
      isAdmin: null,
    });
  }, [setUser]);

  // Move the unsetUser call inside the useEffect to avoid ESLint errors
  useEffect(() => {
    unsetUser();
  }, [unsetUser]);

  // Wrap the Navigate component in a function or assign it to a variable
  const navigateToLogin = () => {
    return <Navigate to="/login" />;
  };

  // Use the rendered JSX
  return navigateToLogin();
}
