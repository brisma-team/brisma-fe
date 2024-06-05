const CardContent = ({ className, children }) => {
  return (
    <div
      className={`border-2 border-gray-200 rounded-lg p-2.5 w-full bg-white ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContent;
