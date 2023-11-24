const decimalToPercentage = (decimal) => {
  if (isNaN(decimal)) return 0;
  const percentage = (decimal * 100).toFixed(0);
  return `${percentage}%`;
};

export default decimalToPercentage;
