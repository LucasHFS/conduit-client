import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import queryString from "query-string";

import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Feed from "./pages/Feed";
import { AuthProvider } from "./hooks/useAuth";
import Footer from "./components/Footer";
import { RequireAuth, RequireGuest } from "./routes/Authorization";

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          searchStringToObject: queryString.parse,
          objectToSearchString: queryString.stringify,
        }}
      >
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/feed"
              element={
                <RequireAuth>
                  <Feed />
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <RequireGuest>
                  <Login />
                </RequireGuest>
              }
            />
            <Route
              path="/register"
              element={
                <RequireGuest>
                  <SignUp />
                </RequireGuest>
              }
            />
          </Routes>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
