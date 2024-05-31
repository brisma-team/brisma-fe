import {
  MetodeSelect,
  ModalHeader,
  TypeSelect,
} from "@/components/molecules/commons";
import ModalFooter from "./ModalFooter";
import TableProjectListEWP from "./TableProjectListEWP";
import { ButtonIcon, ModalScroll, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CardTeam from "./CardTeam";

const ModalAddProjectRPM = ({
  showModal,
  currentModalStage,
  dataProjectEWPList,
  payload,
  totalData,
  filter,
  validation,
  handleChangeFilter,
  handleChangePayload,
  handleCloseModal,
  handleNextStage,
  handlePrevStage,
  handleSubmit,
}) => {
  const progressItems = [
    {
      id: "step-1",
      label: <span>Pilih Project EWP</span>,
      percentageComplete: currentModalStage > 1 ? 100 : 0,
      status: currentModalStage === 1 ? "current" : "visited",
    },
    {
      id: "step-2",
      label: <span>Pilih Pengawas Kegiatan</span>,
      percentageComplete: currentModalStage > 2 ? 100 : 0,
      status: currentModalStage === 2 ? "current" : "visited",
    },
  ];

  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          progressItems={progressItems}
          headerText={"Buat Proyek"}
          title={"Rencana Perbaikan Manajemen"}
          titleClassName={"text-atlasian-blue-light mt-0 font-semibold"}
          width={"w-[35rem]"}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={
        <ModalFooter
          currentModalStage={currentModalStage}
          handleNextStage={handleNextStage}
          handlePrevStage={handlePrevStage}
          maxStage={progressItems?.length}
          validation={validation}
          handleSubmit={handleSubmit}
        />
      }
    >
      <div className="w-[61rem]">
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold">
            {currentModalStage === 1 ? "Project EWP" : "Pengawas Kegiatan"}
          </p>
          {currentModalStage === 1 ? (
            <div>
              <div className="flex gap-3">
                <div className="w-52">
                  <MetodeSelect
                    placeholder={"Metode"}
                    selectedValue={
                      filter?.ref_metode?.kode
                        ? {
                            label: filter?.ref_metode?.nama,
                            value: filter?.ref_metode,
                          }
                        : null
                    }
                    customIcon={
                      <ButtonIcon
                        handleClick={() =>
                          handleChangePayload("ref_metode", "")
                        }
                        icon={<IconClose size="medium" />}
                      />
                    }
                    handleChange={(e) =>
                      handleChangeFilter("ref_metode", {
                        kode: e.value,
                        nama: e.label,
                      })
                    }
                  />
                </div>
                <div className="w-52">
                  <TypeSelect
                    placeholder={"Tipe"}
                    selectedValue={
                      filter?.ref_tipe?.kode
                        ? {
                            label: filter?.ref_tipe?.nama,
                            value: filter?.ref_tipe,
                          }
                        : null
                    }
                    customIcon={
                      <ButtonIcon
                        handleClick={() => handleChangePayload("ref_tipe", "")}
                        icon={<IconClose size="medium" />}
                      />
                    }
                    handleChange={(e) =>
                      handleChangeFilter("ref_tipe", {
                        kode: e.value,
                        nama: e.label,
                      })
                    }
                  />
                </div>
                <div className="w-80">
                  <TextInput
                    icon={
                      <ButtonIcon
                        handleClick={() =>
                          handleChangePayload("project_id", "")
                        }
                        icon={<IconClose size="medium" />}
                      />
                    }
                    placeholder={"Search by Project ID"}
                    value={filter?.project_id || ""}
                    onChange={(e) =>
                      handleChangeFilter("project_id", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="mt-4">
                <TableProjectListEWP
                  data={dataProjectEWPList}
                  payload={payload}
                  filter={filter}
                  totalData={totalData}
                  handleChangeFilter={handleChangeFilter}
                  handleChangePayload={handleChangePayload}
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <CardTeam
                data={payload}
                validation={validation}
                label={"P.I.C Submitter"}
                property={"pic_submitter"}
                labelColor={"text-atlasian-blue-light"}
                handleChange={handleChangePayload}
              />
              <CardTeam
                data={payload}
                validation={validation}
                label={"P.I.C Evaluator"}
                property={"pic_evaluator"}
                labelColor={"text-atlasian-yellow"}
                handleChange={handleChangePayload}
              />
              <CardTeam
                data={payload}
                validation={validation}
                label={"P.I.C Negosiator"}
                property={"pic_negotiator"}
                labelColor={"text-atlasian-red"}
                handleChange={handleChangePayload}
              />
            </div>
          )}
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalAddProjectRPM;
