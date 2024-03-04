import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken) {
          loginUser(accessToken, refreshToken);
        }
      } catch (error) {
        console.error("Session Check Error:", error);
        logoutUser();
      }
    };

    checkSession();
  }, []);

  const loginUser = (accessToken: any, refreshToken: any) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ login: loginUser, logout: logoutUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
