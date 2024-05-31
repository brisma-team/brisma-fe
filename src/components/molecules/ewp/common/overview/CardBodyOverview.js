const CardBodyOverview = ({ title, value, textColor, className }) => {
  return (
    <div className={`text-base flex w-full border-b`}>
      <div className="w-1/2 font-semibold px-2 text-xs py-1 h-full flex items-center">
        {title}
      </div>
      <div
        className={`w-1/2 ${
          className || "font-medium"
        } text-xs px-2 py-1 ${textColor} border-l`}
      >
        {value}
      </div>
    </div>
  );
};

export default CardBodyOverview;
