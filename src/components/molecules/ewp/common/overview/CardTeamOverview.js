const CardTeamOverview = ({ title, value, titleColor }) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className={`text-xs ${titleColor} font-semibold`}>{title}</div>
      {value?.length
        ? value?.map((v, i) => (
            <div key={i} className="text-xs">{`${v?.pn} - ${v?.nama}`}</div>
          ))
        : ""}
    </div>
  );
};

export default CardTeamOverview;
