export const fmtInt = (n: number): string => Math.round(n).toLocaleString("en-US");

export const fmtCompact = (n: number): string =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export const fmtPct = (n: number, digits = 1): string => `${n.toFixed(digits)}%`;

export const fmtDec = (n: number, digits = 2): string => n.toFixed(digits);

export const fmtSigned = (n: number, digits = 2): string => (n > 0 ? "+" : "") + n.toFixed(digits);

export const fmtR = (n: number): string => {
  const v = n.toFixed(2);
  return n >= 0 ? ` ${v}` : v;
};

export const fmtP = (p: number): string => (p < 0.0001 ? "<0.0001" : p.toFixed(4));
