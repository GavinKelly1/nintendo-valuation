export default function NintendoValuation() {
  const formatter = new Intl.NumberFormat("en-US", { notation: "standard" });

  const [consoleSales, setConsoleSales] = useState(1);
  const [revenuePerConsole, setRevenuePerConsole] = useState(1);
  const [gameSales, setGameSales] = useState(1);
  const [revenuePerGame, setRevenuePerGame] = useState(1);
  const [subscribers, setSubscribers] = useState(1);
  const [revenuePerSubscriber, setRevenuePerSubscriber] = useState(1);
  const [expenses, setExpenses] = useState(1);
  const [evMultiple, setEvMultiple] = useState(1);
  const [outstandingShares, setOutstandingShares] = useState(1);

  // **Revenue Calculation**
  const revenue =
    consoleSales * revenuePerConsole + 
    gameSales * revenuePerGame + 
    subscribers * revenuePerSubscriber * 1_000_000;

  // **Ensure expenses are properly scaled**
  const ebitda = revenue - (expenses * 1_000_000_000); // If expenses are in billions

  // **Prevent EBITDA from exceeding revenue**
  const ebitdaMargin = revenue > 0 ? Math.min(((ebitda / revenue) * 100), 100).toFixed(2) : 0;

  // **Calculate Market Cap without Capping EV/EBITDA**
  const marketCap = ebitda * evMultiple;

  // **Stock Price Calculation**
  const stockPrice = outstandingShares > 0 ? Math.max(0, marketCap / (outstandingShares * 1_000_000)) : 0;

  return (
    <div className="container">
      <h1 className="title">Nintendo Valuation Model</h1>

      {/* Sliders Section */}
      {[
        { label: "Projected Console Sales (Units)", value: consoleSales, setter: setConsoleSales, min: 1, max: 30_000_000 },
        { label: "Average Revenue Per Console (¥)", value: revenuePerConsole, setter: setRevenuePerConsole, min: 10000, max: 60000, prefix: "¥" },
        { label: "Projected Game Sales (Units)", value: gameSales, setter: setGameSales, min: 1, max: 1_500_000_000 },
        { label: "Average Revenue Per Game (¥)", value: revenuePerGame, setter: setRevenuePerGame, min: 1000, max: 10000, prefix: "¥" },
        { label: "Nintendo Switch Online Subscribers (Millions)", value: subscribers, setter: setSubscribers, min: 1, max: 300 },
        { label: "Average Revenue Per Subscriber (¥)", value: revenuePerSubscriber, setter: setRevenuePerSubscriber, min: 1000, max: 6000, prefix: "¥" },
        { label: "Operating Expenses (¥B)", value: expenses, setter: setExpenses, min: 100, max: 1_500, prefix: "¥" },
        { label: "EV/EBITDA Multiple", value: evMultiple, setter: setEvMultiple, min: 1, max: 50 },
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





























