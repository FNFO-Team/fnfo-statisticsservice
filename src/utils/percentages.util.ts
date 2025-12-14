/**
 * Calcula un porcentaje (0 - 100) de forma segura
 */
export const calculatePercentage = (
  part: number,
  total: number
): number => {
  if (total <= 0) return 0;

  return (part / total) * 100;
};

/**
 * Calcula accuracy a partir de hits
 * Fórmula típica: (perfect + great) / total * 100
 */
export const calculateAccuracyFromHits = (hits: {
  perfect: number;
  great: number;
  good: number;
  miss: number;
}): number => {
  const total =
    hits.perfect + hits.great + hits.good + hits.miss;

  if (total === 0) return 0;

  return ((hits.perfect + hits.great) / total) * 100;
};

/**
 * Normaliza un porcentaje a N decimales
 */
export const normalizePercentage = (
  value: number,
  decimals = 2
): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};
