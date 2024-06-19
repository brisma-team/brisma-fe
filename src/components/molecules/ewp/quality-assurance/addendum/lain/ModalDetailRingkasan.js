import { ModalScroll } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  ModalHeader,
} from "@/components/molecules/commons";
import { SubContentJadwal, SubContentAnggaran } from "./ringkasan";

const ModalDetailRingkasan = ({ data, showModal, handleCloseModal }) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={"Detail Ringkasan"}
        />
      }
    >
      <div className="w-[110rem] flex justify-between gap-4">
        <CardContentHeaderFooter
          header={<h4 className="p-4 text-atlasian-green">Sebelum Addendum</h4>}
        >
          {data?.part == "latar_belakang" ? (
            <div
              className="p-4 h-[40rem] overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html: data?.sebelum?.latar_belakang,
              }}
            />
          ) : data?.part == "tujuan" ? (
            <div
              className="p-4 h-[40rem] overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html: data?.sebelum?.tujuan,
              }}
            />
          ) : data?.part == "analisa" ? (
            <div
              className="p-4 h-[40rem] overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html: data?.sebelum?.analisa,
              }}
            />
          ) : data?.part == "anggaran" ? (
            <div className="p-4">
              <SubContentAnggaran data={data?.sebelum?.anggaran} />
            </div>
          ) : data?.part == "jadwal" ? (
            <SubContentJadwal data={data?.sebelum?.jadwal} />
          ) : (
            ""
          )}
        </CardContentHeaderFooter>
        <CardContentHeaderFooter
          header={<h4 className="p-4 text-atlasian-red">Sesudah Addendum</h4>}
        >
          {data?.part == "latar_belakang" ? (
            <div
              className="p-4 h-[40rem] overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html: data?.sesudah?.latar_belakang,
              }}
            />
          ) : data?.part == "tujuan" ? (
            <div
              className="p-4 h-[40rem] overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html: data?.sesudah?.tujuan,
              }}
            />
          ) : data?.part == "analisa" ? (
            <div
              className="p-4 h-[40rem] overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html: data?.sesudah?.analisa,
              }}
            />
          ) : data?.part == "anggaran" ? (
            <SubContentAnggaran data={data?.sesudah?.anggaran} />
          ) : data?.part == "jadwal" ? (
            <SubContentJadwal data={data?.sesudah?.jadwal} />
          ) : (
            ""
          )}
        </CardContentHeaderFooter>
      </div>
    </ModalScroll>
  );
};

export default ModalDetailRingkasan;
