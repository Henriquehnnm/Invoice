import { readUserForCreate } from "../../cli/readUser"
import { initDB, saveProject } from "../../data/database.ts";

export async function creator() {
   const data = await readUserForCreate()

    // Database
    initDB()

    saveProject(data)

}

// Dev test
await creator()