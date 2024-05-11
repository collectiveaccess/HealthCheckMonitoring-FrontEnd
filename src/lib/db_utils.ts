import { Project, Status } from "@/types";
import Database from "better-sqlite3";
const db = new Database(process.env.DB_PATH);
db.pragma("journal_mode = WAL");

export function fetch_projects(): Project[] {
  const stmt = db.prepare("SELECT * FROM projects;");
  return stmt.all() as Project[];
}
