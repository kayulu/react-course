import { EXAMPLES } from "../data.js";

export default function TabContent({ topic }) {
  // const currentTopic = topic == undefined ? null : topic.toLowerCase();
  const currentTopic = topic?.toLowerCase() || null;

  return !currentTopic || !EXAMPLES[currentTopic] ? (
    <h2>Select a topic</h2>
  ) : (
    <div id="tab-content">
      <h2>{EXAMPLES[currentTopic].title}</h2>
      <p>{EXAMPLES[currentTopic].description}</p>
      <pre>
        <code>{EXAMPLES[currentTopic].code}</code>
      </pre>
    </div>
  );
}
