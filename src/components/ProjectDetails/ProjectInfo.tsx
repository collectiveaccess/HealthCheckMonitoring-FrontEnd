import Link from "next/link";
import { Project } from "@/types";

type Props = {
  project: Project;
};

export default function ProjectInfo(props: Props) {
  const { project } = props;

  return (
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
  );
}
