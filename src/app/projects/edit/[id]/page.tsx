import React from "react";
import { fetch_project } from "@/lib/db_utils";
import ProjectEdit from "@/components/projects/edit/ProjectEdit";

export default async function ProjectsEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/projects/${id}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const project = await res.json();

  if (project.error) {
    return (
      <main className="container">
        <p>Invalid project id</p>
      </main>
    );
  }

  return <ProjectEdit project={project} />;
}
