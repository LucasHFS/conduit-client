import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const Home = () => {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <p>Welcome {user?.username || "Unknown Person"}!</p>
      {isAuthenticated ? (
        <button className="btn btn-danger" onClick={signOut}>
          Log out
        </button>
      ) : null}
    </div>
  );
};

export default Home;
