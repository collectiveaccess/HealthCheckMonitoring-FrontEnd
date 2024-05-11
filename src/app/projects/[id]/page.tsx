import Link from "next/link";
import { fetch_project, fetch_project_statuses } from "@/lib/db_utils";
import { Project, Status } from "@/types";

export default async function ProjectsDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await fetch_project(id);
  const statuses = await fetch_project_statuses(id);

  return (
    <main className="container">
      <h1>{project.name}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>URL</th>
            <td>
              <Link href={project.url}>{project.url}</Link>
            </td>
          </tr>
          <tr>
            <th>Notes</th>
            <td>{project.notes}</td>
          </tr>
          <tr>
            <th>Client</th>
            <td>{project.client_name}</td>
          </tr>
          <tr>
            <th>Cluster</th>
            <td>{project.cluster_name}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{project.status === 0 ? "down" : "up"}</td>
          </tr>
          <tr>
            <th>Slack alert</th>
            <td>{project.slack_alert === 0 ? "off" : "on"}</td>
          </tr>
          <tr>
            <th>Email alert</th>
            <td>{project.email_alert === 0 ? "off" : "on"}</td>
          </tr>
          <tr>
            <th>check frequency</th>
            <td>{project.check_frequency} minutes</td>
          </tr>
        </tbody>
      </table>
      <h2>Status History</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status) => (
            <tr key={status.id}>
              <td>
                <span
                  className={
                    status.status === 0
                      ? "p-1 text-danger-emphasis bg-danger-subtle"
                      : "p-1 text-success-emphasis bg-success-subtle"
                  }
                >
                  {status.status === 0 ? "down" : "up"}
                </span>
              </td>
              <td>{status.created_at}</td>
              <td>{status.error_message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
