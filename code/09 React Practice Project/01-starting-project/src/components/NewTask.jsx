import Modal from "./Modal";

import { useRef, useState } from "react";

export default function NewTask({ onAddTask }) {
  const [title, setTitle] = useState("");
  const modalRef = useRef();

  function handleSave() {
    if (title === "") {
      modalRef.current.setVisible();
    } else {
      onAddTask({
        taskTitle: title,
      });
      setTitle("");
    }
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        {/*this makes the dialog reusable for other messages*/}
        <h2 className="text-sl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Please enter a title for the task.
        </p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value.trim())}
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleSave}
        >
          Add New
        </button>
      </div>
    </>
  );
}
