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
        <Route exact path={routes.ROOT} key={1}>
          <Redirect to={routes.TODO_LIST} />
        </Route>,

        <Route exact path={routes.TODO_LIST} component={TodoList} key={2} />,

        <Route exact path={routes.NOTES} component={Notes} key={3} />,

        <Route exact path={routes.PASSWORDS} component={Passwords} key={4} />,

        <Route exact path={routes.SEARCH} component={Search} key={5} />,

        <Route path="*" component={Error404} key={6} />,
      ]
    ) : (
      <Route path="*">
        <Redirect to={routes.CHANGE_USER} />
      </Route>
    )}
  </Switch>
);

export default Routes;
