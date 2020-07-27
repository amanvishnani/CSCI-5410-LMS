import React, {  } from 'react'
import { useFetch } from './SentimentService'
import { GET_SENTIMENT_URL, INGEST_FILE_URL } from '../BaseUrls'
import Axios from 'axios'

export default function SentimentAnalyzer() {
    const messages = useFetch(`${GET_SENTIMENT_URL}`)

    function ingestFile() {
        Axios.get(`${INGEST_FILE_URL}`)
    }
    
    return (
        <div>
            <button onClick={_ => ingestFile()}>Ingest New Data</button>
            <table>
                <tbody>
                    <tr>
                        <th>Text</th>
                        <th>Sentiment</th>
                        <th>Confidence Score</th>
                    </tr>
                    {
                        messages && messages.map((message, i) => <tr key={i}>
                            <td>{message.text}</td>
                            <td>{message.sentiment}</td>
                            <td>{message.score}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
