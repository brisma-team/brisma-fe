const convertToNominal = (value) => {
  if (isNaN(parseInt(value))) {
    return 0;
  } else if (parseInt(value) > 2000000000) {
    return 2000000000;
  } else {
    return parseInt(value);
  }
};

export default convertToNominal;
