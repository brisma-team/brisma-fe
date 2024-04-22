import { Card } from "@/components/atoms";
import Link from "next/link";

const CardModuleDashboard = ({
  data,
  color = "text-atlasian-green",
  defaultWidth = "w-[28rem]",
  contentPercent = "w-3/5",
}) => {
  let borderColor = "green";
  switch (color) {
    case "text-atlasian-green":
      borderColor = "green";
      break;
    case "text-atlasian-red":
      borderColor = "red";
      break;
    case "text-atlasian-yellow":
      borderColor = "yellow";
      break;
    case "text-atlasian-blue":
      borderColor = "blue";
      break;
    case "text-atlasian-brown":
      borderColor = "brown";
      break;
  }
  return data?.length
    ? data?.map((v, i) => {
        return (
          <Link
            key={i}
            href={v?.url}
            target={`${v?.isBlank ? "_blank" : ""}`}
            className={`no-underline ${defaultWidth} ${
              v?.isDisabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <Card hoverBorderColor={borderColor}>
              <div className="px-4 py-2 flex justify-end">
                <div className={contentPercent}>
                  <p className={`font-semibold no-underline ${color} text-lg`}>
                    {v?.subtitle}
                  </p>
                  <p className="font-bold text-xl -mt-1">{v?.title}</p>
                  <p className="text-sm">{v?.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        );
      })
    : "";
};

export default CardModuleDashboard;
