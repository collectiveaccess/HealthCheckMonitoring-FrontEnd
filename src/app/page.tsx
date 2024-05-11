import Link from "next/link";
import { fetch_projects } from "@/lib/db_utils";
import { Project } from "@/types";

export default async function Home() {
  const projects = await fetch_projects();

  return (
    <main>
      <h1>Project Status</h1>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </td>
              <td>{project.status === 0 ? "down" : "up"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
