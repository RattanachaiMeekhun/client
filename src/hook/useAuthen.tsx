import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

const useAuthen = () => {
  const context = useContext(AuthenticationContext);
  if (!context)
    throw new Error("Authen Context must be use inside Authen Provider");
  return context;
};

export default useAuthen;
