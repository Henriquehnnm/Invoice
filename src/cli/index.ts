import { Command } from "commander";
import { creator } from "../utils/writers/creator";
import { readAll } from "../utils/readers/readAll";
import { getProjectById, getProjectByName } from "../utils/readers/finder";
import { readUserForUpdateCompleted, readUserForStart } from "./readUser.ts";
import { updaterCompleted, updaterStarted } from "../data/editor.ts";
import type { Project } from "../types/projects.ts";
import { deleteProject } from "../utils/writers/deleter.ts";
import {
  getProjectsByCompleted,
  getProjectsByStarted,
} from "../utils/readers/filters.ts";
import { exportCSVById, exportAllCSV } from "../utils/exporters/csv.ts";
import { setup } from "../utils/writers/setup.ts";
import pc from "picocolors";

export function cli(): void {
  const program = new Command();

  program
    .name("Invoice")
    .description("Manage your freelance projects elegantly")
    .version("1.0.0");

  program
    .command("setup")
    .description("Start Invoice configuration")
    .action(async (): Promise<void> => {
      const result = await setup();
      if (result) {
        console.log(pc.green("Logged in successfully! :)"));
      } else {
        console.log(pc.red("Operation aborted. :("));
      }
    });

  program
    .command("new")
    .description("Create new project")
    .action(async (): Promise<void> => {
      await creator();
    });

  program
    .command("list")
    .description("List all projects")
    .option("-j, --json", "Return json output")
    .action(async (option): Promise<void> => {
      const projects = await readAll();

      if (projects) {
        if (option.json) {
          console.log(JSON.stringify(projects, null, 2));
        } else {
          const Table = require("cli-table3");
          const table = new Table({
            head: ["id", "name", "started", "completed"],
            style: {
              head: [],
              border: ["white"],
            },
          });
          projects?.forEach((p) => {
            table.push([
              pc.yellow(p.id),
              p.name,
              pc.yellow(p.projectStarted),
              pc.yellow(p.projectCompleted),
            ]);
          });
          console.log(table.toString());
        }
      } else {
        console.error("No projects found!");
      }
    });

  program
    .command("get")
    .description("Get a specific project")
    .option("-i --id <number>", "Search the project by ID")
    .option("-n --name <name>", "Get project by name")
    .option("-j, --json", "Return json output")
    .action(async (options): Promise<void> => {
      // By name
      if (options.name) {
        const project: Project | null | undefined = await getProjectByName(
          options.name,
        );

        if (project) {
          if (options.json) {
            console.log(JSON.stringify(project, null, 2));
          } else {
            console.table(project);
          }
        } else {
          console.error("Project not found");
        }
      }

      // By id
      if (options.id) {
        const project: Project | null | undefined = await getProjectById(
          Number(options.id),
        );

        if (project) {
          if (options.json) {
            console.log(JSON.stringify(project, null, 2));
          } else {
            console.table(project);
          }
        } else {
          console.error("Project not found");
        }
      }

      if (Object.keys(options).length === 0) {
        console.warn(
          pc.yellow("Please provide either --id <number> or --name flag."),
        );
      }
    });

  program
    .command("start")
    .description("Start existent project")
    .option("-i --id <number>", "Get project by ID")
    .action(async (options): Promise<void> => {
      const projectID: number = Number(options.id);
      const project: Project | null | undefined =
        await getProjectById(projectID);
      if (project) {
        const currenStatus: boolean = !!project?.projectStarted;
        console.log(currenStatus);
        const newState: boolean = await readUserForStart(currenStatus);
        updaterStarted(projectID, newState);
      } else {
        console.error("Project not found");
      }
      if (Object.keys(options).length === 0) {
        console.warn(pc.yellow("Please provide either --id <number> flag."));
      }
    });

  program
    .command("done")
    .description("Complete existent project")
    .option("-i --id <number>", "Get project by ID")
    .action(async (option): Promise<void> => {
      const projectId: number = Number(option.id);
      const project: Project | null | undefined =
        await getProjectById(projectId);
      if (project) {
        const currenStatus: boolean = !!project?.projectCompleted;
        const newState: boolean =
          await readUserForUpdateCompleted(currenStatus);
        updaterCompleted(projectId, newState);
      } else {
        console.error("Project not found");
      }
      if (Object.keys(option).length === 0) {
        console.warn(pc.yellow("Please provide either --id <number> flag."));
      }
    });

  program
    .command("filter")
    .description("Filter projects by condition")
    .option("-s --started", "Filter started projects")
    .option("-c --completed", "Filter completed projects")
    .option("-j, --json", "Return json output")
    .action(async (options): Promise<void> => {
      const Table = require("cli-table3");
      const table = new Table({
        head: ["id", "name", "description"],
        style: {
          head: [],
          border: ["white"],
        },
      });

      if (options.started) {
        const projects = getProjectsByStarted();
        if (projects!.length > 0) {
          if (options.json) {
            console.log(JSON.stringify(projects, null, 2));
          } else {
            projects?.forEach((p) => {
              table.push([pc.yellow(p.id), p.name, p.description]);
            });
            console.log(table.toString());
          }
        } else {
          console.error("No projects found!");
        }
      }

      if (options.completed) {
        const projects = getProjectsByCompleted();
        if (projects!.length > 0) {
          if (options.json) {
            console.log(JSON.stringify(projects, null, 2));
          } else {
            projects?.forEach((p) => {
              table.push([pc.yellow(p.id), p.name, p.description]);
            });
            console.log(table.toString());
          }
        } else {
          console.error("No projects found!");
        }
      }

      if (Object.keys(options).length === 0) {
        console.warn(
          pc.yellow("Please provide either --started or --completed flag."),
        );
      }
    });

  program
    .command("delete")
    .description("Delete project")
    .option("-i, --id <number>", "delete project by id")
    .action(async (options): Promise<void> => {
      if (options.id) {
        const projectID = Number(options.id);
        await deleteProject(projectID);
      }

      if (Object.keys(options).length === 0) {
        console.warn(pc.yellow("Please provide either --id <number> flag."));
      }
    });

  program
    .command("export")
    .description("Export project to CSV")
    .option("-a, --all", "Export all projects")
    .option("-i, --id <number>", "Export project by id")
    .argument("[path]", "File path output (default is output.csv", "output.csv")
    .action(async (path, options): Promise<void> => {
      if (options.id) {
        const projectId = Number(options.id);
        await exportCSVById(projectId, path);
        console.log(pc.green(`Project ${projectId} exported to ${path}`));
      }

      if (options.all) {
        await exportAllCSV(path);
        console.log(pc.green(`All projects were exported to ${path}`));
      }

      if (!options.id && !options.all) {
        console.warn(
          pc.yellow("Please provide either --id <number> or --all flag."),
        );
      }
    });

  program.parse();
}
