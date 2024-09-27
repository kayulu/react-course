import { formatter } from "../util/investment";

export default function Result({ currentResults }) {
  return (
    <section>
      <table id="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {currentResults &&
            currentResults.map((result) => (
              <tr key={result.year}>
                <td>{formatter.format(result.year)}</td>
                <td>{formatter.format(result.valueEndOfYear)}</td>
                <td>{formatter.format(result.interest)}</td>
                <td>{formatter.format(result.totalInterest)}</td>
                <td>{formatter.format(result.investedCapital)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
