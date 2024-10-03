import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import CustomInput from "./CustomInput"

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background-color: ${(props) => (props.primary ? "blue" : "")};
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlsContainer>
        <CustomInput
          label="Email"
          invalid={emailNotValid}
          type="email"
          onChange={(event) => handleInputChange("email", event.target.value)}
        />
        <CustomInput
          label="Password"
          invalid={passwordNotValid}
          type="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
      </ControlsContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
