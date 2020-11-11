import React, { Suspense, lazy } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import logo from "./components/images/logo.PNG";
import UserIcon from "./auth/UserIcon";
import Logout from "./auth/Logout";
import PrivateRoute from "./auth/PrivateRoute";
import { AccountCircle, Router } from "@material-ui/icons";
import { AppBar, Button, IconButton, Paper, Toolbar } from "@material-ui/core";
import { Signup, Login } from "./pages/";

const UpdateProfilePage = lazy(() => import("./pages/UpdateProfile.page"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword.page"));
const JobListsPage = lazy(() => import("./JobLists"));

function App(props) {
  const { currentUser } = useAuth();

  return (
    <div style={{ flex: 1, flexDirection: "flex-start" }}>
      <AppBar
        className="navbar navbar-expand-sm navbar-light bg-light"
        style={{ flexDirection: "row" }}
      >
        <Toolbar>
          <IconButton>
            <a
              href="/"
              className="navbar-brand"
              style={{
                color: "#7563A7",
                fontWeight: "500",
              }}
            >
              <img
                src={logo}
                width="75"
                height="75"
                alt="testA"
                style={{}}
              ></img>
            </a>
          </IconButton>
          <Button variant="contained" style={{ marginRight: "5px" }}>
            <Link
              to={"/talent"}
              style={{ textDecoration: "none", color: "black" }}
            >
              재능교환
            </Link>
          </Button>

          {currentUser ? null : (
            <Button variant="contained" style={{ marginRight: "5px" }}>
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "black" }}
              >
                Signup
              </Link>
            </Button>
          )}
          {currentUser ? null : (
            <Button variant="contained" style={{ marginRight: "5px" }}>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "black" }}
              >
                login
              </Link>
            </Button>
          )}
        </Toolbar>
        <Toolbar style={{ flexDirection: "row" }}>
          <form>
            <input type="search" placeholder="Search" />
            <Button variant="contained" color="secondary" type="submit">
              Search
            </Button>
          </form>
        </Toolbar>
        <Toolbar style={{ flexDirection: "row" }}>
          <Paper style={{ width: "120px", marginRight: "10px" }}>
            <UserIcon />
          </Paper>
          <Paper>
            <Logout />
          </Paper>
        </Toolbar>
      </AppBar>

      <div>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <PrivateRoute exact path="/" component={UpdateProfilePage} />
              <PrivateRoute
                path="/update-profile"
                component={UpdateProfilePage}
              />
              <Route path="/signup" component={Signup} />
              <Route
                path="/login"
                component={Login}
                style={{ flexDirection: "row" }}
              />
              <Route
                path="/forgot-password"
                component={ForgotPasswordPage}
                style={{ flexDirection: "row" }}
              />
              <Route
                path="/talent"
                component={JobListsPage}
                style={{ flexDirection: "row" }}
              />
            </Switch>
          </Suspense>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
