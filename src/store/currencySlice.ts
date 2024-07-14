import {
  createSlice,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { CurrencyState } from "../interfaces";
import { fetchCurrencies } from "../services/fetchCurrencies.service";
import { fetchExchangeRate } from "../services/fetchExchangeRate.service";

const initialState: CurrencyState = {
  amount: 1,
  fromCurrency: "USD",
  toCurrency: "EUR",
  exchangeRate: null,
  date: new Date().toISOString().split("T")[0],
  currencies: [],
  status: "idle",
  error: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CurrencyState>) => {
    builder
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.currencies = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.exchangeRate = action.payload.conversion_rate;
        state.status = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.type || null;
        }
      );
  },
});

export const { setAmount, setFromCurrency, setToCurrency, setDate } =
  currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
