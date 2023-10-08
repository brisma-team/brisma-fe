const parseInteger = (value) => {
  if (isNaN(parseInt(value))) {
    return 0;
  } else {
    return parseInt(value);
  }
};

export default parseInteger;
