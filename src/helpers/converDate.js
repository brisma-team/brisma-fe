const convertDate = (value, character) => {
  const dateObj = new Date(value);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const date = String(dateObj.getDate()).padStart(2, "0");

  return `${year}${character}${month}${character}${date}`;
};

export default convertDate;
