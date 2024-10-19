import Button from "./Button";
import NewTask from "./NewTask";
import TasksPanel from "./TasksPanel";

export default function SelectedProject({
  projectState,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
}) {
  const id = projectState.selectedProjectId;
  const projects = projectState.projects;

  let project = projects.find((project) => project.id === id);

  const formattedDate = new Date(project.dueDate).toLocaleDateString("de-De", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={onDeleteProject}
          >
            Delete
          </button>
        </div>

        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <section>
        <h2 className="text-2xl font-bold text-stone-700 my-4">Tasks</h2>
        <NewTask onAddTask={onAddTask} />
        {project.tasks && project.tasks.length > 0 ? (
          <TasksPanel onDeleteTask={onDeleteTask} tasks={project.tasks} />
        ) : (
          <p>No tasks available</p>
        )}
      </section>
    </div>
  );
}
