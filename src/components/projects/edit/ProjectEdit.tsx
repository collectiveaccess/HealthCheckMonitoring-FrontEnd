import React from "react";
import ProjectForm from "./ProjectForm";
import { Project } from "@/types";

type Props = {
  project: Project;
};
export default function ProjectNew(props: Props) {
  const { project } = props;

  return (
    <main className="container">
      <h1>Edit Project</h1>
      <ProjectForm project={project} />
    </main>
  );
}
