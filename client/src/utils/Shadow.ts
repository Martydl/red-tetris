export const genShadow = (gameBoard: number[][]): number[] => {
  var shadow: number[] = new Array(10).fill(20);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
      if (gameBoard[y][x] == 0) {
        shadow[x]--;
      } else {
        break;
      }
    }
  }
  return shadow;
};

export const genFullShadow = (shadow: number[]): number[][] => {
  var fullShadow: number[][] = new Array(20);
  for (let y = 0; y < 20; y++) {
    fullShadow[y] = new Array(10);
    for (let x = 0; x < 10; x++) {
      fullShadow[y][x] = y < 20 - shadow[x] ? 0 : 15;
    }
  }
  return fullShadow;
};
