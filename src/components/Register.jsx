import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorMessages from "./ErrorMessages";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loading, errors } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
    };

    signUp(data);
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-test="sign-up-username"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-test="sign-up-email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required
                  minLength="6"
                  maxLength="20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-test="sign-up-password"
                />
              </fieldset>
              {!!errors?.length && <ErrorMessages errors={errors}/>}
              <button
                disabled={loading}
                className="btn btn-lg btn-primary pull-xs-right"
                data-test="sign-up-submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
