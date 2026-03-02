import { Database } from "bun:sqlite";
import { join } from "node:path";
import type { saveProjectInterface } from "../types/projects.ts";

// Resolver path
const DB_PATH = join(process.cwd(), "data", "database.sqlite");
const db = new Database(DB_PATH, { create: true });

/**
 * # Initialize tables if they do not exist
 * Map:
 * - number -> REAL
 * - boolean -> INTEGER (0 || 1)
 * */
export const initDB = () => {
  db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            chargeType TEXT NOT NULL,

            clientName TEXT NOT NULL,
            clientEmail TEXT NOT NULL,
            clientCompany TEXT,

            startDate TEXT NOT NULL,
            deliveryForecast TEXT,

            budget REAL NOT NULL,
            contactBudget REAL NOT NULL,
            initialPay REAL,
            expectedPayDate TEXT,

            projectStarted INTEGER DEFAULT 0,
            projectCompleted INTEGER DEFAULT 0,

            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

export const saveProject = (project: saveProjectInterface) => {
  const query = db.prepare(`
        INSERT INTO projects (
            name, description, chargeType, clientName, clientEmail,
            clientCompany, startDate, deliveryForecast, budget, contactBudget,
            initialPay, expectedPayDate, projectStarted, projectCompleted
        ) VALUES (
            $name, $description, $chargeType, $clientName, $clientEmail,
            $clientCompany, $startDate, $deliveryForecast, $budget, $contactBudget,
            $isInitialPay, $expectedPayDate, $projectStarted, $projectCompleted
        )
    `);

  query.run({
    $name: project.name,
    $description: project.description,
    $chargeType: project.chargeType,
    $clientName: project.clientName,
    $clientEmail: project.clientEmail,
    $clientCompany: project.clientCompany,
    $startDate: project.startDate,
    $deliveryForecast: project.deliveryForecast,
    $budget: project.budget,
    $contactBudget: project.contactBudget,
    $isInitialPay: project.isInitialPay,
    $expectedPayDate: project.expectedPayDate,
    $projectStarted: project.projectStarted ? 1 : 0,
    $projectCompleted: project.projectCompleted ? 1 : 0,
  });
};

export default db;
