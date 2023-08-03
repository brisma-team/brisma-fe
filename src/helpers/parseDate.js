const parseDate = (dateString, character) => {
  const [year, month, day] = dateString.split("-");
  return `${year}${character}${month}${character}${day}`;
};

export default parseDate;
