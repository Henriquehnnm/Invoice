<div align="center">
  <h1 align="center">Invoice</h1>
  <p align="center">
    Manage your freelance projects elegantly from the terminal
  </p>
</div>

![invoice-preview](https://raw.githubusercontent.com/henriquehnnm/invoice/main/assets/invoice-demo.gif)

---

## ⚠️ Warning

**_Invoice is in an early Beta release. It may contain bugs, performance issues, or incomplete features. Use with caution._**

## About

Invoice is a modern CLI tool designed to help freelancers manage their projects with speed and efficiency, without ever leaving the terminal. Track your projects, manage payments, and never miss a deadline again.

## ✨ Features

- **Project Management**: Create, list, and manage all your projects.
- **Detailed View**: Get detailed information for a specific project by its ID or name.
- **Status Tracking**: Mark projects as `started` or `completed` to keep track of your progress.
- **Powerful Filtering**: Filter your projects to see only what's relevant at the moment (e.g., all started projects).
- **Data Export**: Export your project data to `CSV` for reporting or `PDF` for invoicing.
- **Interactive UI**: User-friendly prompts for creating and updating projects.
- **Customizable**: Setup your own configuration for the tool.

## 📦 Installation

Currently, Invoice can be installed by cloning the repository and running the installation script.

```bash
# Clone the repository
git clone https://github.com/your-username/invoice.git

# Navigate to the project directory
cd invoice

# Install dependencies (requires Bun)
bun install

# Build the executable and install it
bun run install
```

_Make sure you have `~/.local/bin` in your PATH._

## 🚀 Usage

Invoice provides a set of commands to manage your projects seamlessly.

### `invoice setup`

Start the initial configuration for Invoice.

### `invoice new`

Create a new project through an interactive prompt.

### `invoice list`

List all your projects in a clean table format.

- `--json`: Output the project list in JSON format.

### `invoice get`

Get a specific project's details.

- `-i, --id <number>`: Find project by ID.
- `-n, --name <name>`: Find project by name.
- `--json`: Output the project details in JSON format.

### `invoice start`

Mark a project as started.

- `-i, --id <number>`: The ID of the project to start.

### `invoice done`

Mark a project as completed.

- `-i, --id <number>`: The ID of the project to complete.

### `invoice edit`

Edit project information by id

- `-i, --id <number>`: The ID of the project to edit.

### `invoice filter`

Filter projects based on their status.

- `-s, --started`: Show all started projects.
- `-c, --completed`: Show all completed projects.
- `--json`: Output the filtered projects in JSON format.

### `invoice delete`

Delete a project.

- `-i, --id <number>`: The ID of the project to delete.

### `invoice generate`

Generates an invoice for a project.

- `-i, --id <number>`: The ID of the project to generate the invoice for.
- `[path]`: Optional output path for the PDF file (defaults to `invoice.pdf`).

### `invoice export`

Export projects to a CSV file.

- `-i, --id <number>`: Export a single project by ID.
- `-a, --all`: Export all projects.
- `[path]`: Optional output path for the CSV file (defaults to `output.csv`).

## 🛠️ Built With

- [TypeScript](https://www.typescriptlang.org/) - Main language
- [Bun](https://bun.sh/) - JavaScript toolkit
- [Commander.js](https://github.com/tj/commander.js/) - CLI framework
- [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) - Interactive prompts
- [cli-table3](https://github.com/cli-table/cli-table3) - Table rendering
- [PDFKit](http://pdfkit.org/) - PDF generation library

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/henriquehnnm/invoice/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
