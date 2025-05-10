import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { stat } from "fs";

interface LoginContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: UserSession, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true);
    } else if (status === "unauthenticated") {
      setIsLoggedIn(false);
    }
  }, [status]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

// Custom hook to use the LoginContext
export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error(
      "useLoginContext must be used within a LoginContextProvider",
    );
  }
  return context;
};
