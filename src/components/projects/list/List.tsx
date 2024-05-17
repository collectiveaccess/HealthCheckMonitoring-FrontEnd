"use client";

import { Project } from "@/types";
import { useState, useEffect } from "react";
import Link from "next/link";
import { formatProjectStatusClass, formatProjectStatus } from "@/lib/ui_utils";

type Prop = {
  projects: Project[];
};
export default function ProjectList(props: Prop) {
  const { projects } = props;
  const [displayProjects, setDisplayProjects] = useState<Project[]>(projects);
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/projects/`;

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        fetch(url)
          .then((res) => res.json())
          .then((json) => {
            setDisplayProjects(json);
          });
      },
      Number(process.env.NEXT_PUBLIC_UPDATE_FREQUENCY_MINUTES) * 60 * 1000,
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [url]);

  return (
    <main className="container">
      <h1>Project Status</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {displayProjects.map((project) => (
            <tr key={project.id}>
              <td>
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </td>
              <td>
                <span className={formatProjectStatusClass(project.status)}>
                  {formatProjectStatus(project.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
