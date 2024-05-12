import ProjectInfo from "@/components/ProjectDetails/ProjectInfo";
import ProjectStatus from "@/components/ProjectDetails/ProjectStatus";
import { Project, Status } from "@/types";

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
