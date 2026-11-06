'use client';
import { useState } from "react";

type PayoutType = "monthly" | "quarterly" | "half-yearly" | "maturity"

export default function Home() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(3);
  const [payout, setPayout] = useState<PayoutType>("quarterly");

  const [interestEarned, setInterestEarned] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  // Simple interest per README: M = P + (P × r × t / 100)
  // Same total interest and maturity for all payout frequencies (payout only affects how often interest is paid out).
  const handleCalculate = () => {
    const p = principal;
    const r = rate;
    const t = tenureYears;
    const interest = (p * r * t) / 100;
    const maturity = p + interest;
    setInterestEarned(interest);
    setMaturityAmount(maturity);
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <section style={styles.leftPanel}>
          <h1 style={styles.title}>FD Calculator</h1>
          <p style={styles.subtitle}>
            Calculate your fixed deposit maturity amount with simple inputs.
          </p>

          <div style={styles.field}>
            <div style={styles.row}>
              <label>Deposit Amount (₹)</label>
              <span>{formatCurrency(principal)}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={1000000}
              step={1000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div style={styles.field}>
            <div style={styles.row}>
              <label>Rate of Return (%)</label>
              <span>{rate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div style={styles.field}>
            <div style={styles.row}>
              <label>Interest Payout</label>
            </div>
            <div style={styles.chipRow}>
              {(["monthly", "quarterly", "half-yearly", "maturity"] as PayoutType[]).map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPayout(item)}
                    style={{
                      ...styles.chip,
                      ...(payout === item ? styles.chipActive : {}),
                    }}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.row}>
              <label>Time Period (Years)</label>
              <span>{tenureYears.toFixed(1)} yrs</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <button type="button" onClick={handleCalculate} style={styles.button}>
            Calculate
          </button>
        </section>

        <section style={styles.rightPanel}>
          <div style={styles.summaryRow}>
            <div>
              <p style={styles.summaryLabel}>Maturity Amount</p>
              <h2 style={styles.summaryValue}>{formatCurrency(maturityAmount)}</h2>
            </div>
            <div>
              <p style={styles.summaryLabel}>Interest Earned</p>
              <h2 style={styles.summaryValue}>{formatCurrency(interestEarned)}</h2>
            </div>
          </div>

          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Amount Growth</h3>
            </div>

            <div style={styles.chart}>
              {[20, 35, 50, 70, 90].map((height, index) => (
                <div key={index} style={styles.barWrap}>
                  <div style={{ ...styles.bar, height: `${height}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.bottomGrid}>
            <div style={styles.infoCardBrown}>
              <h4 style={styles.infoTitle}>Check Suitable Products For Your Investment</h4>
              <p style={styles.infoText}>Discover plans that match your goal.</p>
            </div>

            <div style={styles.infoCardDark}>
              <h4 style={styles.infoTitle}>Need Help Finding Right Product?</h4>
              <p style={styles.infoText}>Get guidance from a financial advisor.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3ede6",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    minHeight: "720px",
    background: "#fff",
    borderRadius: "24px",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  },
  leftPanel: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  rightPanel: {
    padding: "40px",
    background: "#d8b08b",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    color: "#fff",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    margin: 0,
    color: "#777",
    lineHeight: 1.5,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#555",
  },
  slider: {
    width: "100%",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  chip: {
    border: "none",
    background: "#eee",
    padding: "10px 16px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "14px",
  },
  chipActive: {
    background: "#c58f68",
    color: "#fff",
  },
  button: {
    width: "fit-content",
    border: "none",
    background: "#c58f68",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
  },
  summaryRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  summaryLabel: {
    margin: 0,
    fontSize: "14px",
    opacity: 0.9,
  },
  summaryValue: {
    margin: "8px 0 0",
    fontSize: "28px",
    fontWeight: 700,
  },
  chartCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    color: "#222",
  },
  chartHeader: {
    marginBottom: "16px",
  },
  chartTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 700,
  },
  chart: {
    height: "220px",
    display: "flex",
    alignItems: "flex-end",
    gap: "14px",
  },
  barWrap: {
    flex: 1,
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
  },
  bar: {
    width: "100%",
    background: "#d8b08b",
    borderRadius: "10px 10px 0 0",
  },
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  infoCardBrown: {
    background: "#6f4f3d",
    borderRadius: "18px",
    padding: "18px",
    color: "#fff",
  },
  infoCardDark: {
    background: "#4a4a4a",
    borderRadius: "18px",
    padding: "18px",
    color: "#fff",
  },
  infoTitle: {
    margin: 0,
    fontSize: "15px",
    fontWeight: 700,
    lineHeight: 1.4,
  },
  infoText: {
    margin: "10px 0 0",
    fontSize: "13px",
    opacity: 0.85,
    lineHeight: 1.5,
  },
};



