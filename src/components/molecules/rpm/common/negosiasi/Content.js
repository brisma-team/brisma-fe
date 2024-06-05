const Content = ({ title, value, titleColor, textColor }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className={`text-sm ${titleColor || "text-brisma"} font-bold`}>
        {title} :
      </div>
      <div className={`text-sm ${textColor || "text-brisma"}`}>{value}</div>
    </div>
  );
};

export default Content;
