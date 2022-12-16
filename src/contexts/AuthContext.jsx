import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/apiClient";
import { formatedErrorsArray } from "../utils/request";
import { toastSuccess } from "../utils/toastify";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const signOut = useCallback(() => {
    destroyCookie(undefined, "conduit.token");
    setUser(null);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const { "conduit.token": token } = parseCookies();

    if (token) {
      setLoading(true);
      api
        .get("/user")
        .then((response) => {
          const { id, username } = response.data.user;
          setUser({ id, username });
        })
        .catch(() => {
          signOut();
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return () => setErrors([]);
  }, [signOut]);

  async function signIn({ email, password }) {
    try {
      setLoading(true);
      const response = await api.post("users/login", {
        user: {
          email,
          password,
        },
      });

      const { username, id, token } = response.data.user;

      setCookie(undefined, "conduit.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        username,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      navigate("/");
    } catch (err) {
      setErrors(formatedErrorsArray(err));
    }
    setLoading(false);
  }

  async function signUp({ email, username, password }) {
    try {
      setLoading(true);

      const response = await api.post("/users", {
        user: {
          username,
          email,
          password,
        },
      });

      if (response.status === 200) {
        toastSuccess("Account Created!");
        navigate("/login");
      }
    } catch (err) {
      setErrors(formatedErrorsArray(err));
    }
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        user,
        loading,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
