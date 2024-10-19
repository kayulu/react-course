import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

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
    setProjectsState((prevProjectsState) => {
      const newProject = {
        ...project,
        id: Math.random(),
      };
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleDisplayProjectDetails(id) {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        projects: prevProjectsState.projects.filter(
          (project) => project.id !== prevProjectsState.selectedProjectId
        ),
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddTask(newTask) {
    newTask.id = Math.random();

    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        projects: prevProjectsState.projects.map((project) => {
          if (project.id === prevProjectsState.selectedProjectId) {
            return {
              ...project,
              tasks: [...project.tasks, newTask],
            };
          }
          return project;
        }),
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.map((project) => {
          if (project.id === prevState.selectedProjectId) {
            return {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            };
          }
          return project;
        }),
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onCreateNewProject={handleCreateNewProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onSaveNewProject={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else {
    content = (
      <SelectedProject
        projectState={projectsState}
        onDeleteProject={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onCreateNewProject={handleCreateNewProject}
        onDisplayProjectDetails={handleDisplayProjectDetails}
        projectsState={projectsState}
      />
      {content}
    </main>
  );
}

export default App;
