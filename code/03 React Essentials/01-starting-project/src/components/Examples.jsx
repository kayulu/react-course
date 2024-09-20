import { useState } from "react";

import Section from "./Section";
import TabContent from "./TabContent";
import TabButton from "./TabButton";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  const topics = ["Components", "JSX", "Props", "State"];
  const tabButtons = [];

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
  }

  // could also be done using 'map'
  for (const item of topics) {
    tabButtons.push(
      <TabButton
        key={item}
        onClick={() => handleSelect(item)}
        isActive={selectedTopic === item}
      >
        {item}
      </TabButton>
    );
  }

  return (
    <Section id="examples" title="Examples">
      <menu>{tabButtons}</menu>
      <TabContent topic={selectedTopic}></TabContent>
    </Section>
  );
}
