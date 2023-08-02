const calculatePercentage = (arr) => {
  const total = arr.length;
  const counts = {};

  // Hitung berapa kali masing-masing tipe muncul dalam array
  arr.forEach((item) => {
    counts[item] = (counts[item] || 0) + 1;
  });

  // Hitung persentase dari masing-masing tipe
  const percentages = {};
  Object.keys(counts).forEach((item) => {
    percentages[item] = (counts[item] / total) * 100;
  });

  return percentages;
};

export default calculatePercentage;
