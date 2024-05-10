const getYearsList = (start) => {
  const startYear = start || 2000;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push({ label: year.toString(), value: year });
  }

  return years;
};

export default getYearsList;
