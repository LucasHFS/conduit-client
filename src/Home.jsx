import { useAuth } from "./hooks/useAuth";

const Home = () => {
  const { user, signOut, isAuthenticated } = useAuth();

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
