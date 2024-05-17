import { NextRequest } from "next/server";
import { create_project, fetch_projects } from "@/lib/db_utils";
import { NewProject } from "@/types";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as NewProject;

  let result = create_project(
    body.name,
    body.url,
    body.notes,
    body.client_name,
    body.cluster_name,
    body.slack_alert,
    body.email_alert,
    body.check_frequency,
  );

  return Response.json({ message: "project created", result });
}

export async function GET(request: NextRequest) {
  let result = fetch_projects();

  return Response.json(result);
}
