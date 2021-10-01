import React, { useContext } from "react";
import PostList from "./components/PostList";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { signInWithGoogle, signOut } from "./firebaseConfig";
import { AuthContext, AuthContextProvider } from "./context/auth-context";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <h1>Shoutouts</h1>
        {user ? (
          <div className="signed-in">
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <div className="signed-out">
            <button onClick={signInWithGoogle}>Sign In With Google</button>
          </div>
        )}
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <Route path="/" exact>
          <PostList />
        </Route>
        <Route path="/user/:name"></Route>
      </Router>
    </div>
  );
}

export default App;
