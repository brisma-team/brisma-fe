const Content = ({ title, value }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="text-sm text-brisma font-bold">{title} :</div>
      <div className="text-sm text-brisma">{value}</div>
    </div>
  );
};

export default Content;
