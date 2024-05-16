import { NextRequest, NextResponse } from "next/server";
import { update_project, fetch_project } from "@/lib/db_utils";
import { NewProject } from "@/types";

type Params = {
  params: { project_id: string };
};
export async function PUT(request: NextRequest, { params }: Params) {
  const body = (await request.json()) as NewProject;
  const projectId = params.project_id;
  console.log("PUT > body:", body);

  let result = update_project(
    Number(projectId),
    body.name,
    body.url,
    body.notes,
    body.client_name,
    body.cluster_name,
    body.slack_alert,
    body.email_alert,
    body.check_frequency,
  );

  return Response.json({ message: "project updated", result });
}

export async function GET(request: NextRequest, { params }: Params) {
  const projectId = params.project_id;
  let result = fetch_project(projectId);
  console.log("GET > fetch_project:", result);

  if (result) {
    return Response.json(result);
  } else {
    return Response.json({ error: "no project found" });
  }
}
