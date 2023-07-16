import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import GenerateURL from "./Components/GenerateURL";
import AWSStorage from "./Components/AWSStorage";
import MakePayment from "./Components/MakePayment";

function App() {
  return (
    <>
      <HashRouter basename="/">
        <div className="App">
          <Switch>
            <Route exact path="/">
              <GenerateURL />
            </Route>

            <Route exact path="/Payments">
              <MakePayment />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
