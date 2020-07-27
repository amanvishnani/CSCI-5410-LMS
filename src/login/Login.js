import React, { Component } from "react";
import "./Login.css";
import errMsg from "../errorMessages";
import { login } from "./LoginService";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validationErrorFlag: false,
      loginFlag: false,
      errorMsg: "",
      loading: false
    };
  }

  componentDidMount() { }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      validationErrorFlag: false,
      errorMsg: "",
    });
  };

  async apiCall() {
    try {
      this.state.loading = true;
      let challengeData = await login(this.state.email, this.state.password)
      if (challengeData.type === "CHALLENGE") {
        let { challengeCode, question } = challengeData;
        this.props.history.push(`/challenge?challengeCode=${challengeCode}&question="${question}"`);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message)
      }
      console.log(err)
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["1"],
      });
    } finally {
      this.setState({loading : false});
    }
  }

  onLoginSubmit = (e) => {
    e.preventDefault();

    this.setState({
      validationErrorFlag: false,
      errorMsg: "",
    });

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(String(this.state.email).toLowerCase());

    if (
      this.state &&
      this.state.email &&
      this.state.password &&
      this.state !== {} &&
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      if (!validEmail) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["2"],
        });
        return;
      }

      this.apiCall();
    } else {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["3"],
      });
    }
  };

  render() {
    if(localStorage.getItem("loggedIn")==="true") {
      return <Redirect to="/home"></Redirect>
    }
    return (
      <article>
        <div className="row">
          <div className="col">
            <section className="loginForm login-div border rounded">
              <section className="card card-custom">
                <section className="card-body">
                  <form>
                    <main>
                      {this.state.validationErrorFlag ? (
                        <p style={{ color: "red" }} className="errorMsg">
                          {" "}
                          {this.state.errorMsg}{" "}
                        </p>
                      ) : null}
                    </main>

                    <h3 className="loginTitle">Login</h3>

                    <main className="form-group">
                      <label>Email address</label>
                      <input
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter email"
                      />
                    </main>

                    <main className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter password"
                      />
                    </main>

                    <div className="container text-center">
                      {
                        this.state.loading ?
                          <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={40}
                            width={40}
                            timeout={10000}
                          /> :
                          <button
                            onClick={this.onLoginSubmit}
                            type="submit"
                            className="btn btn-info btn-centre"
                          >
                            Login
                      </button>
                      }
                      <p />

                      <p className="register text-left">
                        Don't have account yet? Register{" "}
                        <a href="/register">here?</a>
                      </p>
                    </div>
                  </form>
                </section>
              </section>
            </section>
          </div>
        </div>
      </article>
    );
  }
}

export default Login;
