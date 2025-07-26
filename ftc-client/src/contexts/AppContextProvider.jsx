import { createContext, useEffect, useState } from "react";

export const FTCAppContext = createContext();

const AppContextProvider = ({ children }) => {
  
  const getStoredRole = async () => {
    const storedAuthRole = await JSON.parse(localStorage.getItem("ftcAuthRole")) || "FTCGET";
    return storedAuthRole;
  };

  const [ftcAuthRole, setFtcAuthRole] = useState(getStoredRole());

  const contexts = {
    ftcAuthRole,
    setFtcAuthRole,
  };


  return <FTCAppContext.Provider value={contexts}>
    {children}
  </FTCAppContext.Provider>;
};

export default AppContextProvider;
