import { readUserForCreate } from "../../cli/readUser";
import { initDB, saveProject } from "../../data/database.ts";
import * as p from "@clack/prompts";
import pc from "picocolors";

export async function creator() {
  try {
    const data = await readUserForCreate();

    // Database
    initDB();

    saveProject(data);

    p.outro(pc.green("Project completed successfully!"));
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}
