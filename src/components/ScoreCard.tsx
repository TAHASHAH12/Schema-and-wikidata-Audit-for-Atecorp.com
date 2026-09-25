interface Props {
  value: string;
  label: string;
  sub?: string;
  warn?: boolean;
  good?: boolean;
}

export default function ScoreCard({ value, label, sub, warn, good }: Props) {
  const cls = warn ? " warn" : good ? " good" : "";
  return (
    <div className="score">
      <div className={`v${cls}`}>{value}</div>
      <div className="k">{label}</div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}
