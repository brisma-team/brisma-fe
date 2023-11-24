import { withTokenConfig } from "@/helpers";

const ButtonIcon = ({
  ref,
  color,
  icon,
  handleClick,
  className,
  props,
  isDisabled,
  handleMouseEnter,
  handleMouseLeave,
  downloadUrl,
  downloadFilename,
}) => {
  let iconColor;
  switch (color) {
    case "red":
      iconColor = "text-atlasian-red";
      break;
    case "yellow":
      iconColor = "text-atlasian-yellow";
      break;
    case "blue":
      iconColor = "text-atlasian-blue-light";
      break;
    case "purple":
      iconColor = "text-atlasian-purple";
      break;
    case "gray":
      iconColor = "text-atlasian-gray-dark";
      break;
    default:
      iconColor = "text-black";
  }

  const onClick = (e) => {
    if (downloadUrl) {
      const { headers } = withTokenConfig();
      fetch(downloadUrl, { headers })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = downloadFilename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error("Error downloading file:", error));
    }
    handleClick(e);
  };

  if (isDisabled) {
    return (
      <div
        className={`${className} ${iconColor} ${
          isDisabled && "cursor-not-allowed"
        }`}
      >
        {icon}
      </div>
    );
  }

  return (
    <div
      {...props}
      ref={ref && ref}
      role="button"
      tabIndex={0}
      className={`${className} ${iconColor} ${
        isDisabled && "cursor-not-allowed"
      }`}
      onClick={downloadUrl ? onClick : handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === "Space") {
          return;
        }
      }}
      onMouseEnter={handleMouseEnter && handleMouseEnter}
      onMouseLeave={handleMouseLeave && handleMouseLeave}
    >
      {icon}
    </div>
  );
};

export default ButtonIcon;
