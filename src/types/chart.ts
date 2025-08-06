// Chart utility types
export interface ChartDataItem {
  label: string;
  value: number;
  color: string;
  percentage: number;
  baseRadius: number;
  maxRadius: number;
}

export interface CartesianPoint {
  x: number;
  y: number;
}

export type PolarToCartesianFunction = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => CartesianPoint;

export type CreatePiePathFunction = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  innerRadius?: number
) => string;
