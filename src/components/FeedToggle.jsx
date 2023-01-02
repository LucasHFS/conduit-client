import { Link, useLocation } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";
import { useAuth } from "../hooks/useAuth";

const FeedToggle = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [tag] = useQueryParam("tag", StringParam);

  function linkClasses(linkPath) {
    return location.pathname === linkPath ? "nav-link active" : "nav-link";
  }

  return (
    <div className="feed-toggle" id="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link className={linkClasses("/feed")} to="/feed">
                Your Feed
              </Link>
            </li>

            {tag ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Global Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to={`/${location.search}#`}>
                    #{tag}
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className={linkClasses("/")} to="/">
                  Global Feed
                </Link>
              </li>
            )}
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link disabled" to={`/${location.search}#`}>
                Your Feed
              </Link>
            </li>

            {tag ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Global Feed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to={`/${location.search}#`}>
                    #{tag}
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Global Feed
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
