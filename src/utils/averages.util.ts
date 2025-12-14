/**
 * Calcula un promedio acumulado de forma incremental
 *
 * @param previousAverage Promedio anterior
 * @param previousCount Cantidad de elementos previos
 * @param newValue Nuevo valor a incorporar
 */
export const calculateIncrementalAverage = (
  previousAverage: number,
  previousCount: number,
  newValue: number
): number => {
  if (previousCount < 0) {
    throw new Error("previousCount cannot be negative");
  }

  return (
    (previousAverage * previousCount + newValue) /
    (previousCount + 1)
  );
};

/**
 * Calcula el máximo entre dos valores de forma segura
 */
export const calculateMax = (currentMax: number, newValue: number): number => {
  return Math.max(currentMax, newValue);
};

/**
 * Calcula promedio simple de un array numérico
 */
export const calculateAverageFromArray = (values: number[]): number => {
  if (!values.length) return 0;

  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};
