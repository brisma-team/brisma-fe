const capitalizeEveryWord = (inputString) => {
  // Pisahkan string menjadi array kata-kata
  const words = inputString.split(" ");

  // Capitalize setiap kata
  const capitalizedWords = words.map((word) => {
    // Pastikan kata tidak kosong
    if (word.length === 0) {
      return word;
    }

    // Capitalize huruf pertama dan gabungkan dengan sisa huruf
    return word[0].toUpperCase() + word.slice(1);
  });

  // Gabungkan kembali array kata-kata menjadi string
  const resultString = capitalizedWords.join(" ");

  return resultString;
};

export default capitalizeEveryWord;
