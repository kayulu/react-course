import { forwardRef, useImperativeHandle, useRef } from "react";

// 'forwardRef' is a utility function that wraps a functional component. 
// It allows receives a 'ref' to be passed from the parent that will 
// then be forwarded to an internal element.
 const ResultModal = forwardRef(({result, targetTime}, ref) => {
    const dialogRef = useRef();

    // second param () => ({ ... }) is an object
    // the fields of the object are functions we want to expose to parents
    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current.showModal()
    }));

    return (
        <dialog ref={dialogRef} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;