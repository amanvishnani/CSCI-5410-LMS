import React, { Component } from "react";
import LexChat from "react-lex";

class VirtualAssistant extends Component {
  render() {
    return (
      <LexChat
        botName="VirtualAssistance"
        IdentityPoolId="us-east-1:55f82bbf-ce41-4372-8029-5e41da3f6f13"
        placeholder="Type your query"
        style={{ position: "absolute" }}
        backgroundColor="#FFFFFF"
        height="430px"
        headerText="Chat with our Virtual Assistant"
      />
    );
  }
}
export default VirtualAssistant;
