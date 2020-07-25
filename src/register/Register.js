import React, { Component } from "react";
// import AppHeader from "../AppHeader";
import "./Register.css";
import errMsg from "../errorMessages";
import { Modal, Button } from "react-bootstrap";
import { getOrgs, getEmailAvailibility, registerUser } from "./RegisterService";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      institution: "",
      securityQue: "",
      securityAns: "",
      validationErrorFlag: false,
      registrationFlag: false,
      errorMsg: "",
      modalFlag: false,
      orgs: [],
    };
  }

  async setupOrgs() {
    let orgs = await getOrgs()
    let partialState = {
      orgs
    }
    if(orgs.length > 0) {
      partialState.institution = orgs[0].id  
    }
    this.setState(partialState);
  }

  async checkEmailAvailable() {
    let { email } = this.state;
    let ava = await getEmailAvailibility(email);
    if (!ava.available) {
      this.setState({
        errorMsg: errMsg["6"],
        validationErrorFlag: true,
      });
    }
  }

  componentDidMount() {
    this.setupOrgs()
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMsg: "",
      validationErrorFlag: false,
    });
  };

  async apiCall() {
    try {
      let r = await registerUser(this.state)
      if(r.message === "OK") {
        alert(`User Created with name: ${r.displayName} and emailId: ${r.email} was created`)
        this.props.history.push("/login")
      } else if(r.message) {
        alert(r.message)
      }
    } catch (error) {
      alert("Something went wrong.")
    }
  }

  handleModalClose = (e) => {
    this.props.history.push("/login");
  };

  handleRegister = (e) => {
    e.preventDefault();
    this.setState({
      validationErrorFlag: false,
      errorMsg: "",
    });

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail = re.test(String(this.state.email).toLowerCase());

    if (
      this.state &&
      this.state.firstName &&
      this.state.lastName &&
      this.state.email &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.institution &&
      this.state.securityQue &&
      this.state.securityAns &&
      this.state !== {} &&
      this.state.firstName.trim() !== "" &&
      this.state.lastName.trim() !== "" &&
      this.state.email.trim() !== "" &&
      this.state.password.trim() !== "" &&
      this.state.confirmPassword.trim() !== "" &&
      this.state.securityQue.trim() !== "" &&
      this.state.securityAns.trim() !== ""
    ) {
      if (!validEmail) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["2"],
        });
        return;
      }

      if (this.state.password.trim() !== this.state.confirmPassword.trim()) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["5"],
        });
        return;
      }

      if (this.state.password.trim().length < 6) {
        this.setState({
          validationErrorFlag: true,
          errorMsg: errMsg["7"],
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
      <div className="container pt-4 pb-4">
        <div className="row ">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 col-md-6 signup-div border rounded">
                <div className="col-sm-12 ">
                  <form className="form-container">
                    {this.state.validationErrorFlag && (
                      <p className="errorMsg">{this.state.errorMsg}</p>
                    )}

                    <h3 className="registerTitle">Register</h3>

                    <section>
                      <summary className="form-group pt-2 pb-2">
                        <label>First Name*</label>

                        <input
                          required
                          type="name"
                          name="firstName"
                          onChange={this.handleOnChange}
                          value={this.state.firstName}
                          className="form-control text-field"
                          placeholder="Enter first name"
                          tabIndex="1"
                        />
                      </summary>

                      <summary className="form-group pt-2 pb-2">
                        <label>Last Name*</label>

                        <input
                          required
                          type="name"
                          name="lastName"
                          onChange={this.handleOnChange}
                          className="form-control text-field-right"
                          placeholder="Enter last name"
                          tabIndex="2"
                        />
                      </summary>

                      <summary className="form-group pt-2 pb-2">
                        <label>Email Address*</label>

                        <input
                          required
                          type="email"
                          name="email"
                          onChange={this.handleOnChange}
                          onBlur={_ => this.checkEmailAvailable()}
                          className="form-control text-field"
                          placeholder="Enter email address"
                          tabIndex="3"
                        />
                      </summary>
                      <summary className="form-group pt-2 pb-2">
                        <label>Institution*</label>

                        <select
                          required
                          type="select"
                          name="institution"
                          onChange={this.handleOnChange}
                          className="form-control text-field"
                          tabIndex="4"
                        >
                          {
                            this.state.orgs.map((org, i) =>
                              <option key={org.id} value={org.id}>{org.name}</option>
                            )
                          }
                        </select>
                      </summary>
                      <summary className="form-group pt-2 pb-2">
                        <label>Password*</label>

                        <input
                          required
                          type="password"
                          name="password"
                          onChange={this.handleOnChange}
                          className="form-control text-field"
                          placeholder="Enter password"
                          tabIndex="5"
                        />
                      </summary>
                      <summary className="form-group pt-2 pb-2">
                        <label>Confirm Password*</label>
                        <input
                          required
                          type="password"
                          name="confirmPassword"
                          onChange={this.handleOnChange}
                          className="form-control text-field-right"
                          placeholder="Enter password"
                          tabIndex="6"
                        />
                      </summary>

                      <summary className="form-group pt-2 pb-2">
                        <label>Security Question*</label>

                        <select
                          required
                          type="select"
                          name="securityQue"
                          onChange={this.handleOnChange}
                          className="form-control text-field"
                          tabIndex="8"
                        >
                          <option value="">Security Question</option>
                          <option value="What is your first pet name?">
                            What is your first pet name?
                          </option>
                          <option value="What is your favourite sport?">
                            What is your favourite sport?
                          </option>
                          <option value="What is your favourite color?">
                            What is your favourite color?
                          </option>
                          <option value="What is your favourite food?">
                            What is your favourite food?
                          </option>
                          <option value="What is your place of birth?">
                            What is your place of birth?
                          </option>
                        </select>
                      </summary>

                      <summary className="form-group pt-2 pb-2">
                        <label>Security Answer*</label>

                        <input
                          required
                          type="text"
                          name="securityAns"
                          onChange={this.handleOnChange}
                          className="form-control text-field-right"
                          placeholder="Enter Security Answer"
                          tabIndex="9"
                        />
                      </summary>

                      <summary className="form-group pt-2 pb-2">
                        <button
                          onClick={this.handleRegister}
                          type="submit"
                          className="btn btn-info btn-centre"
                        >
                          Register
                        </button>
                      </summary>
                      <p />

                      <p className="register text-left">
                        <a href="/login">Already have an account?</a>
                      </p>
                    </section>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={this.state.modalFlag} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Registration is success. Please login to access the application.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Register);
