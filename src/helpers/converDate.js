const convertDate = (value, character, firstLetter, withFullTime) => {
  if (!value) {
    return "-";
  }

  const dateObj = new Date(value);

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const date = dateObj.getDate().toString().padStart(2, "0");
  const time =
    withFullTime && firstLetter === "d"
      ? ` ${dateObj.getHours()}:${dateObj.getMinutes()}`
      : "";

  return firstLetter === "d"
    ? `${date}${character}${month}${character}${year}${time}`
    : `${year}${character}${month}${character}${date}`;
};

export default convertDate;
