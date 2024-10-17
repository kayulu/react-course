import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  // called in 'NoProjectSelected'
  // Sets 'selectedProjectId' to null so that 'NewProject' component will be selected (see below)
  function handleCreateNewProject() {
    setProjectsState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null,
      };
    });
  }

  // called in 'NewProject'
  // adds the project to the array.
  function handleAddProject(project) {
    setProjectsState(prevProjectsState => {
      const newProject = {
        ...project,
        id: Math.random()
      }
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject]
      }
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevProjectsState => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined
      }
    })
  }

  let content;

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onCreateNewProject={handleCreateNewProject} />;
  } else if(projectsState.selectedProjectId === null) {
    content = <NewProject onSaveNewProject={handleAddProject} onCancel={handleCancelAddProject} />;
  } 

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onCreateNewProject={handleCreateNewProject} projects={projectsState.projects} />
      {content}
    </main>
  );
}

export default App;
