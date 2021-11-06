import { Switch, Route, Redirect } from "react-router-dom";
import { FC } from "react";

import { routes } from "../helpers/router";

import { Error404 } from "./service";

import { TodoList } from "./todo-list";
import { Notes } from "./notes";
import { Passwords } from "./passwords";
import { Search } from "./search";
import { ChangeUser, Registration } from "./user";

interface RouterProps {
  authorized: boolean;
}

const Routes: FC<RouterProps> = ({ authorized }) => (
  <Switch>
    <Route exact path={routes.CHANGE_USER} component={ChangeUser} />

    <Route exact path={routes.REGISTRATION} component={Registration} />

    {authorized ? (
      [
        <Route exact path={routes.ROOT}>
          <Redirect to={routes.TODO_LIST} />
        </Route>,

        <Route exact path={routes.TODO_LIST} component={TodoList} />,

        <Route exact path={routes.NOTES} component={Notes} />,

        <Route exact path={routes.PASSWORDS} component={Passwords} />,

        <Route exact path={routes.SEARCH} component={Search} />,

        <Route path="*" component={Error404} />,
      ]
    ) : (
      <Route path="*">
        <Redirect to={routes.CHANGE_USER} />
      </Route>
    )}
  </Switch>
);

export default Routes;
