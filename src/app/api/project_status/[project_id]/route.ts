import type { NextRequest } from "next";
import {
  fetch_project_statuses,
  fetch_project_statuses_count,
} from "@/lib/db_utils";
import { DEFAULT_PER_PAGE } from "@/data/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: { project_id: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  const offset = searchParams.get("offset") || 0;
  const perPage = Number(process.env.NEXT_PUBLIC_PER_PAGE) || DEFAULT_PER_PAGE;
  const projectId = params.project_id;

  const statuses = fetch_project_statuses(projectId, perPage, offset);
  const statusesCount = await fetch_project_statuses_count(projectId);

  return Response.json({ count: statusesCount, data: statuses });
}
