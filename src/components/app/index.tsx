import { Route, Router } from "preact-router";

import Intro from "../routes/rent/intro";
import Owner from "../routes/rent/owner";
import Property from "../routes/rent/property";
import Tenant from "../routes/rent/tenant";
import Stay from "../routes/rent/stay";
import Done from "../routes/rent/done";
import Saved from "../routes/rent/saved";

import "./index.css";

export function App() {
  return (
    <div class="page">
      <Router>
        <Route path="/contracts/" component={Saved} />
        <Route path="/contracts/rent/intro" component={Intro} />
        <Route path="/contracts/rent/owner" component={Owner} />
        <Route path="/contracts/rent/property" component={Property} />
        <Route path="/contracts/rent/tenant" component={Tenant} />
        <Route path="/contracts/rent/stay" component={Stay} />
        <Route path="/contracts/rent/done" component={Done} />
        <Route path="/contracts/rent/saved" component={Saved} />
      </Router>
    </div>
  );
}
