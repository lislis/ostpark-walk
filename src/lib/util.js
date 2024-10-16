// where point, center = [x, y]
export const withinRadius = (point, center, radius) => {
  return Math.pow(point[0] - center[0], 2) + Math.pow(point[1] - center[1], 2) < Math.pow(radius, 2);
};
