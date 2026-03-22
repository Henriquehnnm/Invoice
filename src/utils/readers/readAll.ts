import { data } from "../../data/readRaw";

export async function readAll() {
  const projects = await data();
  if (projects.length != 0) {
    return projects;
  } else {
    return null;
  }
}
