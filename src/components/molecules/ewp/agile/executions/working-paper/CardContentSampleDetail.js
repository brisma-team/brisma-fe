import { Card, DivButton } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { IconUpload } from "@/components/icons";

const Content = ({ property, value }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="font-bold">{property} :</div>
      <div className="font-medium">{value}</div>
    </div>
  );
};

const CardContentSampleDetail = ({
  data,
  handleClickUploadSample,
  children,
}) => {
  return (
    <Card>
      <div className="flex flex-col gap-4 w-full py-2 px-4">
        <CardContentHeaderFooter>
          <div className="flex">
            <div className="w-full p-3 flex flex-col gap-3 max-h-[12rem] overflow-y-scroll">
              <Content property={"Populasi"} value={data?.populasi} />
              <Content property={"Jumlah Sample"} value={data?.jumlah_sample} />
            </div>
            <DivButton
              className="w-48 border-l-2 border-neutral-200 flex gap-1 items-center justify-center hover:bg-gray-100"
              handleClick={handleClickUploadSample}
            >
              <IconUpload size="xlarge" />
              <div className="text-sm font-bold break-words w-[4.5rem]">
                UPLOAD SAMPLE
              </div>
            </DivButton>
          </div>
        </CardContentHeaderFooter>
        {children}
      </div>
    </Card>
  );
};

export default CardContentSampleDetail;
