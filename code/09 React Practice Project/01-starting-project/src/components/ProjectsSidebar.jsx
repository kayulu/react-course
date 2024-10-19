import Button from "./Button";

export default function ProjectsSidebar({
  onCreateNewProject,
  onDisplayProjectDetails,
  projectsState,
}) {
  let buttonClasses =
    "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onCreateNewProject}>+ Add New</Button>
      </div>
      <ul className="mt-8">
        {projectsState.projects.map((project) => {
          let cssClasses =
            project.id === projectsState.selectedProjectId
              ? buttonClasses + " text-stone-200 bg-stone-800"
              : buttonClasses + " text-stone-400";

          return (
            <li key={project.id}>
              <Button
                className={cssClasses}
                onClick={() => onDisplayProjectDetails(project.id)}
              >
                {project.title}
              </Button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
