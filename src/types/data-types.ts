export interface Transaction {
  id: string;
  type: "income" | "expense";
  name: string;
  amount: number;
  date: string;
  category?: string;
  description?: string;
}

export interface CategoryIncome {
  id: string;
  name: string;
  icon?: string;
}

export interface CategoryExpense extends CategoryIncome {
  budgetEnable: boolean;
  budgetAmount: number;
  budgetPeriod: "daily" | "weekly" | "monthly";
}
