import React, { useState } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import { verifyChallangeOnServer } from "./ChallengeService";

function Challenge(props) {
    let query = useQuery();
    let history = useHistory()
    let challengeCode = query.get("challengeCode");
    let question = query.get("question")
    const [state, setState] = useState({
        answer: ""
    })
    function handleChange(e) {
        setState({
            [e.target.name]: e.target.value,
        });
    };

    async function verifyChallange() {
        try {
            let userData = await verifyChallangeOnServer(challengeCode, state.answer);
            localStorage.setItem("email", userData.user.emailId);
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("loggedIn", "true");
            history.push('/home')
        } catch (error) {
            if(error.response.status === 401) {
                alert(error.response.data.error)
            }
        }
    }
    return (
        <div>
            <article>
                <div className="row">
                    <div className="col">
                        <section className="loginForm login-div border rounded">
                            <section className="card card-custom">
                                <section className="card-body">
                                        <main>
                                            <label>Security Question</label> <h2>{question}</h2>
                                        </main>
                                        <main className="form-group">
                                            <label>Security Answer</label>
                                            <input
                                                type="answer"
                                                name="answer"
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter Answer"
                                            />
                                        </main>
                                        <button
                                            onClick={_ => verifyChallange()}
                                            className="btn btn-info btn-centre"
                                        >
                                            Verify
                                        </button>
                                </section>
                            </section>
                        </section>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default Challenge

function useQuery() {
    return new URLSearchParams(useLocation().search);
}