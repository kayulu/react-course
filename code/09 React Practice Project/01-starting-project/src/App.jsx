import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleCreateNewProject() {
    setProjectsState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null,
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onCreateNewProject={handleCreateNewProject} />;
  } else if(projectsState.selectedProjectId === null) {
    content = <NewProject />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onCreateNewProject={handleCreateNewProject} />
      {content}
    </main>
  );
}

export default App;
