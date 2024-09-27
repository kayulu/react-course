import UserInput from "./components/UserInput.jsx";
import Result from "./components/Result.jsx";
import { useState } from "react";
import { calculateInvestmentResults } from "./util/investment";

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

  const handleInputChange = (newValues) => {
    setInvestmentParams((previousParams) => ({
      ...previousParams, // keep the previous values
      ...newValues, // only update the new values
    }));
  };

  return (
    <main>
      <UserInput onInputChange={handleInputChange} params={investmentParams} />
      <Result currentResults={calculateInvestmentResults(investmentParams)} />
    </main>
  );
}
