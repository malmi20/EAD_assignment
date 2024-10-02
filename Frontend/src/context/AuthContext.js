import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AppContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is authenticated function
  const checkNUpdateAuth = useCallback(() => {
    if (isAuthenticated) return;
    let localStObj = localStorage.getItem("token");
    if (!localStObj && pathname !== "/auth") {
      setIsAuthenticated(false);
      setUser(null);
      navigate("/auth");
    } else if(localStObj) {
      setIsAuthenticated(true);
      let userData = localStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [isAuthenticated, navigate, pathname]);

  // Check if user is authenticated on every route change and redirect to login if not authenticated
  useEffect(() => {
    if (isAuthenticated) return;
    checkNUpdateAuth();
  }, [checkNUpdateAuth, isAuthenticated, pathname]);

  // Sign out function
  const handleSignOut = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/auth");
    setIsAuthenticated(false);
  }, [navigate]);

  // Sign in function
  const handleSignIn = useCallback(
    (authData) => {
      const { token,...userData } = authData;
      localStorage.setItem("token", JSON.stringify({ token }));
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/");
    },
    [navigate]
  );

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      handleSignIn,
      handleSignOut,
      user,
    }),
    [isAuthenticated, handleSignIn, handleSignOut, user]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AuthContextProvider;
