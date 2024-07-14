import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { ConversionRatesResponse } from "../interfaces";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY || "";
const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || "";
export const fetchCurrencies: AsyncThunk<string[], void, {}> = createAsyncThunk<
  string[],
  void,
  {}
>("currency/fetchCurrencies", async () => {
  const response = await axios.get<ConversionRatesResponse>(
    `${API_URL}/${API_KEY}/latest/USD`
  );
  return Object.keys(response.data.conversion_rates);
});
