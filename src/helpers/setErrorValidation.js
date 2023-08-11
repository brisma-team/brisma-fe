const setErrorValidation = (data, dispatch, schemaMapping) => {
  try {
    const validationSchema = schemaMapping.schema;
    validationSchema.validateSync(data, { abortEarly: false });
    dispatch(schemaMapping.resetErrors());
    return true;
  } catch (err) {
    if (err.inner) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      dispatch(schemaMapping.setErrors(errors));
    }
    return false;
  }
};

export default setErrorValidation;
