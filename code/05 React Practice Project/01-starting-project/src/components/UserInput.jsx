import { useState } from "react";

export default function UserInput() {
  return (
    <section id="user-input">
      <div className="input-group">
        <div>
          <label htmlFor="initInvest">Initial Investment</label>
          <input className="user-input" id="initInvest" type="number" />
        </div>
        <div>
          <label htmlFor="anualInvest">Anual Investment</label>
          <input className="user-input" id="anualInvest" type="number" />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="expectedReturn">Expected Return</label>
          <input className="user-input" id="expectedReturn" type="number" />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input className="user-input" id="duration" type="number" />
        </div>
      </div>
    </section>
  );
}
