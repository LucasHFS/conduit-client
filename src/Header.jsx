import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const Header = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              {" "}
              <i className="ion-compose"></i>&nbsp;New Article{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              {" "}
              <i className="ion-gear-a"></i>&nbsp;Settings{" "}
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={`/${user.username}`}>
                  {user.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
