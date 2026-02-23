import { Database } from "bun:sqlite"
import { Projects } from "../classes/project"

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
            type TEXT,
            technologies TEXT,
            client_name TEXT,
            client_email TEXT,
            client_enterprise INTEGER DEFAULT 0,
            project_budget REAL,
            project_started INTEGER,
            project_finished INTEGER,
            paid INTEGER,
            start_date TEXT,
            delivery_date TEXT,
            pay_date TEXT,
            value REAL,
            paid_amount REAL,
            amount_needed REAL,
            monthly_total REAL
        )
    `)
}

export const saveProject = (project: Projects) => {
    const query = db.prepare(`
        INTERT INTO projects (
            name, description, charge_type, type, technologies, client_name, client_email, 
            client_enterprise, project_budget, project_started, 
            project_finished, paid, start_date, delivery_date, 
            pay_date, value, paid_amount, amount_needed, monthly_total
        ) VALUES (
            $name, $description, $chargeType, $clientName, $clientEmail,
            $clientEnterprise, $projectBudget, $projectStarted,
            $projectFinished, $paid, $startDate, $deliveryDate,
            $payDate, $value, $paidAmount, $amountNeeded, $monthlyTotal
        )
    `)

    query.run({
        $name: project.name,
        $description: project.description,
        $chargeType: project.chargeType,
        $type: project.type,
        $technologies: project.technologies,
        $clientName: project.clientName,
        $clientEmail: project.clientEmail,
        $clientEnterprise: project.clientEnterprise,
        $projectBudget: project.projectBudget,
        $projectStarted: project.projectStarted ? 1 : 0,
        $projectFinished: project.projectFinished ? 1 : 0,
        $paid: project.paid ? 1 : 0,
        $startDate: project.startDate,
        $deliveryDate: project.deliveryDate,
        $payDate: project.payDate,
        $value: project.value,
        $paidAmount: project.paidAmount,
        $amountNeeded: project.amountNeeded,
        $monthlyTotal: project.monthlyTotal,
    })
}

export default db