import React, { Component } from "react";

class Home extends Component {
  render() {
    console.log(localStorage.email);
    return (
      <div style={{ background: "#e5ffff" }}>
        <h1
          style={{
            marginTop: "1.5em",
            marginLeft: "1.5em",
            marginRight: "0.5em",
            fontStyle: "italic",
            fontFamily: "sans-serif",
          }}
        >
          Welcome to our web application.
        </h1>
        <h3 style={{ marginLeft: "4em", fontFamily: "sans-serif" }}>
          We have below options to explore in our application.
        </h3>
        <ul style={{ textIndent: "6.5em", fontFamily: "sans-serif" }}>
          <li style={{ paddingBottom: "0.5em" }}>
            Upload Files section: To form a word cloud with named entities.
          </li>
          <li style={{ paddingBottom: "0.5em" }}>
            Help section: To assist users in application usuage.
          </li>
          <li style={{ paddingBottom: "0.5em" }}>
            Sentiment Analysis section: To detect the sentiment of the online
            chat messages.
          </li>
          <li style={{ paddingBottom: "0.5em" }}>
            Chat section: To chat with the online users.
          </li>
        </ul>
        <h5 style={{ marginLeft: "6em", fontFamily: "sans-serif" }}>
          Explore the various options using the navigational bar at the top.
        </h5>
      </div>
    );
  }
}

export default Home;
