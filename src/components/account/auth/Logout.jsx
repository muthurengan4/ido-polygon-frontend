import React, { useEffect , useContext } from "react";
import { authContext } from "./AuthProvider";

const Logout = () => {

  const { hanldeLogout } = useContext(authContext);

  useEffect(() => {
    hanldeLogout();
  },[])
    return null;
}

export default Logout;
