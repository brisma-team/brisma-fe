import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconBullet } from "@/components/icons";
import { DropdownCard } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";

const Content = ({ title, text }) => {
  return (
    <div className="w-full flex text-base">
      <div className="font-semibold w-1/2">{title}</div>
      <div className="w-1/2">{text}</div>
    </div>
  );
};

const CardOverview = ({
  kode,
  title,
  type,
  desc,
  createdBy,
  createdAt,
  approvalAt,
  bgColor,
  handleEnableTemplate,
  handleDetailTemplate,
  handleShowScore,
  handleDeleteTemplate,
}) => {
  const listDropdown = [
    { label: "Aktifkan", action: () => handleEnableTemplate(kode) },
    { label: "Detail", action: () => handleDetailTemplate() },
    { label: "Lihat Nilai", action: handleShowScore },
    { label: "Hapus", action: handleDeleteTemplate },
  ];

  return (
    <DivButton
      className="hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
      handleClick={() => console.log("test")}
    >
      <Card>
        <div className="w-full py-3">
          <div className="flex justify-between items-center px-2">
            <div className="mb-2 -ml-2 -mt-5">
              <div
                className={`text-base font-semibold rounded-tl-lg text-brisma ${bgColor} px-5 h-9 flex items-center justify-center`}
              >
                <p>{type?.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex justify-end gap-1 items-center -mt-3">
              <DropdownCard actions={listDropdown} />
              <ButtonIcon
                isDisabled
                color={"red"}
                icon={
                  <div className="w-full h-full flex items-center">
                    <IconBullet size="large" />
                  </div>
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 px-4">
              <div className="text-xl font-bold text-atlasian-blue-dark">
                {kode}
              </div>
              <div className="text-base font-bold text-atlasian-blue-dark">
                {title}
              </div>
              <div className="text-base text-justify text-atlasian-blue-dark">
                {desc}
              </div>
            </div>
            <hr />
            <div className="w-full flex flex-col gap-1 px-4">
              <Content title={"Nama Pembuat"} text={createdBy} />
              <Content
                title={"Tanggal Pembuatan"}
                text={convertDate(createdAt, "-", "d")}
              />
              <Content
                title={"Tanggal Approval"}
                text={convertDate(approvalAt, "-", "d")}
              />
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOverview;
