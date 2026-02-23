import type { chargeType } from "../types/projects.ts";

/**
 * # Project Class
 * ## Invoice project class
 * */
export class Projects {
    constructor(
        public name: string,
        public description: string,
        public chargeType: chargeType,
        public type: string,
        public technologies: string,

        public clientName: string,
        public clientEmail: string,
        public clientEnterprise: boolean,

        public projectBudget: number,
        public projectStarted: boolean,
        public projectFinished: boolean,
        public paid: boolean,

        public startDate: string,
        public deliveryDate: string,
        public payDate: string,

        public value: number,
        public paidAmount: number,
        public amountNeeded: number,
        public monthlyTotal: number,
    ) {}

    markCompleted(): String {
        if (!this.projectFinished) {
            return "DEV: Marcar concluido no DB"
        } else {
            return "DEV: retornar msg de erro pois ja esta concluida"
        }
    }

    payRegister(): String {
        if (this.projectFinished) {
            return "DEV: Registrar como pago no DB"
        } else {
            return "DEV: retornar erro pois o projeto nao foi finalisado"
        }
    }

    getInvoice(): String {
        return `DEV: Retornar aqui o invoice completo do projeto, q sera visivel pela cli, e exportado pro frontend pela api`.trim()
    }
}