const generateAlphabet = (idx) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const arrayOfLetters = letters.split("");
  return arrayOfLetters[idx];
};

export default generateAlphabet;
