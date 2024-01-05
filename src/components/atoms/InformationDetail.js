const InformationDetail = ({
  title,
  description,
  widthTitle,
  widthDescription,
}) => {
  return (
    <div className="flex">
      <div className={`${widthTitle} text-base font-semibold`}>{title}</div>
      <div className="w-4 text-base font-semibold">:</div>
      <div className={`${widthDescription} text-base font-semibold`}>
        {description}
      </div>
    </div>
  );
};

export default InformationDetail;
