import { forwardRef, useImperativeHandle, useRef, useState } from "react";

// 'forwardRef' is a utility function that wraps a functional component. 
// It receives a 'ref' to be passed from the parent that will 
// then be forwarded to an internal element.
 const ResultModal = forwardRef(({targetTime, timeLeft, reset}, ref) => {
    const dialogRef = useRef();
    const formattedTimeLeft = (timeLeft.current / 1000).toFixed(2);
    const score = Math.round((targetTime * 1000 - timeLeft.current) / 10);
    //const score = Math.round((1 - timeLeft.current / (targetTime * 1000)) * 100);
    const userLost = timeLeft.current <= 0;

    // second param () => ({ ... }) is an object
    // the fields of the object are functions we want to expose to parents
    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current.showModal()
    }));

    return (
        <dialog ref={dialogRef} className="result-modal" onClose={reset}>
            {userLost && <h2>You lose!</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>The target time was <strong>{targetTime}</strong> second{targetTime === 1 ? '' : 's'}.</p>
            <p>You stopped the timer with <strong>{formattedTimeLeft} seconds left.</strong></p>
            <form method="dialog" onSubmit={reset}>
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;