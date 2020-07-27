import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";
import UploadFile from "./upload-file/UploadFile";
import Home from "./home/Home";
import Logout from "./logout/Logout";
import NotFound from "./NotFound";
import AppHeader from "./AppHeader";
import "./App.css";
import Challenge from "./challenge/Challenge";
import VirtualAssistant from "./virtualAssistant/VirtualAssistant";
import ChatBox from "./chat_module/ChatBox";
import SentimentAnalyzer from "./sentiment-analyzer/SentimentAnalyzer";

class App extends Component {
  render() {
    let isLoggedIn = localStorage.getItem("loggedIn") === "true";
    let showChat;

    if (this.props && this.props.location && this.props.location.pathname) {
      showChat = this.props.location.pathname !== "/help";
    }

    return (
      <article className="">
        <header>
          <AppHeader />
        </header>

        <section>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/analysis-2" component={SentimentAnalyzer}></Route>
            <Route
              path="/login"
              render={(props) => <Login {...props}></Login>}
            ></Route>

            <Route path="/logout">
              <Logout></Logout>
            </Route>

            <Route path="/register" component={Register}></Route>

            <Route path="/help" component={VirtualAssistant}></Route>

            <Route path="/challenge" component={Challenge}></Route>

            <Route
              path="/home"
              render={(props) => <Home {...props}></Home>}
            ></Route>

            <Route path="/upload-file">
              <UploadFile></UploadFile>
            </Route>

            <Route
              path="/not-found"
              render={(props) => <NotFound {...props}></NotFound>}
            ></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </section>
        <section>{isLoggedIn && showChat ? <ChatBox></ChatBox> : null}</section>
      </article>
    );
  }
}

export default withRouter(App);
