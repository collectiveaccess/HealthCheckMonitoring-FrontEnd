import { Project, Status } from "@/types";
import Database from "better-sqlite3";
const db = new Database(process.env.DB_PATH);
db.pragma("journal_mode = WAL");

export function fetch_projects(): Project[] {
  const stmt = db.prepare("SELECT * FROM projects;");
  return stmt.all() as Project[];
}

export function fetch_project(id: string): Project {
  const stmt = db.prepare("SELECT * FROM projects WHERE id = ?;");
  return stmt.get(id) as Project;
}

export function fetch_project_statuses(id: string): Status[] {
  const stmt = db.prepare(
    "SELECT * FROM statuses WHERE project_id = ? ORDER BY created_at DESC;",
  );
  return stmt.all(id) as Status[];
}
