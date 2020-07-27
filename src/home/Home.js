import React, { Component } from "react";

class Home extends Component {
  render() {
    console.log(localStorage.email);
    return <div>
      <h1>This is Homepage</h1>
      <h2>Explore Different sections in the menu bar</h2>
    </div>;
  }
}

export default Home;
