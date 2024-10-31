import { useEffect, useState } from "react";

const ProgressBar = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const intervalId = setInterval((prevRemainingTime) => {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
      }, 10);
    return () => {clearInterval(intervalId)};
  }, []);

  return (
    <div>
      <progress value={remainingTime} max={timer} />
    </div>
  );
};

export default ProgressBar;
