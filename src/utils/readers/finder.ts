import { data } from "../../data/readRaw";
import type { Project } from "../../types/projects.ts";

export async function getProjectById(
  id: number,
): Promise<Project | null | undefined> {
  try {
    const project = await data();
    const getProject = project.find((p) => p.id === id);
    return getProject || null;
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}

export async function getProjectByName(
  name: string,
): Promise<Project | null | undefined> {
  try {
    const project = await data();
    const getProject = project.find((p) => p.name === name);
    return getProject || null;
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}
