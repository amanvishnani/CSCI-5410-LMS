import React, { Component } from "react";
import "./Login.css";
import errMsg from "../errorMessages";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      validationErrorFlag: false,
      loginFlag: false,
      errorMsg: "",
    };
  }

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      validationErrorFlag: false,
      errorMsg: "",
    });
  };

  async apiCall() {
    try {
      console.log("loing worked");
      this.props.history.push("/home");
    } catch (err) {
      this.setState({
        validationErrorFlag: true,
        errorMsg: errMsg["1"],
      });
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
                      <button
                        onClick={this.onLoginSubmit}
                        type="submit"
                        className="btn btn-info btn-centre"
                      >
                        Login
                      </button>
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
