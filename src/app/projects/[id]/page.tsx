import { fetch_project } from "@/lib/db_utils";
import ProjectDetail from "@/components/ProjectDetails/ProjectDetails";
import { headers } from "next/headers";
import { DEFAULT_PER_PAGE } from "@/data/constants";

export default async function ProjectsDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await fetch_project(id);
  if (project === undefined) {
    return (
      <main className="container">
        <p>Invalid project id</p>
      </main>
    );
  }

  const offset = 0;
  const perPage = Number(process.env.NEXT_PUBLIC_PER_PAGE) || DEFAULT_PER_PAGE;
  const headersList = headers() as any;
  const host = headersList.headers.host;
  const proto = headersList.headers["x-forwarded-proto"];
  const url = `${proto}://${host}/api/project_status/${project.id}?offset=${offset}`;

  const res = await fetch(url);
  const json = await res.json();

  return (
    <ProjectDetail
      project={project}
      statuses={json.data}
      statusesCount={json.count}
      perPage={perPage}
    />
  );
}
