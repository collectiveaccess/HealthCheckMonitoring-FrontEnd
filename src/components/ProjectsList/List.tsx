import { Project } from "@/types";
import Link from "next/link";

type Prop = {
  projects: Project[];
};
export default function ProjectList(props: Prop) {
  const { projects } = props;

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
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </td>
              <td>
                <span
                  className={
                    project.status === 0
                      ? "p-1 text-danger-emphasis bg-danger-subtle"
                      : "p-1 text-success-emphasis bg-success-subtle"
                  }
                >
                  {project.status === 0 ? "down" : "up"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
