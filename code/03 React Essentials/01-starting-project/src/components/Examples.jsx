import { useState } from "react";

import Section from "./Section";
import TabContent from "./TabContent";
import TabButton from "./TabButton";
import Tabs from "./Tabs";

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
      <Tabs buttons={tabButtons}>
        <TabContent topic={selectedTopic}></TabContent>
      </Tabs>
    </Section>
  );
}
