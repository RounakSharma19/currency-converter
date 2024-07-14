export interface CurrencyState {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number | null;
  date: string;
  currencies: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
