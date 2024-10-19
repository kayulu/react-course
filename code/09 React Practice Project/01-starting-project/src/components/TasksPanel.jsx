export default function TasksPanel({ tasks, onDeleteTask }) {
  return (
    <section>
      {tasks && tasks.length > 0 ? (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-1">
              <span>{task.taskTitle}</span>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="rounded-md p-1 text-stone-700 hover:text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-stone-800 mb-4">
          This project does not have any tasks yet.
        </p>
      )}
    </section>
  );
}
