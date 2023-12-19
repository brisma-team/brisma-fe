import Link from "next/link";

const LinkIcon = ({ href, color, handler, icon, isDisabled, isBlank }) => {
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
    default:
      iconColor = "text-black";
  }

  if (isDisabled) {
    return (
      <span className={`${isDisabled && `cursor-not-allowed`} ${iconColor}`}>
        {icon}
      </span>
    );
  }

  return (
    <Link
      target={isBlank && "_blank"}
      href={!href ? "#" : href}
      onClick={handler && handler}
      className={`no-underline hover:no-underline ${iconColor} hover:${iconColor}`}
    >
      {icon}
    </Link>
  );
};

export default LinkIcon;
