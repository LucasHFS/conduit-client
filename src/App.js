import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import queryString from "query-string";

import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Register";
import Feed from "./components/Feed";
import { AuthProvider } from "./hooks/useAuth";
import Footer from "./components/Footer";
import { UserOnlyRoute, GuestOnlyRoute } from "./routes/Authorization";

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
                <UserOnlyRoute>
                  <Feed />
                </UserOnlyRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestOnlyRoute>
                  <Login />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestOnlyRoute>
                  <SignUp />
                </GuestOnlyRoute>
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
