import Tab from "./Tabs.jsx";
import TabContent from "./TabContent.jsx";

export default function Tabs({ buttons, children }) {
  return (
    <>
      <menu>{buttons}</menu>
      {children}
    </>
  );
}
