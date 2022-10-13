import { Route, Router } from "preact-router";

import Intro from "../routes/rent/intro";
import Owner from "../routes/rent/owner";
import Property from "../routes/rent/property";
import Tenant from "../routes/rent/tenant";
import Stay from "../routes/rent/stay";
import Done from "../routes/rent/done";

import "./index.css";
import Saved from "../routes/rent/saved";

export function App() {
  return (
    <div class="page">
      <Router>
        <Route path="/" component={Intro} />
        <Route path="/rent/intro" component={Intro} />
        <Route path="/rent/owner" component={Owner} />
        <Route path="/rent/property" component={Property} />
        <Route path="/rent/tenant" component={Tenant} />
        <Route path="/rent/stay" component={Stay} />
        <Route path="/rent/done" component={Done} />
        <Route path="/rent/saved" component={Saved} />
      </Router>
    </div>
  );
}
