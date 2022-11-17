export const getPoints = (level: number, nbCompletLine: number) => {
  switch (nbCompletLine) {
    case 1:
      return 40 * (level + 1);
    case 2:
      return 100 * (level + 1);
    case 3:
      return 300 * (level + 1);
    case 4:
      return 1200 * (level + 1);
    default:
      return 0;
  }
};
