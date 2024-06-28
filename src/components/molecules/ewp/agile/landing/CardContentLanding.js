import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { ButtonIcon, CardLanding } from "@/components/atoms";
import { IconChevronUp, IconChevronDown } from "@/components/icons";
import { useState } from "react";

const CardContentLanding = ({ content, title, isDisabled }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <CardContentHeaderFooter
      header={
        <div className="flex justify-between items-center">
          <div className="w-full flex gap-3">
            <div className="w-36 h-10 px-3 rounded-ss-lg bg-atlasian-red text-white font-semibold text-lg flex items-center">
              Open
            </div>
            <div className="font-semibold text-base w-full flex items-center">
              {title || ""}
            </div>
          </div>
          <ButtonIcon
            handleClick={() => setShowContent(!showContent)}
            icon={showContent ? <IconChevronUp /> : <IconChevronDown />}
            isDisabled={isDisabled}
          />
        </div>
      }
    >
      <div className="pt-2 pb-6 px-4">
        {showContent ? (
          content?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
              {content?.map((value, index) => {
                return (
                  <CardLanding
                    key={index}
                    title={value?.title}
                    description={value?.description}
                    status={value?.status}
                    url={value?.url}
                  />
                );
              })}
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </CardContentHeaderFooter>
  );
};

export default CardContentLanding;
