import React from "react";
import { fetch_project } from "@/lib/db_utils";
import ProjectEdit from "@/components/projects/edit/ProjectEdit";

export default async function ProjectsEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await fetch_project(id);
  if (project === undefined) {
    return (
      <main className="container">
        <p>Invalid project id</p>
      </main>
    );
  }

  return <ProjectEdit project={project} />;
}
