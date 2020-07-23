import React, { Component } from "react";

class Home extends Component {
  render() {
    console.log(localStorage.email);
    return <div> this is the home page of the application</div>;
  }
}

export default Home;
