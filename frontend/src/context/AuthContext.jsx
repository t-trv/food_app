import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("quadbite_user")) || null
  );

  const updateUser = (data) => {
    if (data === null) {
      setCurrentUser(null);
      return;
    }

    setCurrentUser({
      ...data,
      website: "quadbite",
    });
  };

  useEffect(() => {
    localStorage.setItem("quadbite_user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
