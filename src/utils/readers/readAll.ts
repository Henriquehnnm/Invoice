import { data } from "../../data/readRaw";

export async function readAll() {
  // TODO: Depois usar cli table3 ou algo do tipo, para nao exibir o index
  const projects = await data();
  if (projects.length != 0) {
    console.table(projects, [
      "id",
      "name",
      "description",
      "projectStarted",
      "projectCompleted",
    ]);
  } else {
    console.error("No projects found.");
  }
}
