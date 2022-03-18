import classes from "./MainNavigation.module.css";
import logo from "./LogoSample_ByTailorBrands__1_-removebg-preview.png";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const loginHandler = (e) => {
    e.preventDefault();
    history.replace("/autorisation");
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    history.replace("/");
    authCtx.logout();
  };
  const logoHandler = (e) => {
    e.preventDefault();
    history.replace("/");
  };

  return (
    <header className={classes.header}>
      <div>
        <img
          src={logo}
          className={classes.logo}
          alt="logo"
          onClick={logoHandler}
        ></img>
      </div>
      <div className={classes.navi}>
        <ul>
          {isLoggedIn && (
            <li>
              <Link to="/my-words">My words</Link>
            </li>
          )}
          {!isLoggedIn && <button onClick={loginHandler}>Login</button>}
          {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
