const FormWithLabel = ({ label, form, labelPositionTop }) => {
  return (
    <div
      className={`flex ${
        labelPositionTop ? `items-start` : `items-center`
      } my-4`}
    >
      <div className="w-2/5 text-sm font-semibold">{label}</div>
      <div className="w-3/5">{form}</div>
    </div>
  );
};

export default FormWithLabel;
