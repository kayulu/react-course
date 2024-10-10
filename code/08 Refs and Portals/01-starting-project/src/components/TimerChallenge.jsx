import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);

  const timer = useRef(null);
  const timeLeft = useRef(targetTime * 1000);
  const dialog = useRef();

  function handleStart() {
    timer.current = setInterval(() => {
      timeLeft.current -= 10;
      if (timeLeft.current <= 0) {
        handleStop();
      }
    }, 10);

    setTimerStarted(true);
  }

  function handleStop() {
    clearInterval(timer.current);
    setTimerStarted(false);
    dialog.current.open();
  }

  function handleReset() {
    timeLeft.current = targetTime * 1000;
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} timeLeft={timeLeft} reset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop " : "Start "} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
