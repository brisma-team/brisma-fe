import React from "react";
import {
  // Card,
  Modal,
} from "@/components/atoms";

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

  return title == "Anggota Tim Audit" ? (
    <div className={`mt-4 leading-normal text-base ${width}`}>
      <div className={`${textColor} font-semibold`}>{title}</div>
      {text?.map((v, key) => {
        return <div key={key}>{v.nama_ata}</div>;
      })}
    </div>
  ) : (
    <div className={`mt-4 leading-normal text-base ${width}`}>
      <div className={`${textColor} font-semibold`}>{title}</div>
      <div>{text}</div>
    </div>
  );
};

const ModalInfo = ({ showModal, setShowModal, data }) => {
  const datePart = data.createdAt.split("T")[0];
  return (
    <Modal
      showModal={showModal}
      positionCenter={true}
      onClickOutside={() => setShowModal(false)}
    >
      <div className="w-[40rem]">
        <div className="flex gap-3 justify-between my-3">
          {/* <div className="w-1/2">
            <Card>
              <div className="w-full px-4 py-2">
                <div className="p-3">
                  <div className="text-xl font-bold text-atlasian-blue-dark">
                    {"Jadwal Audit"}
                  </div>
                  <div className="flex my-4">
                    <div className="w-2/5 text-base font-semibold">
                      {"Label"}
                    </div>
                    <div className="w-3/5 text-base">{"Isi"}</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-1/2"> */}
          <div className="w-full">
            <div className="w-full px-4 py-2">
              <div className="p-3">
                <div className="text-xl font-bold text-atlasian-blue-dark">
                  {"Tim Audit"}
                </div>
                <CardBody title={"Nama Tim"} text={data.name} width={"w-5/5"} />
                <div className="flex flex-wrap">
                  <CardBody
                    title={"Maker"}
                    text={data.pic_maker_tim_audit.nama}
                    width={"w-3/5"}
                  />
                  <CardBody
                    title={"Tanggal Dibuat"}
                    text={datePart}
                    width={"w-2/5"}
                  />
                  <CardBody
                    title={"Manajer Audit"}
                    text={data.pn_ma.nama}
                    width={"w-3/5"}
                  />
                  <CardBody
                    title={"Ketua Tim Audit"}
                    text={data.pn_kta.nama}
                    width={"w-2/5"}
                  />
                </div>
                <CardBody
                  title={"Anggota Tim Audit"}
                  text={data.ref_audit_tim_ata}
                  width={"w-full"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInfo;
