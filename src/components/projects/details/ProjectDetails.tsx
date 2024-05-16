import ProjectInfo from "./ProjectInfo";
import ProjectStatus from "./ProjectStatus";
import { Project, Status } from "@/types";
import Link from "next/link";

type Props = {
  project: Project;
  statuses: Status[];
  statusesCount: number;
  perPage: number;
};

export default function ProjectDetail(props: Props) {
  const { project, statuses, statusesCount, perPage } = props;

  return (
    <main className="container">
      <h1>{project.name}</h1>
      <ProjectInfo project={project} />
      <div className="mb-3">
        <a href={`/projects/edit/${project.id}`}>Edit project</a>
      </div>
      <h2>Status History</h2>
      <ProjectStatus
        project={project}
        statuses={statuses}
        statusesCount={statusesCount}
        perPage={perPage}
      />
    </main>
  );
}
