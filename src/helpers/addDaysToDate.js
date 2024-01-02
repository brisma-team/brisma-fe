const addDaysToDate = (inputDate, numberOfDays) => {
  if (!inputDate) return null;
  const currentDate = new Date(inputDate);
  currentDate.setDate(currentDate.getDate() + parseInt(numberOfDays));
  const nextDate = currentDate.toISOString().split("T")[0];
  return nextDate;
};

export default addDaysToDate;
