export default function UserInput({ onInputChange, params }) {
  let investmentParams = params;

  function handleChange(event) {
    let id = event.target.id;
    let newValues = null;

    if (id === "expectedReturn") {
      newValues = {
        ...params,
        [id]: parseFloat(event.target.value),
      };
    } else {
      newValues = {
        ...params,
        [id]: parseInt(event.target.value),
      };
    }

    onInputChange(newValues);
  }

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initialInvestment">Initial Investment</label>
          <input
            className="user-input"
            id="initialInvestment"
            type="number"
            value={investmentParams.initialInvestment}
            onChange={(event) => handleChange(event)}
            required
          />
        </p>
        <p>
          <label htmlFor="annualInvestment">Annual Investment</label>
          <input
            className="user-input"
            id="annualInvestment"
            type="number"
            value={investmentParams.annualInvestment}
            onChange={(event) => handleChange(event)}
            required
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expectedReturn">Expected Return</label>
          <input
            className="user-input"
            id="expectedReturn"
            type="number"
            value={investmentParams.expectedReturn}
            onChange={(event) => handleChange(event)}
            required
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            className="user-input"
            id="duration"
            type="number"
            value={investmentParams.duration}
            onChange={(event) => handleChange(event)}
            required
          />
        </p>
      </div>
    </section>
  );
}
