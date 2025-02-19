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

  // **Scenarios**
  const scenarios = {
    bear: {
      consoleSales: 4_000_000,
      revenuePerConsole: 38_000,
      gameSales: 100_000_000,
      revenuePerGame: 6_500,
      subscribers: 35,
      revenuePerSubscriber: 4_000,
      expenses: 700_000,
      evMultiple: 20,
    },
    base: {
      consoleSales: 5_475_665,
      revenuePerConsole: 41_071,
      gameSales: 124_815_635,
      revenuePerGame: 7_002,
      subscribers: 40,
      revenuePerSubscriber: 4_196,
      expenses: 674_696,
      evMultiple: 25,
    },
    bull: {
      consoleSales: 6_000_000,
      revenuePerConsole: 44_000,
      gameSales: 140_000_000,
      revenuePerGame: 7_500,
      subscribers: 45,
      revenuePerSubscriber: 4_500,
      expenses: 650_000,
      evMultiple: 30,
    },
  };

  const setScenario = (type) => {
    const scenario = scenarios[type];
    setConsoleSales(scenario.consoleSales);
    setRevenuePerConsole(scenario.revenuePerConsole);
    setGameSales(scenario.gameSales);
    setRevenuePerGame(scenario.revenuePerGame);
    setSubscribers(scenario.subscribers);
    setRevenuePerSubscriber(scenario.revenuePerSubscriber);
    setExpenses(scenario.expenses);
    setEvMultiple(scenario.evMultiple);
  };

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

      {/* Scenario Buttons */}
      <div className="scenario-buttons">
        <button className="scenario bear" onClick={() => setScenario("bear")}>Bear Case</button>
        <button className="scenario base" onClick={() => setScenario("base")}>Base Case</button>
        <button className="scenario bull" onClick={() => setScenario("bull")}>Bull Case</button>
      </div>

      {/* Sliders Section */}
      {[
        { label: "Projected Console Sales (Units)", value: consoleSales, setter: setConsoleSales, min: 1, max: 10_000_000 },
        { label: "Average Revenue Per Console (¥)", value: revenuePerConsole, setter: setRevenuePerConsole, min: 30_000, max: 50_000, prefix: "¥" },
        { label: "Projected Game Sales (Units)", value: gameSales, setter: setGameSales, min: 1, max: 200_000_000 },
        { label: "Average Revenue Per Game (¥)", value: revenuePerGame, setter: setRevenuePerGame, min: 5_000, max: 10_000, prefix: "¥" },
        { label: "Nintendo Switch Online Subscribers (Millions)", value: subscribers, setter: setSubscribers, min: 10, max: 60 },
        { label: "Average Revenue Per Subscriber (¥)", value: revenuePerSubscriber, setter: setRevenuePerSubscriber, min: 2_000, max: 6_000, prefix: "¥" },
        { label: "Operating Expenses (¥M)", value: expenses, setter: setExpenses, min: 500_000, max: 800_000, prefix: "¥" },
        { label: "EV/EBITDA Multiple", value: evMultiple, setter: setEvMultiple, min: 10, max: 40 },
        { label: "Outstanding Shares (Millions)", value: outstandingShares, setter: setOutstandingShares, min: 1_000, max: 1_500 },
      ].map(({ label, value, setter, min, max, prefix = "" }, index) => (
        <div key={index} className="slider-container">
          <label>
            {label}: {prefix}{formatter.format(value)}
          </label>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => setter(Number(e.target.value))}
          />
        </div>
      ))}

      {/* Stock Price Box */}
      <div className="stock-price">
        Stock Price: ¥{stockPrice.toFixed(2)}
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


























