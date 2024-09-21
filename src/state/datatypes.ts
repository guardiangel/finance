export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}
export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

export interface GetKpisReponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
  createAt:string;
  updateAt:string;
}
export interface GetProductsReponse {
  id: string;
  _id: string;
  __v: number;
  price:number;
  expense:number;
  transactions:Array<string>;
  createAt:string;
  updateAt:string;
}
export interface GetTransactionsReponse {
  id: string;
  _id: string;
  __v: number;
  buyer:string;
  amount:number;
  productIds:Array<string>;
  createAt:string;
  updateAt:string;
}
