import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  // a place should be removed without confirmation after a timeout expires
  useEffect(() => {
    const timerId = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // this will run before the code provided to use effect runs again;
    // or right before this component unmounts
    return () => {
      clearTimeout(timerId);
    };
  }, [onConfirm]); // note: when props or states are used inside 'useEffect' add them as dependencies

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
        <ProgressBar timer={TIMER} />
      </div>
    </div>
  );
}
