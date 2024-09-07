import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  uid: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [authUid, setAuthUid] = useState();

  function authenticate(key) {
    setAuthUid(key.uid);
    setAuthToken(key.token);
    const loginTime = !!key.loginTime ? key.loginTime : new Date();
    AsyncStorage.setItem("token", key.token);
    AsyncStorage.setItem("uid", key.uid);
    AsyncStorage.setItem("loginTime", loginTime.toISOString());
  }

  function logout() {
    setAuthToken(null);
    setAuthUid(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("uid");
    AsyncStorage.removeItem("loginTime");
  }

  const value = {
    token: authToken,
    uid: authUid,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
