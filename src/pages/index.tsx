import { Switch, Route, Redirect } from "react-router-dom";

import { routes } from "../helpers/router";

import { Error404 } from "./service";

import { TodoList } from "./todo-list";
import { Notes } from "./notes";
import { Passwords } from "./passwords";
import { Search } from "./search";
import { ChangeUser, Registration } from "./user";

const Routes = () => (
  <Switch>
    <Route
      exact
      path={routes.ROOT}
      component={() => <Redirect to={routes.TODO_LIST} />}
    />

    <Route exact path={routes.CHANGE_USER} component={ChangeUser} />

    <Route exact path={routes.REGISTRATION} component={Registration} />

    <Route exact path={routes.TODO_LIST} component={TodoList} />

    <Route exact path={routes.NOTES} component={Notes} />

    <Route exact path={routes.PASSWORDS} component={Passwords} />

    <Route exact path={routes.SEARCH} component={Search} />

    <Route path="*" component={Error404} />
  </Switch>
);

export default Routes;
