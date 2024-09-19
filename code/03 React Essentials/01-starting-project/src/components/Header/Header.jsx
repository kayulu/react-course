import reactImg from "../../assets/react-core-concepts.png";
import "./Header.css";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];

export default function Header() {
  const description = reactDescriptions[genRandomInt(2)];

  return (
    <div>
      <header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {reactDescriptions[genRandomInt(2)]} React concepts you will need for
          almost any app you are going to build!
        </p>
      </header>
    </div>
  );
}

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}
