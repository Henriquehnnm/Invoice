import { Command } from "commander";

export function cli(): void {
    const program = new Command()

    program
        .name("Invoice")
        .description("Manage your freelance projects elegantly")
        .version("0.0.0")

    program
        .command("new")
        .description("Create new project")
        .action((): void => {
            console.log("New project here")
        })

    program.parse()
}