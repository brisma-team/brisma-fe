import Link from "next/link";
import { ButtonField, Card, DivButton } from "@/components/atoms";
import { IconEdit, IconTrash } from "@/components/icons";
import { useEffect } from "react";
import { useState } from "react";
import { deleteSwal } from "@/helpers";
import useAuditTeam from "@/data/pat/useAuditTeam";
import { useRouter } from "next/router";

const CardBody = ({ title, text, width }) => {
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
    <div className={`mt-4 leading-normal text-base ${width}`}>
      <div className={`${textColor} font-semibold`}>{title}</div>
      {title === "Anggota Tim Audit" ? (
        <div>
          {text?.map((v, i) => {
            return (
              <div className="w-full flex justify-between" key={i}>
                <div key={i} className="w-2/5">
                  {v.name}
                </div>
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
  triwulan_title,
  maker,
  created_at,
  manajer_audit,
  ketua_tim_audit,
  anggota_tim_audit,
  button,
  setShowModal,
  isMutate,
  setTypeModal,
  setData,
}) => {
  const router = useRouter().query;
  const [ma, setMa] = useState([]);
  const [kta, setKta] = useState([]);
  const [ata, setAta] = useState([]);
  useEffect(() => {
    const mappedMA = manajer_audit?.map((v) => {
      return v.nama_ma;
    });
    const mappedKTA = ketua_tim_audit?.map((v) => {
      return v.nama_kta;
    });
    const mappedATA = anggota_tim_audit?.map((v) => {
      return { name: v?.nama_ata, uker: v?.ref_ata_ukers };
    });

    setMa(mappedMA);
    setKta(mappedKTA);
    setAta(mappedATA);
  }, []);

  const { auditTeam } = useAuditTeam("detail", {
    id: router.id,
    tim_id,
  });

  const handlerUpdate = () => {
    const mapppedData = {
      pat_id: pat_id,
      tim_audit_id: tim_id,
      name: auditTeam?.data?.name,
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
    setData(mapppedData);
    setShowModal(true);
    setTypeModal("update");
  };

  return (
    <Link
      href={"#"}
      className={
        "hover:bg-gray-100 hover:rounded-[10px] hover:no-underline w-[29.4rem] relative cursor-pointer"
      }
      // onClick={() => {
      //   setShowModal(true);
      //   setTypeModal("detail");
      // }}
    >
      <Card>
        <div className="w-full px-4 py-2">
          <div className="flex flex-row justify-between">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {header_title}
            </div>
            {button && (
              <div className="flex w-14 justify-between">
                <Link
                  href={"#"}
                  className="text-atlasian-yellow hover:text-atlasian-yellow"
                  onClick={handlerUpdate}
                >
                  <IconEdit size="medium" />
                </Link>
                <Link
                  href={"#"}
                  className="text-atlasian-red hover:text-atlasian-red"
                  onClick={() =>
                    deleteSwal(
                      "Apakah anda yakin ingin menghapus data ini?",
                      "Data ini dihapus seacara permanen",
                      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit?tim_id=${tim_id}&pat_id=${pat_id}`,
                      isMutate
                    )
                  }
                >
                  <IconTrash size="medium" />
                </Link>
              </div>
            )}
          </div>
          {triwulan_title && (
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {triwulan_title}
            </div>
          )}

          <div className="flex flex-wrap">
            <CardBody title={"Maker"} text={maker} width={"w-2/5"} />
            <CardBody
              title={"Tanggal Buat"}
              text={created_at}
              width={"w-3/5"}
            />
            <CardBody title={"Manajer Audit"} text={ma} width={"w-2/5"} />
            <CardBody title={"Ketua Tim Audit"} text={kta} width={"w-3/5"} />
          </div>
          <CardBody title={"Anggota Tim Audit"} text={ata} width={"w-full"} />
        </div>
      </Card>
    </Link>
  );
};

export default CardAuditTeam;
