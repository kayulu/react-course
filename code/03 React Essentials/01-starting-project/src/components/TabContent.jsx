import { EXAMPLES } from "../data.js";

export default function TabContent({ topic }) {
  return !topic ? (
    <h2>Select a topic</h2>
  ) : (
    <div id="tab-content">
      <h2>{EXAMPLES[topic].title}</h2>
      <p>{EXAMPLES[topic].description}</p>
      <pre>
        <code>{EXAMPLES[topic].code}</code>
      </pre>
    </div>
  );
}
