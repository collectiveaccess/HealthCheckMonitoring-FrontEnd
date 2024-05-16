import ProjectDetail from "@/components/projects/details/ProjectDetails";
import { DEFAULT_PER_PAGE } from "@/data/constants";

type Params = {
  params: { id: string };
};

export default async function ProjectsDetailPage({ params: { id } }: Params) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/projects/${id}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const project = await res.json();

  if (project.error) {
    return (
      <main className="container">
        <p>Invalid project id</p>
      </main>
    );
  }

  const offset = 0;
  const perPage = Number(process.env.NEXT_PUBLIC_PER_PAGE) || DEFAULT_PER_PAGE;
  const url2 = `${process.env.NEXT_PUBLIC_API_BASE}/project_status/${project.id}?offset=${offset}`;
  const res2 = await fetch(url2);
  const statuses = await res2.json();

  return (
    <ProjectDetail
      project={project}
      statuses={statuses.data}
      statusesCount={statuses.count}
      perPage={perPage}
    />
  );
}
