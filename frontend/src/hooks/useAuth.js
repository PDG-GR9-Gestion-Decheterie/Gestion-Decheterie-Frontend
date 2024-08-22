import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [fonction, setFonction] = useLocalStorage("fonction", null);
  const navigate = useNavigate();

  const login = async (data) => {
    setUserId(data.idlogin);
    setFonction(data.fonction);
    navigate("/");
  };

  const logout = () => {
    setUserId(null);
    setFonction(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      userId,
      fonction,
      login,
      logout,
    }),
    [userId, fonction]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
