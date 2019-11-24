import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { connect } from "react-redux";

import APICaller from "utils/APICaller";
import { allTeams } from "utils/common";
import { updateLoadingAction } from "redux/actions/loading";
import { saveUser } from "redux/actions/user";

// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

const Profile = props => {
  const { username, email, favourite_team } = props.user;
  const [favourite, setFavourite] = useState(favourite_team);
  const [validationMsg, setValidationMsg] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);
  useEffect(() => {
    setFavourite(favourite_team);
  }, [favourite_team]);
  const handleSubmit = ev => {
    ev.preventDefault();

    const formData = {
      email,
      favourite_team: favourite
    };
    props.dispatch(updateLoadingAction(true));
    APICaller({
      method: "POST",
      reqUrl: "users/update",
      data: formData
    })
      .then(res => {
        props.dispatch(updateLoadingAction(false));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...props.user, favourite_team: favourite })
        );

        props.dispatch(saveUser({ ...props.user, favourite_team: favourite }));
        props.history.push("/home");
      })
      .catch(err => {
        props.dispatch(updateLoadingAction(false));
        setValidationMsg("Oops! something went wrong");
      });
  };

  return (
    <div className="Profile  Home">
      <div className="Profile_body ItemDetail_body">
        <h4 className="title">MY PROFILE</h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">User name</Label>
            <Input
              disabled
              type="text"
              name="username"
              maxLength={20}
              minLength={3}
              value={username}
              placeholder="Enter user name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              disabled
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
            />
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
          <Alert color="danger" isOpen={validationMsg ? true : false}>
            {validationMsg}
          </Alert>
          <Button
            color="secondary"
            type="submit"
            // className="Login_btn"
            style={{
              width: "100%",
              margin: "10px 0 20px",
              border: 0,
              fontWeight: "bold",
              backgroundColor: favourite_team
                ? allTeams[favourite_team].color
                : theme
            }}
          >
            SAVE
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};
export default connect(mapStateToProps)(Profile);
