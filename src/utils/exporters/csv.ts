import Papa from "papaparse";

import { getProjectById } from "../readers/finder";
import { data } from "../../data/readRaw";
import { genericConfirm } from "../../cli/readUser";
import pc from "picocolors";

export async function exportCSVById(id: number, path: string) {
  try {
    const isExist = Bun.file(path);
    if (await isExist.exists()) {
      const userReq = await genericConfirm(
        `File ${path} already exists. Overwrite?`,
        false,
      );
      if (!userReq) {
        console.warn(pc.red("Operation canceled."));
        process.exit(0);
      }
    }

    const project = await getProjectById(id);

    if (!project) {
      console.error(`Project ${id} not found.`);
      process.exit(1);
    }

    const csvData = Papa.unparse([project], {
      header: true,
      skipEmptyLines: true,
      quotes: true,
      columns: [
        "id",
        "name",
        "description",
        "chargeType",
        "clientName",
        "clientEmail",
        "clientCompany",
        "startDate",
        "deliveryForecast",
        "budget",
        "contactBudget",
        "initialPay",
        "expectedPayDate",
        "projectStarted",
        "projectCompleted",
        "createdAt",
      ],
    });

    await Bun.write(path, csvData);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}

export async function exportAllCSV(path: string) {
  try {
    const isExist = Bun.file(path);
    if (await isExist.exists()) {
      const userReq = await genericConfirm(
        `File ${path} already exists. Overwrite?`,
        false,
      );
      if (!userReq) {
        console.warn(pc.red("Operation canceled."));
        process.exit(0);
      }
    }

    const projetcs = await data();

    if (projetcs.length <= 0) {
      console.error("No projects found.");
      process.exit(1);
    }

    const csvData = Papa.unparse(projetcs, {
      header: true,
      skipEmptyLines: true,
      quotes: true,
    });

    await Bun.write(path, csvData);
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
}
