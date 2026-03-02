import * as p from "@clack/prompts";
import pc from "picocolors";
import { z } from "zod";

export async function readUserForCreate() {
  // Get infos
  const today = new Date().toISOString().split("T")[0];

  const isIsoDate = (input: string): boolean =>
    z.iso.date().safeParse(input).success;

  // Parser deadline
  const parseDeadline = (input: string): string | null => {
    const match = input
      .toLowerCase()
      .match(/^(\d+)\s*(d|m|y|days?|months?|years?)$/);
    if (!match) return null;

    const rawValue = match[1];
    const rawUnit = match[2];
    if (!rawValue || !rawUnit) return null;
    const value = Number.parseFloat(rawValue);
    const unit = rawUnit.charAt(0);

    const date = new Date();
    if (unit === "d") date.setDate(date.getDate() + value);
    if (unit === "m") date.setMonth(date.getMonth() + value);
    if (unit === "y") date.setFullYear(date.getFullYear() + value);

    // @ts-ignore
    return date.toISOString().split("T")[0];
  };

  // Start User Interface
  p.intro(pc.cyan("INVOICE CLI - New Project"));

  /**
   * # Main Inputs
   * */
  // Inputs
  const projectData = await p.group(
    {
      name: () =>
        p.text({
          message: "Project name:",
          placeholder: "Ex: delivery app",
          validate: (value) => {
            if (!value) return "The name is mandatory!";
          },
        }),

      description: () =>
        p.text({
          message: "Project description:",
          placeholder: "API for a mobile delivery app",
          defaultValue: "No description",
        }),

      chargeType: () =>
        p.select({
          message: "Type of charge:",
          options: [
            { value: "fixed", label: "Fixed value" },
            { value: "perHour", label: "Per hour" },
          ],
        }),

      clientName: () =>
        p.text({
          message: "Customer name:",
          placeholder: "Ex: Tux the Penguin",
          validate: (value) => {
            if (!value) return "The customer's name is mandatory!";
          },
        }),

      clientEmail: () =>
        p.text({
          message: "Customer email:",
          placeholder: "Ex: tuxthepenguim@example.com",
          validate: (value) => {
            const result = z.email().safeParse(value);
            if (!result.success) {
              return "Invalid email syntax!";
            }
          },
        }),

      clientCompany: () =>
        p.text({
          message: "Customer company:",
          placeholder: "(Optional) The Linux Foundation",
          defaultValue: "No company",
        }),

      startDate: () =>
        p.text({
          message: "Start date (YYYY-MM-DD)",
          placeholder: today,
          defaultValue: today,
          validate: (value) => {
            const result = z
              .string()
              .regex(/^\d{4}-\d{2}-\d{2}$/)
              .safeParse(value?.trim());
            if (!result.success) {
              return "Invalid format! Use YYYY-MM-DD (ex: 2026-02-23)";
            }
          },
        }),

      //             .--.
      //            |o_o |
      //            |:_/ |
      //           //   \ \
      //          (|     | )
      //         /'\_   _/`\
      //         \___)=(___/
      //
      //         Congratulations, you found Tux ASCII
      //         lost in the middle of the file!

      deliveryForecast: () =>
        p.text({
          message: "Delivery forecast:",
          placeholder: "Use 20d (after today) or YYYY-MM-DD",
          defaultValue: "Not informed",
          validate: (value) => {
            const input = (value ?? "").trim();
            if (!input) return;

            if (isIsoDate(input)) return;

            const deadline = parseDeadline(input);
            if (!deadline) {
              return 'Invalid format! Use YYYY-MM-DD or shortcuts like "15d", "2m", "1y"';
            }
          },
        }),

      projectStarted: () =>
        p.confirm({
          message: "Has the project already started?",
          initialValue: false,
        }),

      budget: () =>
        p.text({
          message: "What is the total budget?",
          validate: (value) => {
            if (isNaN(Number(value))) return "Enter a valid number!";
          },
        }),

      contactBudget: () =>
        p.text({
          message: "What is the total value of the contract?",
          validate: (value) => {
            if (isNaN(Number(value))) return "Enter a valid number!";
          },
        }),

      isInitialPay: () =>
        p.text({
          message: "Has there already been an initial payment?",
          placeholder: "Type enter for none",
          validate: (value) => {
            const input = (value ?? "").trim();

            if (input === "") return;

            if (isNaN(Number(input))) return "Enter a valid number!";
          },
        }),

      expectedPayDate: () =>
        p.text({
          message: "Pay date forecast:",
          placeholder: "20d (after today) or YYYY-MM-DD",
          defaultValue: "Not informed",
          validate: (value) => {
            const input = (value ?? "").trim();
            if (!input) return;

            if (isIsoDate(input)) return;

            const deadline = parseDeadline(input);
            if (!deadline) {
              return 'Invalid format! Use YYYY-MM-DD or shortcuts like "15d", "2m", "1y"';
            }
          },
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation canceled");
        process.exit(0);
      },
    },
  );

  return {
    ...projectData,
    deliveryForecast:
      parseDeadline(projectData.deliveryForecast) ||
      projectData.deliveryForecast,
    projectCompleted: false,
    expectedPayDate:
      parseDeadline(projectData.expectedPayDate) || projectData.expectedPayDate,
    budget: Number(projectData.budget),
    contactBudget: Number(projectData.contactBudget),
    isInitialPay:
      projectData.isInitialPay === "" ? 0 : Number(projectData.isInitialPay),
  };
}

// Readuser for update
export async function readUserForUpdateCompleted(
  currentStatus: boolean,
): Promise<boolean> {
  p.intro(pc.cyan("INVOICE CLI - Complete project"));

  const toggleCompleted: boolean | symbol = await p.confirm({
    message: `Project is currently ${currentStatus ? "completed" : "NOT completed"}. Toggle Status`,
    initialValue: !currentStatus,
  });

  if (p.isCancel(toggleCompleted)) {
    p.cancel("Operation canceled");
    process.exit(0);
  }

  // if/else CLASSICO pra evirar erro
  // if (toggleCompleted) {
  //     return !currentStatus
  // } else {
  //     return currentStatus
  // }
  return toggleCompleted ? !currentStatus : currentStatus;
}

/**
 * # Start existent project
 * */
export async function readUserForStart(
  currentStatus: boolean,
): Promise<boolean> {
  p.intro(pc.cyan("INVOICE CLI - Start project"));

  const toggleStarted: boolean | symbol = await p.confirm({
    message: `Project is currently ${currentStatus ? "started. Toggle Status?" : "not started. Start project?"}`,
    initialValue: !currentStatus,
  });

  if (p.isCancel(toggleStarted)) {
    p.cancel("Operation canceled");
    process.exit(0);
  }

  return toggleStarted ? !currentStatus : currentStatus;
}
