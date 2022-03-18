import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  setEmail: (email) => {},
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  const [email, setEmail] = useState(initialEmail);

  const loginHandler = (token, email) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear("token");
    localStorage.clear("email");
  };

  const emailHandler = (email) => {
    setEmail(email);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    email: email,
    setEmail: emailHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
