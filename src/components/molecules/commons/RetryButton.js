import { IconRetry } from "@/components/icons";

const RetryButton = ({ size, className }) => {
  return (
    <div
      className={`rounded-full w-5 h-5 flex items-center justify-center p-1 ${
        className && className
      }`}
    >
      <IconRetry size={size || "medium"} />
    </div>
  );
};

export default RetryButton;
