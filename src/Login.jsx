import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loading, errors } = useAuth();

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
                  data-test="sign-in-email"
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
                  data-test="sign-in-password"
                />
              </fieldset>

              {errors?.length ? (
                <ul className="error-messages" data-test="error-list">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              ) : null}
                <button
                  disabled={loading}
                  className="btn btn-lg btn-primary pull-xs-right"
                  data-test="sign-in-submit"
                >
                  Sign in
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
