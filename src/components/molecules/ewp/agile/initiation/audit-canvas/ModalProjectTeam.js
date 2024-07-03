import { ModalScroll } from "@/components/atoms";
import { CardTeam } from "../../../konsulting/perencanaan/tim-timeplan";
import { ModalFooter, ModalHeader } from "@/components/molecules/commons";

const ModalProjectTeam = ({
  showModal,
  payload,
  validation,
  isDisabled,
  handleAddObject,
  handleDeleteObject,
  handleChangeSelectValue,
  handleSubmit,
  handleCloseModal,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          headerText={"Business Modal Canvas"}
          title={"Project Team"}
          titleClassName={
            "mt-1 text-base text-atlasian-blue-light font-semibold"
          }
          handleCloseModal={handleCloseModal}
        />
      }
      footer={<ModalFooter buttonText={"Simpan"} handleSubmit={handleSubmit} />}
    >
      <div className="w-[70rem]">
        <div className="p-2 grid grid-cols-3 gap-4 w-full h-full">
          <CardTeam
            isUserSKAI
            data={payload}
            validation={validation}
            withoutButton={isDisabled}
            isDisabled={isDisabled}
            property={"ma"}
            title={"Prodoct Owner"}
            textColorTitle={"text-atlasian-blue-light"}
            handleAdd={handleAddObject}
            handleDelete={handleDeleteObject}
            handleChangeSelect={handleChangeSelectValue}
          />
          <CardTeam
            isUserSKAI
            data={payload}
            validation={validation}
            withoutButton={isDisabled}
            isDisabled={isDisabled}
            property={"kta"}
            title={"Scrum Master"}
            textColorTitle={"text-atlasian-red"}
            handleAdd={handleAddObject}
            handleDelete={handleDeleteObject}
            handleChangeSelect={handleChangeSelectValue}
          />
          <CardTeam
            isUserSKAI
            data={payload}
            validation={validation}
            withoutButton={isDisabled}
            isDisabled={isDisabled}
            property={"ata"}
            title={"Scrum Team"}
            textColorTitle={"text-atlasian-green"}
            handleAdd={handleAddObject}
            handleDelete={handleDeleteObject}
            handleChangeSelect={handleChangeSelectValue}
          />
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalProjectTeam;
