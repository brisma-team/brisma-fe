import { Card, DivButton } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import Image from "next/image";
import { ImageReview } from "@/helpers/imagesUrl";

const Content = ({ property, value }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="font-bold">{property} :</div>
      <div className="font-medium">{value}</div>
    </div>
  );
};

const CardContentStoryPointDetail = ({
  data,
  handleClickOpenWorkingPapper,
  children,
}) => {
  return (
    <Card>
      <div className="flex flex-col gap-4 w-full py-2 px-4">
        <CardContentHeaderFooter>
          <div className="flex">
            <div className="w-[70%] p-3 flex gap-4 max-h-[12rem] overflow-y-scroll">
              <div className="w-1/2 flex flex-col gap-3">
                <Content
                  property={"Sprint"}
                  value={`${data?.sprint?.no} - ${data?.sprint?.name}`}
                />
                <Content
                  property={"Story Point"}
                  value={`${data?.risk?.abbr} - ${data?.risk?.name}`}
                />
                <Content
                  property={"UKER / DIVISI"}
                  value={
                    data?.uker?.length ? (
                      <ul className="list-disc w-full pl-2.5">
                        {data?.uker?.map((data, index) => {
                          return (
                            <li
                              key={index}
                            >{`[${data?.orgeh?.kode}][${data?.branch?.kode}] - [${data?.branch?.nama}]`}</li>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )
                  }
                />
              </div>
              <div className="w-1/2 flex flex-col gap-3">
                <Content property={"Feature"} value={data?.feature} />
                <Content
                  property={"Estimate"}
                  value={`${data?.estimate || 0} Hari`}
                />
                <Content property={"Priority"} value={data?.priority} />
                <Content
                  property={"Definition of Ready"}
                  value={data?.definition_of_ready}
                />
                <Content
                  property={"Definition of Done"}
                  value={data?.definition_of_done}
                />
              </div>
            </div>
            <div className="w-[30%] p-3 max-h-[12rem] overflow-y-scroll border-l-2">
              <Content
                property={"AGILE TEAM"}
                value={
                  data?.team?.length ? (
                    <ul className="list-disc w-full mt-0 pl-3">
                      {data?.team?.map((data, index) => {
                        return (
                          <li key={index}>
                            {`${data?.pic?.pn} - ${data?.pic?.name} ( ${data?.role} )`}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    ""
                  )
                }
              />
            </div>
            <DivButton
              className="w-48 border-l-2 border-neutral-200 flex items-center justify-center hover:bg-gray-100"
              handleClick={handleClickOpenWorkingPapper}
            >
              <Image alt="" src={ImageReview} height={50} width={50} />
              <div className="text-sm font-bold break-words w-[4.5rem]">
                WORKING PAPPER
              </div>
            </DivButton>
          </div>
        </CardContentHeaderFooter>
        {children}
      </div>
    </Card>
  );
};

export default CardContentStoryPointDetail;
