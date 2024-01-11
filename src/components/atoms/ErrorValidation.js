const ErrorValidation = ({ message, className }) => {
  return (
    <span
      className={`text-atlasian-red mt-1 text-xs ${className && className}`}
    >
      {message}
    </span>
  );
};

export default ErrorValidation;
