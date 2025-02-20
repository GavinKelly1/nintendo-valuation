import React, { useState } from "react";
import "./styles.css"; // Import CSS

export default function NintendoValuation() {
  const formatter = new Intl.NumberFormat("en-US", { notation: "standard" });

  // State Variables for Sliders
  const [consoleSales, setConsoleSales] = useState(5_475_665);
  const [revenuePerConsole, setRevenuePerConsole] = useState(41_071);
  const [gameSales, setGameSales] = useState(124_815_635);
  const [revenuePerGame, setRevenuePerGame] = useState(7_002);
  const [subscribers, setSubscribers] = useState(40);
  const [revenuePerSubscriber, setRevenuePerSubscriber] = useState(4_196);
  const [expenses, setExpenses] = useState(674_696);
  const [evMultiple, setEvMultiple] = useState(25);
  const [outstandingShares, setOutstandingShares] = useState(1_307);

  // **Revenue Calculation**
  const revenue =
    consoleSales * revenuePerConsole +
    gameSales * revenuePerGame +
    subscribers * revenuePerSubscriber * 1_000_000;

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
      <h1 className="title">Nintendo Valuation Model</h1>

      {/* Sliders Section */}
      {[
        { label: "Projected Console Sales (Units)", value: consoleSales, setter: setConsoleSales, min: 1, max: 30_000_000 },
        { label: "Average Revenue Per Console (¥)", value: revenuePerConsole, setter: setRevenuePerConsole, min: 10_000, max: 50_000, prefix: "¥" },
        { label: "Projected Game Sales (Units)", value: gameSales, setter: setGameSales, min: 1, max: 1_500_000_000 },
        { label: "Average Revenue Per Game (¥)", value: revenuePerGame, setter: setRevenuePerGame, min: 3_000, max: 10_000, prefix: "¥" },
        { label: "Nintendo Switch Online Subscribers (Millions)", value: subscribers, setter: setSubscribers, min: 1, max: 100 },
        { label: "Average Revenue Per Subscriber (¥)", value: revenuePerSubscriber, setter: setRevenuePerSubscriber, min: 1_000, max: 10_000, prefix: "¥" },
        { label: "Operating Expenses (¥M)", value: expenses, setter: setExpenses, min: 100_000, max: 1_500_000, prefix: "¥" },
        { label: "EV/EBITDA Multiple", value: evMultiple, setter: setEvMultiple, min: 10, max: 30 },
        { label: "Outstanding Shares (Millions)", value: outstandingShares, setter: setOutstandingShares, min: 1_000, max: 1_500 },
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
        Stock Price: ¥{stockPrice > 0 ? stockPrice.toFixed(2) : "0"}
      </div>

      {/* Results Section */}
      <div className="results">
        <p>Revenue:</p> <p className="right">¥{formatter.format(revenue)}</p>
        <p>EBITDA:</p> <p className="right">¥{formatter.format(ebitda)}</p>
        <p>EBITDA Margin:</p> <p className="right">{ebitdaMargin}%</p>
        <p>Market Cap:</p> <p className="right">¥{formatter.format(marketCap)}</p>
      </div>
    </div>
  );
}



























