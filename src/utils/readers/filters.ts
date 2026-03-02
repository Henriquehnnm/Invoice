import { data } from "../../data/readRaw";
import type { Project } from "../../types/projects.ts";

const project = await data();

// TODO: Por enquanto fica com .filter() msm, depois usar uma forma melhor pelo SQLite

export function getProjectsByCompleted(): Project[] | null {
  try {
    return (
      project.filter((project: Project) => project.projectCompleted) ?? null
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function getProjectsByStarted(): Project[] | null {
  try {
    return project.filter((project: Project) => project.projectStarted) ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
