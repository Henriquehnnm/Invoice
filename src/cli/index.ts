import { Command } from "commander"
import { creator } from "../utils/writers/creator"
import { readAll } from "../utils/readers/readAll"
import { getProjectById, getProjectByName } from "../utils/readers/finder"
import {readUserForUpdateCompleted, readUserForStart} from "./readUser.ts";
import {updaterCompleted, updaterStarted} from "../utils/writers/editor.ts"
import type {Project} from "../types/projects.ts";

export function cli(): void {
    const program = new Command()

    program
        .name("Invoice")
        .description("Manage your freelance projects elegantly")
        .version("0.0.0")

    program
        .command("new")
        .description("Create new project")
        .action(async (): Promise<void> => {
            await creator()
        })

    program
        .command("list")
        .description("List all projects")
        .action(async (): Promise<void> => {
            await readAll()
        })

    program
        .command("get")
        .description("Get a specific project")
        .option("-i --id <number>", "Search the project by ID")
        .option("-n --name <name>", "Get project by name")
        .action(async (options): Promise<void> => {

            // By name
            if (options.name) {
                const project: Project | null | undefined = await getProjectByName(options.name)

                if (project) {
                    console.table(project)
                } else {
                    console.error("Project not found")
                }
            }

            // By id
            if (options.id) {
                const project: Project | null | undefined = await getProjectById(Number(options.id))

                if (project) {
                    console.table(project)
                } else {
                    console.error("Project not found")
                }
            }
        })

    program
        .command("done")
        .description("Update the project by ID")
        .option("-i --id <number>", "Get project by ID")
        .action(async (option): Promise<void> => {
            const projectId: number = Number(option.id)
            const project: Project | null | undefined = await getProjectById(projectId)
            if (project) {
                const currenStatus: boolean = !!project?.projectCompleted
                const newState: boolean = await readUserForUpdateCompleted(currenStatus)
                updaterCompleted(projectId, newState)
            } else {
                console.error("Project not found")
            }

        })

    program
        .command("start")
        .description("Start project")
        .option("-i --id <number>", "Get project by ID")
        .action(async (options): Promise<void> => {
            const projectID: number = Number(options.id)
            const project: Project | null | undefined = await getProjectById(projectID)
            if (project) {
                const currenStatus: boolean = !!project?.projectStarted
                console.log(currenStatus)
                const newState: boolean = await readUserForStart(currenStatus)
                updaterStarted(projectID, newState)
            } else {
                console.error("Project not found")
            }
        })



    program.parse()
}