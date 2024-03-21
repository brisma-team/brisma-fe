const CardTitleValue = ({
  title,
  value,
  textColor,
  className,
  widthTitle,
  widthValue,
}) => {
  return (
    <div className={`text-base flex w-full border-b`}>
      <div
        className={`${
          widthTitle || "w-1/2"
        } font-semibold px-2 text-xs py-1 h-full flex items-center`}
      >
        {title}
      </div>
      <div
        className={`${widthValue || "w-1/2"} ${
          className || "font-medium"
        } border-l text-xs px-2 py-1 ${textColor}`}
      >
        {value}
      </div>
    </div>
  );
};

export default CardTitleValue;
