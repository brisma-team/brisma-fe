const FormWithLabel = ({ label, form, labelPositionTop, widthFull }) => {
  return (
    <div
      className={`flex ${
        labelPositionTop ? `items-start` : `items-center`
      } my-4`}
    >
      <div className="w-2/5 text-sm font-semibold">{label}</div>
      <div className={widthFull ? `w-3/5` : `w-24 pr-0.5`}>{form}</div>
    </div>
  );
};

export default FormWithLabel;
