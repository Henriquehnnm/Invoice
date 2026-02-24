import { Database } from "bun:sqlite"

// Resolver path
const db = new Database("data/projects.sqlite", { create: true })

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
            charge_type TEXT,
            
            client_name TEXT,
            client_email TEXT,
            client_company TEXT,
            
            start_date TEXT,
            delivery_forecast TEXT,
            
            budget REAL,
            contact_budget REAL,
            initial_pay REAL,
            expected_pay_date TEXT,
            
            project_started INTEGER DEFAULT 0,
            
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `)
}

export const saveProject = (project: {
    budget: number;
    projectStarted: Exclude<Awaited<boolean | symbol>, symbol>;
    deliveryForecast: string;
    startDate: Exclude<Awaited<string | symbol>, symbol>;
    clientEmail: Exclude<Awaited<string | symbol>, symbol>;
    clientName: Exclude<Awaited<string | symbol>, symbol>;
    contactBudget: number;
    chargeType: Exclude<Awaited<symbol | string>, symbol>;
    description: Exclude<Awaited<string | symbol>, symbol>;
    isInitialPay: number;
    expectedPayDate: string;
    clientCompany: Exclude<Awaited<string | symbol>, symbol>;
    name: Exclude<Awaited<string | symbol>, symbol>
}) => {
    const query = db.prepare(`
        INSERT INTO projects (
            name, description, charge_type, client_name, client_email,
            client_company, start_date, delivery_forecast, budget, contact_budget,
            initial_pay, expected_pay_date, project_started
        ) VALUES (
            $name, $description, $chargeType, $clientName, $clientEmail,
            $clientCompany, $startDate, $deliveryForecast, $budget, $contactBudget,
            $isInitialPay, $expectedPayDate, $projectStarted
        )
    `)

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
    })
}

export default db
