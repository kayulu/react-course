import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";
import TabButton from "./components/TabButton.jsx";
import TabContent from "./components/TabContent.jsx";

import { CORE_CONCEPTS } from "./data.js";

import { useState } from "react";

function App() {
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
        onSelect={() => handleSelect(item)}
        isActive={selectedTopic === item}
      >
        {item}
      </TabButton>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((item) => (
              <CoreConcept key={item.title} {...item} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>{tabButtons}</menu>
          <TabContent topic={selectedTopic}></TabContent>
        </section>
      </main>
    </>
  );
}

export default App;
