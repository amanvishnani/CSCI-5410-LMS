import React, { Component } from "react";
import axios from "axios";

class WordCloud extends Component {

    handleSubmit = () => {
      axios.post("https://wordcloud-6idi7je7kq-uc.a.run.app/wordCloud", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Request-Method": "POST",
        },
      });

      this.props.history.push("/display-wordcloud");
    };

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
          Click the below button to view the generated <b>Word Cloud</b>
        </h1>
        <form>
          <button
            type="submit"
            class="btn btn-primary btn-block"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default WordCloud;
