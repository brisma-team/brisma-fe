import { ButtonIcon, Card, CustomTooltip, DivButton } from "@/components/atoms";
import { IconBullet } from "@/components/icons";
import { DropdownCard } from "@/components/molecules/commons";
import useUser from "@/data/useUser";
import { checkRoleIsAdmin, convertDate } from "@/helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  handleTerminateRequestSurvey,
  handleDetailSurvey,
  handleDownloadSurvey,
  handleApprovalSurvey,
  handleChangeRespondenSurvey,
  handleExtensionRequestSurvey,
  handleShowScoreSurvey,
  handleDeleteSurvey,
}) => {
  const router = useRouter();
  const [isInitiator, setIsInitiator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    setIsAdmin(checkRoleIsAdmin(user.data.role_kode));
    setIsInitiator(data?.createdBy?.pn === user?.data?.pn);
  }, [user, data]);

  const listDropdown = [
    {
      label: "Hentikan",
      action: async () => {
        if (data.status_kode == 4) {
          await handleTerminateRequestSurvey(null, data.id, data.status_kode);
        } else {
          let catatanId, surveyId;
          if (data?.catatan_pemberhentian?.length) {
            catatanId = data?.catatan_pemberhentian[0]?.id;
            surveyId = data?.catatan_pemberhentian[0]?.survey_id;
          }

          await handleTerminateRequestSurvey(
            catatanId,
            surveyId,
            data.status_kode
          );
        }
      },
      isDisabled: !(
        (isAdmin || isInitiator) &&
        (data.status_kode == 4 || data.status_kode == 7)
      ),
    },
    {
      label: "Detail",
      action: () => handleDetailSurvey(data.id),
    },
    {
      label: "Download",
      action: async () => await handleDownloadSurvey(data.id),
    },
    { label: "Approval", action: async () => handleApprovalSurvey(data.id) },
    {
      label: "Responden",
      action: async () =>
        handleChangeRespondenSurvey(null, data.id, data.status_kode),
      isDisabled: !(
        (isAdmin || isInitiator) &&
        ![1, 2, 6, 7].includes(data.status_kode)
      ),
    },
    {
      label: "Perpanjang",
      action: async () => {
        if (data.status_kode == 5) {
          await handleExtensionRequestSurvey(null, data.id, data.status_kode);
        } else {
          let catatanId, surveyId;
          if (data?.catatan_perpanjangan?.length) {
            catatanId = data?.catatan_perpanjangan[0]?.id;
            surveyId = data?.catatan_perpanjangan[0]?.survey_id;
          }

          await handleExtensionRequestSurvey(
            catatanId,
            surveyId,
            data.status_kode
          );
        }
      },
      isDisabled: !(
        (isAdmin || isInitiator) &&
        (data.status_kode == 5 || data.status_kode == 6)
      ),
    },
    {
      label: "Lihat Nilai",
      action: async () => handleShowScoreSurvey(data.id),
      isDisabled: !(
        (isAdmin && [4, 5].includes(parseInt(data.status_kode))) ||
        (isInitiator && data.status_kode == 5)
      ),
    },
    {
      label: "Hapus",
      action: async () => await handleDeleteSurvey(data.id),
      isDisabled: !(data.status_kode == 1),
    },
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
              <CustomTooltip
                content={`Status Survei : ${data.status_name || ""}`}
              >
                <ButtonIcon
                  isDisabled
                  color={"red"}
                  icon={
                    <div
                      className={`w-full h-full flex items-center ${
                        data.status_kode == 4
                          ? "text-atlasian-green"
                          : "text-atlasian-red"
                      }`}
                    >
                      <IconBullet size="large" />
                    </div>
                  }
                />
              </CustomTooltip>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 px-4">
              <div className="text-xl font-bold text-atlasian-blue-dark">
                {data.kode.toUpperCase()}
              </div>
              <div className="text-base font-semibold text-atlasian-blue-dark -mt-1.5">
                {data.nama_survey}
              </div>
              <div className="text-base text-justify text-atlasian-blue-dark">
                {data.desc}
              </div>
              <div className="text-sm font-bold text-[#212121]">
                {data.tanggal_pelaksanaan}
              </div>
            </div>
            <hr />
            <div className="w-full flex flex-col gap-1 px-4">
              <Content title={"Nama Pembuat"} text={data.createdBy.fullName} />
              <Content
                title={"Tanggal Pembuatan"}
                text={convertDate(data.createdAt, "-", "d")}
              />
              <Content title={"Status Survei"} text={data.status_name || "-"} />
              <Content
                title={"Status Approval"}
                text={data.status_persetujuan || "-"}
              />
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOverview;
