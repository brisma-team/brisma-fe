const FormWithLabel = ({ label, form, labelPositionTop, widthFull }) => {
  return (
    <div
      className={`flex ${
        labelPositionTop ? `items-start` : `items-center`
      } my-4`}
    >
      <div className="w-2/5 text-sm font-semibold">{label}</div>
      <div className={widthFull ? `w-3/5` : `w-32 pr-2.5`}>{form}</div>
      {/* w-24 */}
    </div>
  );
};

export default FormWithLabel;
