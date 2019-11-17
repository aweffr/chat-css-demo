export const randInt = (lo: number = 0, hi: number = 100): number => {
  const r = Math.random() * (hi - lo) - lo;
  return Math.floor(r);
};