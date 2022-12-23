import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./Register";
import { AuthProvider } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
