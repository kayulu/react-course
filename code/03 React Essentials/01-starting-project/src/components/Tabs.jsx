import Tab from "./Tabs.jsx";
import TabContent from "./TabContent.jsx";

export default function Tabs({ buttons, children, Tag='menu' }) { //'menu' is the default
  return (
    <>
      <Tag>{buttons}</Tag>
      {children}
    </>
  );
}
