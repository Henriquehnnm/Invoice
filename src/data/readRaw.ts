import { Database } from "bun:sqlite";
import { homedir } from "os";
import fs from "fs";
import type { Project } from "../types/projects";
import { join } from "node:path";

const DB_DIR = join(homedir(), ".local", "share", "invoice", "db");

const DB_PATH = join(DB_DIR, "projects.sqlite");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
const db = new Database(DB_PATH, { create: true });

export const data = async (): Promise<Project[]> => {
  return db.query(`SELECT * FROM projects`).all() as Project[];
};
