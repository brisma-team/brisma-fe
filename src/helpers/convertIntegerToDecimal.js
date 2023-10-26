import convertToNominal from "./convertToNominal";
import parseInteger from "./parseInteger";

const convertIntegerToDecimal = (value) => {
  const numericValue = value.replace(/[^0-9]/g, "");
  const integerValue = parseInteger(numericValue, 10);
  const integer = convertToNominal(integerValue);

  const decimal = new Intl.NumberFormat("id-ID").format(integer);

  return { integer, decimal };
};

export default convertIntegerToDecimal;
