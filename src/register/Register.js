import React, { Component } from "react";
import AppHeader from "../AppHeader";
import "./Register.css";
import errMsg from "../errorMessages";
import { Modal, Button } from "react-bootstrap";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
      institution: "",
      securityQue: "",
      securityAns: "",
      validationErrorFlag: false,
      registrationFlag: false,
      errorMsg: "",
      modalFlag: false,
    };
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
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        institution: "",
        contact: "",
        securityQue: "",
        securityAns: "",
        registrationFlag: true,
        modalFlag: true,
      });
    } catch (err) {
      this.setState({
        errorMsg: errMsg["4"],
        validationErrorFlag: true,
      });
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
      this.state.contact &&
      this.state.securityQue &&
      this.state.securityAns &&
      this.state !== {} &&
      this.state.firstName.trim() !== "" &&
      this.state.lastName.trim() !== "" &&
      this.state.email.trim() !== "" &&
      this.state.password.trim() !== "" &&
      this.state.confirmPassword.trim() !== "" &&
      this.state.institution.trim() !== "" &&
      this.state.contact.trim() !== "" &&
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
                          <option value="">select</option>
                          <option value="1">Dal</option>
                          <option value="2">St.Marys</option>
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
                        <label>Contact*</label>

                        <input
                          required
                          type="text"
                          name="contact"
                          onChange={this.handleOnChange}
                          className="form-control text-field-right"
                          placeholder="Enter contact number"
                          tabIndex="7"
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

export default Register;
