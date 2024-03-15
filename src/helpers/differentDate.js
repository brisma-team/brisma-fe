const { default: convertDate } = require("./converDate");

const differentDate = (start_date, end_date) => {
  if (start_date == end_date) {
    return "-";
  }

  const diffDate =
    convertDate(end_date, "") - convertDate(start_date, "");

  return `${diffDate} days`;
};

export default differentDate;
