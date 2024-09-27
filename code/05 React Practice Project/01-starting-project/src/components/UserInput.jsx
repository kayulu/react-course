export default function UserInput({ onInputChange, params}) {

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initialInvestment">Initial Investment</label>
          <input
            className="user-input"
            id="initialInvestment"
            type="number"
            step={500}
            value={params.initialInvestment}
            onChange={(event) => onInputChange(event)}
            required
          />
        </p>
        <p>
          <label htmlFor="annualInvestment">Annual Investment</label>
          <input
            className="user-input"
            id="annualInvestment"
            type="number"
            step={100}
            value={params.annualInvestment}
            onChange={(event) => onInputChange(event)}
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
            step={0.1}
            value={params.expectedReturn}
            onChange={(event) => onInputChange(event)}
            required
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            className="user-input"
            id="duration"
            type="number"
            value={params.duration}
            onChange={(event) => onInputChange(event)}
            required
          />
        </p>
      </div>
    </section>
  );
}
