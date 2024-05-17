import Link from "next/link";
import { Project } from "@/types";
import { formatProjectStatus, formatProjectStatusClass } from "@/lib/ui_utils";

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
          <th>Client name</th>
          <td>{project.client_name}</td>
        </tr>
        <tr>
          <th>Cluster name</th>
          <td>{project.cluster_name}</td>
        </tr>
        <tr>
          <th>Email notification</th>
          <td>{project.email_alert === 0 ? "off" : "on"}</td>
        </tr>
        <tr>
          <th>Slack notification</th>
          <td>{project.slack_alert === 0 ? "off" : "on"}</td>
        </tr>
        <tr>
          <th>check frequency</th>
          <td>{project.check_frequency} minutes</td>
        </tr>
      </tbody>
    </table>
  );
}
