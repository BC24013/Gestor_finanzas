export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  initials: string;
  gender: "male" | "female";
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description: string;
  status: 'Completado' | 'Pendiente';
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

export interface AutoSaveRule {
  enabled: boolean;
  type: 'percent' | 'fixed';
  value: number;
  targetGoalId: string;
}
