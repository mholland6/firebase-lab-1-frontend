import "./Header.css";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { AuthContext, AuthContextProvider } from "../context/auth-context";
import { useContext } from "react";

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <header>
      <h1>Shoutouts</h1>
      {user ? (
        <div className="signed-in">
          <p>{user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div className="signed-out">
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
      )}

      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </header>
  );
}

export default Header;
