import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ children, buttonCaption }, ref) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    setVisible() {
      dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog ref={dialog} className="">
      {children}
      <form method="dialog">
        <button onClick={() => dialog.current.close()}>{buttonCaption}</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});
export default Modal;
