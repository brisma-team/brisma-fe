const FormLabel = ({ title, form, validationError }) => {
  return (
    <div className="w-full  flex flex-col gap-2">
      <p className="pl-1 text-sm font-semibold">{title}</p>
      {form}
      {validationError}
    </div>
  );
};

export default FormLabel;
