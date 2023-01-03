import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/editor"
                  data-test="nav-new-article"
                >
                  {" "}
                  <i className="ion-compose"></i>&nbsp;New Article{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/settings"
                  data-test="nav-settings"
                >
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`/@${user.username}`}
                  data-test="nav-profile"
                >
                  <img 
                    className="user-pic"
                    src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                    alt="profile"/>
                  {user.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login" data-test="sign-in">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" data-test="sign-up">
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
