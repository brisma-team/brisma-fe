const CardContent = ({ className, children }) => {
  return (
    <div
      className={`border-2 border-gray-200 rounded-lg p-2.5 w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContent;
