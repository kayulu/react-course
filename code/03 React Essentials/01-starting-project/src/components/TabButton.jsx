// note:  usage of object-destructuring; TabButton({children, onSelect}) tells 
// React to destructure the 'props' object into its parts when passed

// const props = {
//     children: "Click Me!", // The content inside the component (passed implicitly)
//     onSelect: handleSelect // The function passed to the onSelect prop
// };
export default function TabButton({children, onSelect}) {
  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}
