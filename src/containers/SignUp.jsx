import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { isValidEmail, isValidPassword, isEmptyString } from "utils/validators";
import APICaller from "utils/APICaller";
import { allTeams } from "utils/common";
import { updateLoadingAction } from "redux/actions/loading";

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [validationUsernameMsg, setValidationUsernameMsg] = useState(false);
  const [favourite, setFavourite] = useState("Sunrisers Hyderabad");
  const [email, setEmail] = useState("");
  const [validationEmailMsg, setValidationEmailMsg] = useState(false);
  const [password, setPassword] = useState("");
  const [validationPasswordMsg, setValidationPasswordMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);

  const handleSubmit = ev => {
    ev.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const formData = {
        email,
        password,
        username,
        favourite_team: favourite
      };
      // this.props.onSubmit(formData);
      props.dispatch(updateLoadingAction(true));
      APICaller({
        method: "POST",
        reqUrl: "users/signup",
        data: formData
      })
        .then(res => {
          props.dispatch(updateLoadingAction(false));
          props.history.push("/login");
        })
        .catch(err => {
          props.dispatch(updateLoadingAction(false));
          const {
            data: {
              errors: { email = "", username = "" }
            }
          } = err.response;
          if (email) {
            setValidationEmailMsg("Email already registered");
          }
          if (username) {
            setValidationUsernameMsg(username);
          } else {
            setValidationMsg("Oops! something went wrong");
          }
        });
    }
  };

  const validateForm = touchedElem => {
    let hasInValidEmail = "",
      hasInValidPassword = "",
      hasInValidUsername = "";
    if (!touchedElem) {
      hasInValidEmail = isValidEmail(email);
      hasInValidPassword = isValidPassword(password);
      hasInValidUsername = isEmptyString(username);
      setValidationEmailMsg(hasInValidEmail);
      setValidationPasswordMsg(hasInValidPassword);
      setValidationUsernameMsg(hasInValidUsername);
    } else {
      setValidationEmailMsg(false);
      setValidationPasswordMsg(false);
      setValidationUsernameMsg(false);
    }
    if (
      !email ||
      !password ||
      hasInValidEmail ||
      hasInValidPassword ||
      hasInValidUsername
    ) {
      return false;
    }
    return true;
  };

  const handleInputChange = ev => {
    if (ev.target.name === "email") {
      setEmail(ev.target.value);
    } else if (ev.target.name === "username") {
      setUsername(ev.target.value);
    } else {
      setPassword(ev.target.value);
    }
    validateForm(ev.target.name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal isOpen={isModalOpen} toggle={() => {}} className="Login" centered>
      <ModalBody className="Login_body">
        <h2 className="title">ACCOUNT SIGN UP</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">User name</Label>
            <Input
              invalid={validationUsernameMsg ? true : false}
              type="text"
              onChange={handleInputChange}
              name="username"
              maxLength={20}
              minLength={3}
              value={username}
              placeholder="Enter user name"
            />
            <FormFeedback>
              {validationUsernameMsg ? validationUsernameMsg : ""}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="favouriteTeam">Favourite team</Label>
            <Input
              type="select"
              name="favourite"
              id="favourite"
              placeholder="Select favourite team"
              onChange={event => {
                setFavourite(event.target.value);
              }}
              value={favourite}
            >
              {Object.keys(allTeams).map((teamName, key) => (
                <option key={key}>{teamName}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              invalid={validationEmailMsg ? true : false}
              type="email"
              onChange={handleInputChange}
              name="email"
              value={email}
              placeholder="Enter email"
            />
            <FormFeedback>
              {validationEmailMsg ? validationEmailMsg : ""}
            </FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="password">Pasword</Label>
            <Input
              invalid={validationPasswordMsg ? true : false}
              type="password"
              onChange={handleInputChange}
              name="password"
              maxLength={100}
              minLength={6}
              value={password}
              placeholder="Enter password"
            />
            <FormFeedback>
              {validationPasswordMsg ? validationPasswordMsg : ""}
            </FormFeedback>
          </FormGroup>
          <div>
            <div>Your password must contain:</div>
            <ul>
              <li>At least six characters</li>
              <li>At least one number</li>
              <li>At least a capital letter</li>
              <li>At least a lower case letter</li>
              <li>At least a special character</li>
            </ul>
          </div>
          <Alert color="danger" isOpen={validationMsg ? true : false}>
            {validationMsg}
          </Alert>
          <Button color="secondary" type="submit" className="Login_btn">
            Sign Up
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter className="Login_footer">
        Already have an account ?
        <Link to="/login" style={{ padding: "5px 10px" }}>
          login
        </Link>
      </ModalFooter>
    </Modal>
  );
}
export default connect()(SignUp);
