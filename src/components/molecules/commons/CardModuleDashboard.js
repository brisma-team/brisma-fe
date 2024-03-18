import { Card } from "@/components/atoms";
import Link from "next/link";

const CardModuleDashboard = ({ data }) => {
  return data?.length
    ? data?.map((v, i) => {
        return (
          <Link
            key={i}
            href={v?.url}
            target={`${v?.isBlank ? "_blank" : ""}`}
            className={`no-underline w-[28rem] ${
              v?.isDisabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            <Card>
              <div className="px-4 py-2 flex justify-end">
                <div className="w-3/5">
                  <p className="font-semibold no-underline text-atlasian-green text-lg">
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
