const decimalToPercentage = (decimal) => {
  const percentage = (decimal * 100).toFixed(0);
  return `${percentage}%`;
};

export default decimalToPercentage;
