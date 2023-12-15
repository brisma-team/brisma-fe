import { ButtonIcon, Card, DivButton } from "@/components/atoms";
import { IconBullet } from "@/components/icons";
import { DropdownCard } from "@/components/molecules/commons";
import useUser from "@/data/useUser";
import { convertDate } from "@/helpers";
import { useRouter } from "next/router";

const Content = ({ title, text }) => {
  return (
    <div className="w-full flex text-base">
      <div className="font-semibold w-1/2">{title}</div>
      <div className="w-1/2">{text}</div>
    </div>
  );
};

const CardOverview = ({
  data,
  handleEnableTemplate,
  handleDisableTemplate,
  handleClickSimulation,
  handleClickApproval,
  handleClickDownload,
  handleDeleteTemplate,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const listDropdown = [
    {
      label: "Aktifkan",
      action: () => handleEnableTemplate(data.id),
      isDisabled: !(
        data.status_persetujuan === "Final" &&
        !data.is_active &&
        user?.data?.pn == data.createdBy
      ),
    },
    {
      label: "Non-Aktifkan",
      action: () => handleDisableTemplate(data.id),
      isDisabled: !(data.is_active && user?.data?.pn == data.createdBy),
    },
    {
      label: "Simulasi",
      action: () => handleClickSimulation(data.id),
    },
    {
      label: "Approval",
      action: async () => await handleClickApproval(data.id),
    },
    { label: "Download", action: async () => handleClickDownload(data.id) },
    { label: "Hapus", action: async () => await handleDeleteTemplate(data.id) },
  ];

  const bgColor = {
    CSS: "bg-purple-300",
    AL: "bg-blue-300",
    PR: "bg-green-300",
    SBP: "bg-orange-300",
  };

  return (
    <DivButton
      className="hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
      handleClick={() => router.push(`overview/${data.id}`)}
    >
      <Card>
        <div className="w-full py-3">
          <div className="flex justify-between items-center px-2">
            <div className="mb-2 -ml-2 -mt-5">
              <div
                className={`text-base font-semibold rounded-tl-lg text-brisma ${
                  bgColor[data.jenis_kode]
                } px-5 h-9 flex items-center justify-center`}
              >
                <p>{data.jenis_nama?.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex justify-end gap-1 items-center -mt-3">
              <DropdownCard actions={listDropdown} />
              <ButtonIcon
                isDisabled
                color={"red"}
                icon={
                  <div
                    className={`w-full h-full flex items-center ${
                      data.is_active
                        ? "text-atlasian-yellow"
                        : "text-atlasian-red"
                    }`}
                  >
                    <IconBullet size="large" />
                  </div>
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 px-4">
              <div className="text-xl font-bold text-atlasian-blue-dark">
                {data.kode}
              </div>
              <div className="text-base font-bold text-atlasian-blue-dark">
                {data.title}
              </div>
              <div className="text-base text-justify text-atlasian-blue-dark">
                {data.desc}
              </div>
            </div>
            <hr />
            <div className="w-full flex flex-col gap-1 px-4">
              <Content title={"Nama Pembuat"} text={data.createdBy} />
              <Content
                title={"Tanggal Pembuatan"}
                text={convertDate(data.createdAt, "-", "d")}
              />
              <Content
                title={"Tanggal Approval"}
                text={convertDate(data.approvalAt, "-", "d")}
              />
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOverview;
