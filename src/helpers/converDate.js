const convertDate = (value, character, firstLetter) => {
  const dateObj = new Date(value);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = String(dateObj.getDate()).padStart(2, "0");

  if (firstLetter === "d") {
    return `${date}${character}${month}${character}${year}`;
  }

  return `${year}${character}${month}${character}${date}`;
};

export default convertDate;
