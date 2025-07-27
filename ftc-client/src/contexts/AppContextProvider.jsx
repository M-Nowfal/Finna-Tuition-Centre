import { createContext, useState } from "react";

export const FTCAppContext = createContext();

const AppContextProvider = ({ children }) => {

  const storedAuthRole = JSON.parse(localStorage.getItem("ftcAuthRole")) || "FTCGUEST";
  const [ftcAuthRole, setFtcAuthRole] = useState(storedAuthRole);

  const contexts = {
    ftcAuthRole,
    setFtcAuthRole,
  };

  return <FTCAppContext.Provider value={contexts}>
    {children}
  </FTCAppContext.Provider>;
};

export default AppContextProvider;
