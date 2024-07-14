import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  setAmount,
  setFromCurrency,
  setToCurrency,
  setDate,
} from "../../store/currencySlice";
import { InputDate, InputNumber, Render } from "../../components";
import { fetchCurrencies } from "../../services/fetchCurrencies.service";
import { fetchExchangeRate } from "../../services/fetchExchangeRate.service";
import "./currencyConverter.css";

export const CurrencyConverter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    amount,
    fromCurrency,
    toCurrency,
    exchangeRate,
    date,
    currencies,
    status,
  } = useSelector((state: RootState) => state.currency);

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    if (fromCurrency && toCurrency && date) {
      dispatch(fetchExchangeRate({ fromCurrency, toCurrency, date }));
    }
  }, [dispatch, fromCurrency, toCurrency, date]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAmount(Number(e.target.value)));
  };

  const handleFromCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setFromCurrency(e.target.value));
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setToCurrency(e.target.value));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDate(e.target.value));
  };

  const handleSwapCurrencies = () => {
    dispatch(setFromCurrency(toCurrency));
    dispatch(setToCurrency(fromCurrency));
    setIsFlipped(!isFlipped);
  };

  const convertedAmount = amount * (exchangeRate || 0);

  return (
    <div className="currency-converter-container">
      <div className="currency-converter-card">
        <div className="card-content">
          <h1 className="card-title">Currency Converter</h1>
          <div className="input-group">
            <label htmlFor="amount" className="input-label">
              Amount
            </label>
            <InputNumber
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              allowDecimal={true}
            />
          </div>

          <div className="currency-grid">
            <div className="input-group">
              <label htmlFor="fromCurrency" className="input-label">
                From
              </label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
                className="input-field"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="toCurrency" className="input-label">
                To
              </label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={handleToCurrencyChange}
                className="input-field"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={handleSwapCurrencies} className="swap-button">
            Swap Currencies
          </button>

          <div className="input-group">
            <label htmlFor="date" className="input-label">
              Date
            </label>
            <InputDate
              name="date"
              value={date}
              onChange={handleDateChange}
              placeholder="Select date"
              disabled={status === "loading"}
              className="input-field"
            />
          </div>
        </div>

        <div className="result-container">
          <Render if={status === "loading"}>
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          </Render>
          <Render if={status === "failed"}>
            <p className="error-message">Error occurred. Please try again.</p>
          </Render>
          {exchangeRate && (
            <div className="result-text">
              <h2 className="result-amount">
                {amount.toFixed(2)} {fromCurrency} ={" "}
                {convertedAmount.toFixed(2)} {toCurrency}
              </h2>
              <p className="result-rate">
                Exchange rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)}{" "}
                {toCurrency}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
