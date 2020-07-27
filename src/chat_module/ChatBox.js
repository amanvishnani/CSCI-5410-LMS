import React, { Component } from "react";
import { Launcher } from "react-chat-window";
import axios from "axios";

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: [],
    };

    this.apiSubCall();
  }

  async apiSubCall() {
    console.log("inside sub");

    if (localStorage.userData) {
      let userData = JSON.parse(localStorage.userData);
      if (
        userData &&
        userData.org &&
        userData.org.name &&
        userData.user.orgId &&
        userData.user.id
      ) {
        let subId =
          userData.org.name.charAt(0) +
          userData.user.orgId +
          "-" +
          userData.user.id;

        while (true) {
          await axios
            .get(
              `https://us-central1-testproject-277421.cloudfunctions.net/sub-node?id=${subId}`
            )
            .then((res) => {
              let data = res.data;
              console.log("data", data, new Date());
              if (data && data.length) {
                let messages = this.state.messageList;
                Object.values(data).forEach((value) => {
                  console.log("value", value);
                  let author = value.message.senderId;
                  if (author !== localStorage.email) {
                    let text = author + ": " + value.message.text;
                    let message = {
                      author: "them",
                      type: value.message.type,
                      data: { text: text },
                    };

                    messages.push(message);
                  }
                });
                this.setState({
                  messageList: messages,
                });
              }
            })
            .catch((err) => console.log("subscriber err data", err));

          await new Promise((r) => setTimeout(r, 5000));
        }
      }
    }
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
    this.apiPubCall(message);
  }

  _onFilesSelected() {
    console.log("called");
    let messageObj = {
      senderId: "me",
      data: {
        text:
          "Current chat does not support file sharing. It is under construction",
      },
      type: "text",
    };

    let messages = this.state.messageList;
    messages.push(messageObj);
    this.setState({
      messageList: messages,
    });
  }

  async apiPubCall(message) {
    if (localStorage.userData) {
      let userData = JSON.parse(localStorage.userData);
      if (
        userData &&
        userData.user &&
        userData.user.firstName &&
        userData.user.lastName &&
        userData.user.id &&
        userData.user.orgId &&
        userData.org.name
      ) {
        let name = userData.user.firstName + " " + userData.user.lastName;

        let messageObj = {
          senderId: name,
          text: message.data.text,
          type: message.type,
          userId: userData.user.id,
          orgId: userData.user.orgId,
          orgName: userData.org.name,
        };

        let obj = {
          message: messageObj,
        };

        await axios
          .post(
            "https://us-central1-testproject-277421.cloudfunctions.net/publish",
            obj
          )
          .then((res) => console.log("publisher res data", res.data))
          .catch((err) => console.log("publisher err data", err));
      }
    }
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "me",
            type: "text",
            data: { text },
          },
        ],
      });
    }
  }

  o;

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: "Let's Chat",
            imageUrl: "https://img.icons8.com/plasticine/100/000000/chat.png",
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji={false}
          _showFilePicker={false}
          onFilesSelected={this._onFilesSelected.bind(this)}
        />
      </div>
    );
  }
}

export default ChatBox;
