import { data } from "../../data/readRaw";
import pc from "picocolors";

export async function readAll() {
  // TODO: Depois usar cli table3 ou algo do tipo, para nao exibir o index
  const Table = require("cli-table3");

  const projects = await data();
  if (projects.length != 0) {
    // const table = new Table({
    //   head: ["id", "name", "started", "completed"],
    //   style: {
    //     head: [],
    //     border: ["white"],
    //   },
    // });
    // projects.forEach((p) => {
    //   table.push([
    //     pc.yellow(p.id),
    //     p.name,
    //     pc.yellow(p.projectStarted),
    //     pc.yellow(p.projectCompleted),
    //   ]);
    // });
    // console.log(table.toString());
    return projects;
  } else {
    return null;
  }
}
