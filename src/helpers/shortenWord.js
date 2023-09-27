const shortenWord = (text, start, total) => {
  return text.length > total ? text.substring(start, total) + "..." : text;
};

export default shortenWord;
