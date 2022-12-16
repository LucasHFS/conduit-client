import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loading, errors } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    signIn(data);
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  required
                  minLength="6"
                  maxLength="20"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>

              {errors?.length ? (
                <ul className="error-messages" data-testid="error-list">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              ) : null}
              {loading ? (
                <button
                  disabled
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign in
                </button>
              ) : (
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Sign in
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
