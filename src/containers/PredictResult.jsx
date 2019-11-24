import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  Alert,
  CustomInput
} from "reactstrap";
import { connect } from "react-redux";

import APICaller from "utils/APICaller";
import { allTeams, allVenue } from "utils/common";
import { updateLoadingAction } from "redux/actions/loading";
import { isEmptyString } from "utils/validators";

// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

const PredictResult = props => {
  const { favourite_team } = props;
  const [firstTeam, setFirstTeam] = useState("");
  const [validationFirstTeamMsg, setValidationFirstTeamMsg] = useState(false);
  const [secondTeam, setSecondTeam] = useState("");
  const [validationSecondTeamMsg, setValidationSecondTeamMsg] = useState(false);
  const [venu, setVenu] = useState("");
  const [validationVenuMsg, setValidationVenuMsg] = useState(false);
  const [tossWinner, setTossWinner] = useState("");
  const [validationTossWinnerMsg, setValidationTossWinnerMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  const [result, setResult] = useState("");
  const onDismiss = () => setResult("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

  const handleSubmit = ev => {
    ev.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      const formData = {
        team1: firstTeam,
        team2: secondTeam,
        venu,
        toss_winner: tossWinner
      };
      var urlParms = Object.entries(formData)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");

      props.dispatch(updateLoadingAction(true));
      setResult("");
      APICaller({
        method: "GET",
        reqUrl: `posts/predict?${urlParms}`
      })
        .then(res => {
          props.dispatch(updateLoadingAction(false));
          [firstTeam, secondTeam].includes(res.data)
            ? setResult(res.data)
            : setResult(tossWinner);
        })
        .catch(err => {
          props.dispatch(updateLoadingAction(false));
          setValidationMsg("Oops! something went wrong");
        });
    }
  };

  const validateForm = touchedElem => {
    let hasInValidFirstTeam = "",
      hasInValidSecondTeam = "",
      hasInValidVenu = "",
      hasInValidTossWinner = "";
    if (!touchedElem) {
      hasInValidFirstTeam = isEmptyString(firstTeam);
      hasInValidSecondTeam = isEmptyString(secondTeam);
      hasInValidVenu = isEmptyString(venu);
      hasInValidTossWinner = isEmptyString(tossWinner);
      setValidationFirstTeamMsg(hasInValidFirstTeam);
      setValidationSecondTeamMsg(hasInValidSecondTeam);
      setValidationVenuMsg(hasInValidVenu);
      setValidationTossWinnerMsg(hasInValidTossWinner);
    } else {
      setValidationFirstTeamMsg(false);
      setValidationSecondTeamMsg(false);
      setValidationVenuMsg(false);
      setValidationTossWinnerMsg(false);
    }
    if (
      !firstTeam ||
      !secondTeam ||
      !venu ||
      !tossWinner ||
      hasInValidFirstTeam ||
      hasInValidSecondTeam ||
      hasInValidVenu ||
      hasInValidTossWinner
    ) {
      return false;
    }
    return true;
  };
  let secondTeamOption = Object.keys(allTeams).filter(
    team => team !== firstTeam
  );
  return (
    <div className="Profile  Home">
      <div className="Profile_body ItemDetail_body">
        <h4 className="title">PREDICT RESULT</h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="favouriteTeam">First Team</Label>
            <CustomInput
              invalid={validationFirstTeamMsg ? true : false}
              type="select"
              name="firstTeam"
              id="firstTeam"
              onChange={event => {
                setFirstTeam(event.target.value);
                if (event.target.value === secondTeam) {
                  setSecondTeam("");
                }
                validateForm(event.target.name);
              }}
              value={firstTeam}
            >
              <option value="">Slect first team</option>
              {Object.keys(allTeams).map((teamName, key) => (
                <option key={key}>{teamName}</option>
              ))}
            </CustomInput>
            <FormFeedback>
              {validationFirstTeamMsg ? validationFirstTeamMsg : ""}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="favouriteTeam">Second team</Label>
            <CustomInput
              invalid={validationSecondTeamMsg ? true : false}
              type="select"
              name="secondTeam"
              id="secondTeam"
              onChange={event => {
                setSecondTeam(event.target.value);
                validateForm(event.target.name);
              }}
              value={secondTeam}
            >
              <option value="">Select second team</option>
              {secondTeamOption.map((teamName, key) => (
                <option key={key}>{teamName}</option>
              ))}
            </CustomInput>
            <FormFeedback>
              {validationSecondTeamMsg ? validationSecondTeamMsg : ""}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="favouriteTeam">Venu</Label>
            <CustomInput
              invalid={validationVenuMsg ? true : false}
              type="select"
              name="venu"
              id="venu"
              onChange={event => {
                setVenu(event.target.value);
                validateForm(event.target.name);
              }}
              value={venu}
            >
              <option value="">Select venue</option>
              {allVenue.map((venuName, key) => (
                <option key={key}>{venuName}</option>
              ))}
            </CustomInput>
            <FormFeedback>
              {validationVenuMsg ? validationVenuMsg : ""}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="favouriteTeam">Toss winner team</Label>
            <CustomInput
              invalid={validationTossWinnerMsg ? true : false}
              type="select"
              name="tossWinner"
              id="tossWinner"
              onChange={event => {
                setTossWinner(event.target.value);
                validateForm(event.target.name);
              }}
              value={tossWinner}
            >
              <option value="">
                {firstTeam && secondTeam
                  ? "Select toss winner team"
                  : "First select team1 and team2"}
              </option>
              {firstTeam && secondTeam
                ? [firstTeam, secondTeam].map((teamName, key) => (
                    <option key={key}>{teamName}</option>
                  ))
                : void 0}
            </CustomInput>
            <FormFeedback>
              {validationTossWinnerMsg ? validationTossWinnerMsg : ""}
            </FormFeedback>
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
            PREDICT
          </Button>
        </Form>
        <Alert color="success" isOpen={result} toggle={onDismiss}>
          <h4 className="alert-heading">Chances of winning</h4>
          <hr />
          <p className="mb-0">{result}</p>
        </Alert>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    favourite_team: state.userReducer.favourite_team
  };
};
export default connect(mapStateToProps)(PredictResult);
