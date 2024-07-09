import {
  CardContentHeaderFooter,
  RiskSelect,
} from "@/components/molecules/commons";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import { useState } from "react";
import { IconChevronDown, IconChevronUp, IconClose } from "@/components/icons";

const Row = ({ title, desc, data, withoutBorderBottom }) => {
  const center = `flex items-center`;
  return (
    <div className="flex">
      <div
        className={`border-r-2 ${
          withoutBorderBottom ? "" : "border-b-2"
        } border-atlasian-gray-light ${center} w-1/3 flex-wrap text-justify p-2 font-semibold`}
      >
        {desc ? (
          <div>
            <div className="text-sm font-bold">{title}</div>
            <div className="text-xs italic">{desc}</div>
          </div>
        ) : (
          <p className="text-sm font-bold">{title}</p>
        )}
      </div>
      <div
        className={`${
          withoutBorderBottom ? "" : "border-b-2"
        } border-atlasian-gray-light w-2/3 ${center} flex-wrap p-2`}
      >
        {data}
      </div>
    </div>
  );
};

const CardContentStoryPoint = ({
  data,
  payload,
  handleSubmit,
  handleChangePayload,
  handleResetPayload,
}) => {
  const [showContent, setShowContent] = useState(true);

  return (
    <CardContentHeaderFooter
      header={
        <div className="h-12 flex justify-between items-center px-3">
          <div className="font-semibold text-base w-full">
            STORY POINT INSERTION
          </div>
          <ButtonIcon
            handleClick={() => setShowContent(!showContent)}
            icon={showContent ? <IconChevronUp /> : <IconChevronDown />}
          />
        </div>
      }
      width={"w-[40rem]"}
      footer={
        <div className="w-full flex justify-end p-3">
          <div className="bg-atlasian-green rounded-md w-32">
            <ButtonField text={"Insert"} handler={handleSubmit} />
          </div>
        </div>
      }
      withoutBorderTop={!showContent}
    >
      {showContent ? (
        <>
          <Row
            title={"STORY POINT"}
            desc={"(RISK ISSUE / CONTROL)"}
            data={
              <div className="w-full">
                <RiskSelect
                  selectedValue={
                    payload?.kode
                      ? {
                          label: `${payload?.abbr} - ${payload?.nama}`,
                          value: payload,
                        }
                      : null
                  }
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={handleResetPayload}
                    />
                  }
                  handleChange={(e) => handleChangePayload(e.value)}
                  placeholder={"Pilih resiko"}
                />
              </div>
            }
          />
          <Row
            title={"EPIC"}
            desc={"(SUB MAJOR RISK)"}
            data={
              <p>
                {data?.sub_major?.kode ? (
                  <p className="text-xs font-bold">
                    {data?.sub_major?.abbr} -{" "}
                    <span className="font-normal">{data?.sub_major?.nama}</span>
                  </p>
                ) : (
                  ""
                )}
              </p>
            }
          />
          <Row
            title={"MAJOR"}
            data={
              <p>
                {data?.major?.kode ? (
                  <p className="text-xs font-bold">
                    {data?.major?.abbr} -{" "}
                    <span className="font-normal">{data?.major?.nama}</span>
                  </p>
                ) : (
                  ""
                )}
              </p>
            }
          />
          <Row
            title={"MEGA"}
            data={
              <p>
                {data?.mega?.kode ? (
                  <p className="text-xs font-bold">
                    {data?.mega?.abbr} -{" "}
                    <span className="font-normal">{data?.mega?.nama}</span>
                  </p>
                ) : (
                  ""
                )}
              </p>
            }
            withoutBorderBottom
          />
        </>
      ) : (
        ""
      )}
    </CardContentHeaderFooter>
  );
};

export default CardContentStoryPoint;
