const findDataFromArray = (data, keyObject, user) => {
  if (data?.length) {
    const find = data?.find((v) => v[keyObject] === user);
    if (find) {
      return true;
    }
  }
  return false;
};

export default findDataFromArray;
