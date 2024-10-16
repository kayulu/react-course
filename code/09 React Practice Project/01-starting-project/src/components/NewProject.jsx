import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onSaveNewProject }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  const modalRef = useRef();

  function handleSave() {
    const enteredTitle = titleRef.current.value.trim();
    const enteredDescripton = descriptionRef.current.value.trim();
    const enteredDueDate = dueDateRef.current.value.trim();

    if (
      enteredTitle === "" ||
      enteredDescripton === "" ||
      enteredDueDate === ""
    ) {
      modalRef.current.setVisible();
    } else {
      onSaveNewProject({
        title: enteredTitle,
        description: enteredDescripton,
        dueDate: enteredDueDate,
      });
    }
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        {/*this makes the dialog reusable for other messages*/}
        <h2>Invalid Input</h2>
        <p>Oops ... looks like you forgot to enter a value.</p>
        <p>Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" label="Title" ref={titleRef} />
          <Input label="Description" textarea ref={descriptionRef} />
          <Input type="date" label="Due Date" ref={dueDateRef} />
        </div>
      </div>
    </>
  );
}
