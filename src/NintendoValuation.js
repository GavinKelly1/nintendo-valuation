import React, { useState } from "react";
import "./styles.css"; // Import CSS

export default function NintendoValuation() {
  // Format all numbers as JPY currency
  const formatter = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" });

  // State Variables for Sliders (Now in JPY)
  const [consoleSales, setConsoleSales] = useState(1); // Projected Console Sales (Units)
  const [revenuePerConsole, setRevenuePerConsole] = useState(59850); // Revenue Per Console (JPY)
  const [gameSales, setGameSales] = useState(1); // Projected Game Sales (Units)
  const [revenuePerGame, setRevenuePerGame] = useState(1500); // Revenue Per Game (JPY)
  const [subscribers, setSubscribers] = useState(1); // Switch Online Subscribers (Millions)
  const [revenuePerSubscriber, setRevenuePerSubscriber] = useState(4500); // Revenue Per Subscriber (JPY)
  const [expenses, setExpenses] = useState(15000); // Operating Expenses (Million JPY)
  const [evMultiple, setEvMultiple] = useState(1); // EV/EBITDA Multiple
  const [outstandingShares, setOutstandingShares] = useState(1); // Outstanding Shares (Millions)

  // **Revenue Calculation (All in JPY)**
  const revenue =
    consoleSales * revenuePerConsole + // Console Revenue (JPY)
    gameSales * revenuePerGame + // Game Sales Revenue (JPY)
    subscribers * revenuePerSubscriber * 1_000_000; // Subscription Revenue (JPY)

  // **EBITDA Calculation**
  const ebitda = revenue - expenses * 1_000_000;

  // **EBITDA Margin**
  const ebitdaMargin = ((ebitda / revenue) * 100).toFixed(2);

  // **Market Cap Calculation**
  const marketCap = ebitda * evMultiple;

  // **Stock Price Calculation**
  const stockPrice = marketCap / (outstandingShares * 1_000_000);

  return (
    <div className="container">
      <h1 className="title">Nintendo Valuation Model (JPY - 7974.T)</h1>

      {/* Sliders Section */}
      {[
        { label: "Projected Console Sales (Units)", value: consoleSales, setter: setConsoleSales, min: 1, max: 30_000_000 },
        { label: "Average Revenue Per Console (JPY)", value: revenuePerConsole, setter: setRevenuePerConsole, min: 10000, max: 150000, prefix: "¥" },
        { label: "Projected Game Sales (Units)", value: gameSales, setter: setGameSales, min: 1, max: 500_000_000 },
        { label: "Average Revenue Per Game (JPY)", value: revenuePerGame, setter: setRevenuePerGame, min: 1000, max: 3000, prefix: "¥" },
        { label: "Nintendo Switch Online Subscribers (Millions)", value: subscribers, setter: setSubscribers, min: 1, max: 300 },
        { label: "Average Revenue Per Subscriber (JPY)", value: revenuePerSubscriber, setter: setRevenuePerSubscriber, min: 100, max: 15000, prefix: "¥" },
        { label: "Operating Expenses (Million JPY)", value: expenses, setter: setExpenses, min: 15000, max: 1_500_000, prefix: "¥" },
        { label: "EV/EBITDA Multiple", value: evMultiple, setter: setEvMultiple, min: 1, max: 200 },
        { label: "Outstanding Shares (Millions)", value: outstandingShares, setter: setOutstandingShares, min: 1, max: 1_500 },
      ].map(({ label, value, setter, min, max, prefix = "", suffix = "" }, index) => (
        <div key={index} className="slider-container">
          <label>
            {label}: {prefix}{formatter.format(value)}{suffix}
          </label>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => setter(Number(e.target.value))}
            className="w-full"
          />
        </div>
      ))}

      {/* Stock Price Box */}
      <div className="stock-price">
        Stock Price: {formatter.format(stockPrice > 0 ? stockPrice.toFixed(0) : 0)}
      </div>

      {/* Results Section */}
      <div className="results">
        <p>Revenue:</p> <p className="right">{formatter.format(revenue)}</p>
        <p>EBITDA:</p> <p className="right">{formatter.format(ebitda)}</p>
        <p>EBITDA Margin:</p> <p className="right">{ebitdaMargin}%</p>
        <p>Market Cap:</p> <p className="right">{formatter.format(marketCap)}</p>
      </div>
    </div>
  );
}






















