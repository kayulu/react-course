import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // a place should be removed without confirmation after a timeout expires
  useEffect(() => {
    console.log("TIMER SET");

    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    // this will run before the code provided to use effect runs again;
    // or right before this component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

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
      </div>
    </div>
  );
}
