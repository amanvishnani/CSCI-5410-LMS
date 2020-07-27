import React, { Component } from "react";

class WordCloudImage extends Component {
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
          Generated Word Cloud
        </h1>
        <img
          src="https://csci5410-wordcloud.s3.amazonaws.com/WordCloud.png"
          alt="Logo"
        />
      </div>
    );
  }
}

export default WordCloudImage;
