import PostList from "./components/PostList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostsToSpecificUser from "./components/PostsToSpecificUser";
import ButtonAppBar from "./components/ExperimentalHeader";

function App() {
  return (
    <div className="App">
      <Router>
        <ButtonAppBar />
        {/* <FormDialog onSubmit={handleSubmit} /> */}
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
