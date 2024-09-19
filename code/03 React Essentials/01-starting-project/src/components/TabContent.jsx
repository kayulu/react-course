export default function TabContent({ topic }) {
  console.log(topic);
  return (
    <div id="tab-content">
      <h2>{topic.title}</h2>
      <p>{topic.description}</p>
      <pre>
        <code>{topic.code}</code>
      </pre>
    </div>
  );
}
