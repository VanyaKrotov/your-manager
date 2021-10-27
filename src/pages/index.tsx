import { Switch, Route, Redirect } from "react-router-dom";

import { routes } from "../helpers/router";

import { Error404 } from "./service";

import { TodoList } from "./todo-list";
import { Notes } from "./notes";

const Routes = () => (
  <Switch>
    <Route
      exact
      path={routes.ROOT}
      component={() => <Redirect to={routes.TODO_LIST} />}
    />

    <Route exact path={routes.LOGIN} component={() => <div>1</div>} />

    <Route exact path={routes.REGISTRATION} component={() => <div>1</div>} />

    <Route exact path={routes.TODO_LIST} component={TodoList} />

    <Route exact path={routes.NOTES} component={Notes} />

    <Route path="*" component={Error404} />
  </Switch>
);

export default Routes;
