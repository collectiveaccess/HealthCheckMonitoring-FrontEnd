import { fetch_projects } from "@/lib/db_utils";
import ProjectList from "@/components/ProjectsList/List";

export default async function HomePage() {
  const projects = await fetch_projects();

  return <ProjectList projects={projects} />;
}
