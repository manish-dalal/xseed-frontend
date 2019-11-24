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
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { isValidEmail, isEmptyString } from "utils/validators";
import APICaller from "utils/APICaller";
import { updateLoadingAction } from "redux/actions/loading";
import { saveUser } from "redux/actions/user";

function Login(props) {
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
        password
      };
      // this.props.onSubmit(formData);
      props.dispatch(updateLoadingAction(true));
      APICaller({
        method: "POST",
        reqUrl: "users/login",
        data: formData
      })
        .then(res => {
          delete res.data._id;
          localStorage.setItem("user", JSON.stringify(res.data));
          props.dispatch(saveUser(res.data));
          props.dispatch(updateLoadingAction(false));

          props.history.push("/home");
        })
        .catch(err => {
          props.dispatch(updateLoadingAction(false));
          if (err.response.data === "Unauthorized") {
            setValidationMsg("Oops! Wrong email or password.");
          } else {
            setValidationMsg("Oops! something went wrong");
          }
        });
    }
  };

  const validateForm = touchedElem => {
    let hasInvalidEmail = "",
      hasInvalidPassword = "";
    if (!touchedElem) {
      hasInvalidEmail = isValidEmail(email);
      hasInvalidPassword = isEmptyString(password);
      setValidationEmailMsg(hasInvalidEmail);
      setValidationPasswordMsg(hasInvalidPassword);
    } else {
      setValidationEmailMsg(false);
      setValidationPasswordMsg(false);
    }
    if (!email || !password || hasInvalidEmail || hasInvalidPassword) {
      return false;
    }
    return true;
  };

  const handleInputChange = ev => {
    if (ev.target.name === "email") {
      setEmail(ev.target.value);
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
        <h2 className="title">ACCOUNT LOGIN</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              invalid={validationEmailMsg ? true : false}
              type="email"
              onChange={handleInputChange}
              name="email"
              value={email}
              maxLength={20}
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
              value={password}
              placeholder="Enter password"
            />
            <FormFeedback>
              {validationPasswordMsg ? validationPasswordMsg : ""}
            </FormFeedback>
          </FormGroup>
          <Alert color="danger" isOpen={validationMsg ? true : false}>
            {validationMsg}
          </Alert>
          <Button color="secondary" type="submit" className="Login_btn">
            Login
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter className="Login_footer">
        Don't have an account yet ?
        <Link to="/signup" style={{ padding: "5px 10px" }}>
          Sign up
        </Link>
      </ModalFooter>
    </Modal>
  );
}

export default connect()(Login);
