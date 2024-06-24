import { ModalScroll } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  ModalHeader,
} from "@/components/molecules/commons";
import { SubContentTim, SubContentUker, SubContentProject } from "./ringkasan";

const ModalDetailRingkasan = ({
  data,
  dataInfoProject,
  showModal,
  handleCloseModal,
}) => {
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
      {data?.part === "mapa_project" &&
      ["add", "delete"].includes(data?.method?.type) ? (
        <div className="w-[55rem]">
          <SubContentProject data={data?.method?.data} />
        </div>
      ) : data?.part === "uker" &&
        ["add", "delete"].includes(data?.method?.type) ? (
        <div className="w-[55rem]">
          <SubContentUker data={data?.method?.data} />
        </div>
      ) : (
        <div className="w-[110rem] flex justify-between gap-4">
          <CardContentHeaderFooter
            header={
              <h4 className="p-4 text-atlasian-green">Sebelum Addendum</h4>
            }
          >
            {data?.part === "tim" ? (
              <SubContentTim
                tim={data?.sebelum?.tim_audit}
                dataInfoProject={dataInfoProject}
              />
            ) : data?.part === "uker" ? (
              <SubContentUker data={data?.sebelum} />
            ) : data?.part === "mapa_project" ? (
              <SubContentProject data={data?.sebelum} />
            ) : (
              ""
            )}
          </CardContentHeaderFooter>
          <CardContentHeaderFooter
            header={<h4 className="p-4 text-atlasian-red">Sesudah Addendum</h4>}
          >
            {data?.part == "tim" ? (
              <SubContentTim
                tim={data?.sesudah?.tim_audit}
                dataInfoProject={dataInfoProject}
              />
            ) : data?.part == "uker" ? (
              <SubContentUker data={data?.sesudah} />
            ) : data?.part == "mapa_project" ? (
              <SubContentProject data={data?.sesudah} />
            ) : (
              ""
            )}
          </CardContentHeaderFooter>
        </div>
      )}
    </ModalScroll>
  );
};

export default ModalDetailRingkasan;
