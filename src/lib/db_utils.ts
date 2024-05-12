import { Project, Status } from "@/types";
import Database from "better-sqlite3";
const db = new Database(process.env.DB_PATH);
db.pragma("journal_mode = WAL");

export function fetch_projects(): Project[] {
  const stmt = db.prepare("SELECT * FROM projects ORDER BY name;");
  return stmt.all() as Project[];
}

export function fetch_project(id: string): Project {
  const stmt = db.prepare("SELECT * FROM projects WHERE id = ?;");
  return stmt.get(id) as Project;
}

export function fetch_project_statuses(
  id: string,
  limit: number,
  offset: number,
): Status[] {
  const stmt = db.prepare(
    "SELECT * FROM statuses WHERE project_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ? ;",
  );
  return stmt.all(id, limit, offset) as Status[];
}

export function fetch_project_statuses_count(id: string) {
  const stmt = db.prepare(
    "SELECT COUNT(*) AS count FROM statuses WHERE project_id = ?;",
  );
  return stmt.get(id)["count"];
}
