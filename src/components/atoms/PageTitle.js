const PageTitle = ({ text, className }) => {
  return (
    <div className="flex-1">
      <div className={`text-3xl font-bold ${className}`}>{text}</div>
    </div>
  );
};

export default PageTitle;
