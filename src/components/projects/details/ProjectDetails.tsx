import ProjectInfo from "./ProjectInfo";
import ProjectStatus from "./ProjectStatus";
import { Project, Status } from "@/types";
import DeleteProjectModal from "./DeleteProjectModal";

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
        <a
          className="btn btn-primary me-3"
          href={`/projects/edit/${project.id}`}
        >
          Edit Project
        </a>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Delete Project
        </button>
        <DeleteProjectModal project={project} />
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
