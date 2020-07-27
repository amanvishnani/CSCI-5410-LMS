import React, { useState, useEffect } from "react";
import { GET_SENTIMENT_URL, INGEST_FILE_URL } from "../BaseUrls";
import Axios from "axios";
import Loader from "react-loader-spinner";

export default function SentimentAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  async function ingestFile() {
    setLoading(true);
    await Axios.get(`${INGEST_FILE_URL}`);
    setLoading(false);
  }

  async function getMessages() {
    setLoading(true);
    let r = await Axios.get(`${GET_SENTIMENT_URL}`);
    let data = r.data;
    setMessages(data);
    setLoading(false);
  }

  useEffect(() => {
    getMessages();
  }, []); // Component Did Mount

  function renderButtons() {
    if (loading) {
      return (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={40}
          width={40}
          timeout={10000}
        />
      );
    } else {
      return (
        <React.Fragment>
          <button
            className="btn btn-info "
            style={{
              marginLeft: "1em",
              marginTop: "1em",
            }}
            onClick={(_) => ingestFile()}
          >
            Ingest New Data
          </button>
          <button
            className="btn btn-info "
            style={{
              marginLeft: "1em",
              marginTop: "1em",
            }}
            onClick={(_) => getMessages()}
          >
            Refresh
          </button>
        </React.Fragment>
      );
    }
  }

  return (
    <div>
      {renderButtons()}
      <table style={{ marginLeft: "2em", marginTop: "2em" }}>
        <tbody>
          <tr>
            <th>Text</th>
            <th>Sentiment</th>
            <th>Confidence Score</th>
          </tr>
          {messages &&
            messages.map((message, i) => (
              <tr key={i}>
                <td>{message.text}</td>
                <td>{message.sentiment}</td>
                <td>{message.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
