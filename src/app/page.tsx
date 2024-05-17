import ProjectList from "@/components/projects/list/List";

export default async function HomePage() {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/projects`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const projects = await res.json();

  console.log("home page loaded:", projects.length);

  return <ProjectList projects={projects} />;
}
