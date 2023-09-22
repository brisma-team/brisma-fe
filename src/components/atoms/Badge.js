import BadgeAtlaskit from "@atlaskit/badge";

const Badge = ({ appearance, text }) => {
  return <BadgeAtlaskit appearance={appearance}>{text}</BadgeAtlaskit>;
};

export default Badge;
