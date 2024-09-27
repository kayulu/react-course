import UserInput from "./components/UserInput.jsx";
import Result from "./components/Result.jsx";
import { useState } from "react";


let INVESTMENT_PARAMETERS = {
  initialInvestment: 10000,
  annualInvestment: 500,
  expectedReturn: 5.0,
  duration: 10,
};

export default function App() {
  const [investmentParams, setInvestmentParams] = useState(
    INVESTMENT_PARAMETERS
  );

  let inputIsValid = investmentParams.duration >= 1;

  function handleChange(event) {
    let {id, value} = event.target;

    setInvestmentParams( (previousParams) => {
      return {
        ...previousParams,
        [id]: +value  // + operator to convert a string to a number
      }
    });
  }

  return (
    <main>
      <UserInput onInputChange={handleChange} params={investmentParams} />
      {!inputIsValid && <p className="center">Please enter valid data.</p>}
      {inputIsValid && <Result params={investmentParams} />}
    </main>
  );
}
