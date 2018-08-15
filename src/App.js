import React from "react"
import { Switch, Route } from "react-router-dom"

// Common features
import Home from "./features/common/Home"
import Login from "./features/common/Login"
import Register from "./features/common/Register"
import Logout from "./features/common/Logout"
import CountryList from "./features/common/CountryList"
import NotFound from "./features/common/NotFound"
// Features available only to admin
import UsersList from "./features/admin/UsersList"
import AddUser from "./features/admin/AddUser"
import UpdateUser from "./features/admin/UpdateUser"
import UpdateSuccess from "./features/admin/UpdateSuccess"
import DeleteSuccess from "./features/admin/DeleteSuccess"
// Wrappers
import RequireAuth from "./app/wrappers/RequireAuth"
import RequireAdmin from "./app/wrappers/RequireAdmin"
import RouteChangeWrapper from "./app/wrappers/RouteChangeWrapper"

const Routes = props => (
  <Switch props={props}>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/logout" component={Logout} />
    <Route path="/flags" component={RequireAuth(CountryList)} />
    <Route path="/users" component={RequireAdmin(UsersList)} />
    <Route path="/add-user" component={RequireAdmin(AddUser)} />
    <Route path="/update/:id" component={RequireAdmin(UpdateUser)} />
    <Route path="/update-success" component={RequireAdmin(UpdateSuccess)} />
    <Route path="/delete-success" component={RequireAdmin(DeleteSuccess)} />
    <Route component={NotFound} />
  </Switch>
)

export default RouteChangeWrapper(Routes)
