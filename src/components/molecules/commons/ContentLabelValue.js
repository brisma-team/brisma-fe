const ContentLabelValue = ({
  label,
  value,
  classNameDivParent,
  classNameLabel,
  classNameValue,
}) => {
  return (
    <div className={classNameDivParent || "leading-3 text-sm"}>
      <p className={classNameLabel || "font-semibold"}>{label}</p>
      <p className={classNameValue && classNameValue}>{value}</p>
    </div>
  );
};

export default ContentLabelValue;
