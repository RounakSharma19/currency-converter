import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY || "";
const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || "";
export const fetchExchangeRate = createAsyncThunk<
  { conversion_rate: number },
  { fromCurrency: string; toCurrency: string; date: string },
  {}
>("currency/fetchExchangeRate", async ({ fromCurrency, toCurrency, date }) => {
  const [year, month, day] = date.split("-").map(Number);
  const response = await axios.get(
    `${API_URL}/${API_KEY}/history/${fromCurrency}/${year}/${month}/${day}`
  );
  return {
    conversion_rate: response.data.conversion_rates[toCurrency],
  };
});
