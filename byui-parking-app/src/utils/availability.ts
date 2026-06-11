export function getAvailabilityColor(available: number, total: number): string {
  const pct = available / total;
  if (pct > 0.3) return "var(--green)";
  if (pct > 0.1) return "var(--yellow)";
  return "var(--red)";
}

export function getAvailabilityLabel(available: number, total: number): string {
  const pct = available / total;
  if (pct > 0.3) return "Open";
  if (pct > 0.1) return "Limited";
  return "Almost Full";
}