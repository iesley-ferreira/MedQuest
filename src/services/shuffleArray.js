export const shuffleArray = (array) => {
  const parameter = 0.5;
  const shuffledArray = array.sort(() => Math.random() - parameter);
  return shuffledArray;
};
