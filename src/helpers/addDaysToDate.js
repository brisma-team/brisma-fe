const addDaysToDate = (inputDate, operator, numberOfDays) => {
  if (!inputDate) return null;
  const currentDate = new Date(inputDate);

  switch (operator) {
    case "+":
      currentDate.setDate(currentDate.getDate() + parseInt(numberOfDays));
      break;
    case "-":
      currentDate.setDate(currentDate.getDate() - parseInt(numberOfDays));
      break;
    default:
      currentDate.setDate(currentDate.getDate() + parseInt(numberOfDays));
  }

  const nextDate = currentDate.toISOString().split("T")[0];
  return nextDate;
};

export default addDaysToDate;
