export type chargeType = "fixed" | "perHour";
export type numBol = 0 | 1;

export interface Project {
  id: number;
  name: string;
  description?: string;
  chargeType?: chargeType;

  clientName?: string;
  clientEmail?: string;
  clientCompany?: string;

  startDate?: string;
  deliveryForecast?: string;

  budget?: number;
  contactBudget?: number;
  initialPay?: number;
  expectedPayDate?: string;

  projectStarted: numBol;
  projectCompleted: numBol;
  createdAt: string;
}

export interface saveProjectInterface {
  budget: number;
  projectStarted: Exclude<Awaited<boolean | symbol>, symbol>;
  projectCompleted: Exclude<Awaited<boolean | symbol>, symbol>;
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
  name: Exclude<Awaited<string | symbol>, symbol>;
}
