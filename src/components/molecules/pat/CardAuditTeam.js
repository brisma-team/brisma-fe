import Link from "next/link";
import { ButtonIcon, Card } from "@/components/atoms";
import { IconEdit, IconTrash } from "@/components/icons";
import { deleteSwal } from "@/helpers";
import useAuditTeam from "@/data/pat/useAuditTeam";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAuditTeamData } from "@/slices/pat/auditTeamSlice";

const CardBody = ({ title, text, width, paddingLeft }) => {
  let textColor;
  switch (title) {
    case "Manajer Audit":
      textColor = "text-atlasian-blue-light";
      break;
    case "Ketua Tim Audit":
      textColor = "text-atlasian-red";
      break;
    case "Anggota Tim Audit":
      textColor = "text-atlasian-green";
      break;
    default:
      textColor = "text-[#172B4D]";
      break;
  }

  return (
    <div className={`mt-4 leading-normal text-base ${width} ${paddingLeft}`}>
      <div className={`${textColor} font-semibold`}>{title}</div>
      {title === "Anggota Tim Audit" ? (
        <div>
          {text?.map((v, i) => {
            return (
              <div className="w-full flex justify-between" key={i}>
                <div className="w-2/5">{v.name}</div>
                <div key={i} className="w-3/5">
                  {v?.uker?.map((x, idx) => {
                    return (
                      <div
                        key={idx}
                        className=""
                      >{`${x.orgeh_kode} - ${x.orgeh_name}`}</div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : Array.isArray(text) ? (
        text.map((v, i) => {
          return (
            <div key={i} className={``}>
              {v}
            </div>
          );
        })
      ) : (
        <div className={``}>{text}</div>
      )}
    </div>
  );
};

const CardAuditTeam = ({
  tim_id,
  pat_id,
  header_title,
  maker,
  created_at,
  manajer_audit,
  ketua_tim_audit,
  anggota_tim_audit,
  tipe_tim,
  button,
  setShowModal,
  isMutate,
  setTypeModal,
  withoutLabel,
}) => {
  const router = useRouter().query;
  const dispatch = useDispatch();

  const { auditTeam } = useAuditTeam("detail", {
    id: router.id,
    tim_id,
  });

  const handleDetail = (type) => {
    const mapppedData = {
      pat_id: pat_id,
      tim_audit_id: tim_id,
      name: auditTeam?.data?.name,
      ref_tipe_tim: auditTeam?.data?.ref_tipe_tim,
      ref_tim_audit_ma: auditTeam?.data?.ref_tim_audit_mas?.map((v) => ({
        pn: v?.pn_ma,
        nama: v?.nama_ma,
        jabatan: v?.jabatan,
      })),
      ref_tim_audit_kta: auditTeam?.data?.ref_tim_audit_kta?.map((v) => ({
        pn: v?.pn_kta,
        nama: v?.nama_kta,
        jabatan: v?.jabatan,
      })),
      ref_tim_audit_ata: auditTeam?.data?.ref_tim_audit_ata?.map((v) => ({
        pn: v?.pn_ata,
        nama: v?.nama_ata,
        jabatan: v?.jabatan,
        uker_binaans: v?.ref_ata_ukers?.map((x) => ({
          orgeh_kode: x?.orgeh_kode,
          orgeh_name: x?.orgeh_name,
          branch_kode: x?.branch_kode,
          branch_name: x?.branch_name,
        })),
      })),
    };
    dispatch(setAuditTeamData(mapppedData));
    setShowModal(true);
    setTypeModal(type);
  };

  return (
    <Link
      className={
        "hover:bg-gray-100 hover:rounded-[10px] hover:no-underline relative cursor-pointer"
      }
      href={"#"}
    >
      <Card>
        <div className="w-full px-4 py-2">
          <div className="flex justify-between">
            {!withoutLabel && (
              <div
                className={`text-base font-semibold rounded-tl-lg text-brisma ${
                  tipe_tim === "Original Team" ? "bg-blue-300" : "bg-[#F4E3A4]"
                } -ml-4 -mt-4 px-5 h-9 flex items-center justify-center`}
              >
                <p>{tipe_tim?.split(" ")[0].toUpperCase()}</p>
              </div>
            )}
            {button && (
              <div className="flex w-14 justify-between">
                <ButtonIcon
                  handleClick={() => handleDetail("update")}
                  color={"yellow"}
                  icon={<IconEdit size="medium" />}
                />
                <ButtonIcon
                  handleClick={() =>
                    deleteSwal(
                      "Apakah anda yakin ingin menghapus data ini?",
                      "Data ini dihapus seacara permanen",
                      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit?tim_id=${tim_id}&pat_id=${pat_id}`,
                      isMutate()
                    )
                  }
                  color={"red"}
                  icon={<IconTrash size="medium" />}
                />
              </div>
            )}
          </div>
          <div className="text-xl font-bold text-atlasian-blue-dark">
            {header_title}
          </div>
          <div className="flex flex-wrap">
            <CardBody title={"Maker"} text={maker} width={"w-2/5"} />
            <CardBody
              title={"Tanggal Buat"}
              text={created_at}
              width={"w-3/5"}
              paddingLeft={"pl-2"}
            />
            <CardBody
              title={"Manajer Audit"}
              text={manajer_audit?.map((v) => {
                return v.nama_ma;
              })}
              width={"w-2/5"}
            />
            <CardBody
              title={"Ketua Tim Audit"}
              text={ketua_tim_audit?.map((v) => {
                return v.nama_kta;
              })}
              width={"w-3/5"}
              paddingLeft={"pl-2"}
            />
          </div>
          <CardBody
            title={"Anggota Tim Audit"}
            text={anggota_tim_audit?.map((v) => {
              return { name: v?.nama_ata, uker: v?.ref_ata_ukers };
            })}
            width={"w-full"}
          />
        </div>
      </Card>
    </Link>
  );
};

export default CardAuditTeam;
