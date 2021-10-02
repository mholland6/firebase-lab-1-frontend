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
import Header from "./components/Header";
import PostsToSpecificUser from "./components/PostsToSpecificUser";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <PostList />
          </Route>
          <Route path="/user/:name" exact>
            <PostsToSpecificUser />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
