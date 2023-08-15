const setErrorValidation = (data, dispatch, schemaMapping) => {
  try {
    const validationSchema = schemaMapping.schema;
    validationSchema.validateSync(data, { abortEarly: false });
    dispatch(schemaMapping.resetErrors());
    return true;
  } catch (err) {
    console.log("err => ", err);
    if (err.inner) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      console.log("ERRORS => ", errors);
      dispatch(schemaMapping.setErrors(errors));
    }
    return false;
  }
};

export default setErrorValidation;
