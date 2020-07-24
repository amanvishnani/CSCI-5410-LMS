import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import UploadFile from "./upload-file/UploadFile";
import Home from "./home/Home";
import NotFound from "./NotFound";
import AppHeader from "./AppHeader";
import ChatBox from "./chat_module/ChatBox";

import "./App.css";

class App extends Component {
  render() {
    return (
      <article className="">
        <header>
          <AppHeader />
        </header>

        <section>
          <Switch>
            <Route exact path="/" component={Login}></Route>

            <Route
              path="/login"
              render={(props) => <Login {...props}></Login>}
            ></Route>

            <Route path="/register" component={Register}></Route>

            <Route
              path="/home"
              render={(props) => <Home {...props}></Home>}
            ></Route>

            <Route
              path="/upload-file"
            >
              <UploadFile></UploadFile>
            </Route>

            <Route
              path="/not-found"
              render={(props) => <NotFound {...props}></NotFound>}
            ></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </section>
        <section>{localStorage.email ? <ChatBox></ChatBox> : null}</section>
      </article>
    );
  }
}

export default withRouter(App);
