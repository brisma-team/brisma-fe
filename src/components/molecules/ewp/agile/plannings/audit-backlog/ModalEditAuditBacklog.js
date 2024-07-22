import {
  ButtonIcon,
  ModalScroll,
  TextAreaField,
  TextInputDecimal,
  TextInputFloat,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";

const ModalEditAuditBacklog = ({
  data,
  showModal,
  handleChange,
  handleReset,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={"Ubah Audit Backlog"}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <div className="w-[60rem]">
        <CardBodyContent>
          <FormWithLabel
            label={"Feature"}
            form={
              <TextAreaField
                handleChange={(e) => handleChange("feature", e.target.value)}
                value={data?.feature || ""}
                placeholder={"Feature"}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"User Story Description"}
            form={
              <TextAreaField
                handleChange={(e) =>
                  handleChange("user_story_desc", e.target.value)
                }
                value={data?.user_story_desc || ""}
                placeholder={"User Story Description"}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Mandays"}
            form={
              <TextInputFloat
                value={data?.mandays || ""}
                onChange={(value) => handleChange("mandays", value)}
                placeholder="Mandays"
                icon={
                  <ButtonIcon
                    handleClick={() => handleReset("mandays")}
                    icon={<IconClose size="medium" />}
                  />
                }
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Priority"}
            form={
              <TextInputDecimal
                value={data?.priority || ""}
                onChange={(value) => handleChange("priority", value)}
                placeholder="Priority"
                icon={
                  <ButtonIcon
                    handleClick={() => handleChange("priority")}
                    icon={<IconClose size="medium" />}
                  />
                }
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Definition of Ready"}
            form={
              <TextAreaField
                handleChange={(e) =>
                  handleChange("definition_of_ready", e.target.value)
                }
                value={data?.definition_of_ready || ""}
                placeholder={"Definition of Ready"}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          <FormWithLabel
            label={"Definition of Done"}
            form={
              <TextAreaField
                handleChange={(e) =>
                  handleChange("definition_of_done", e.target.value)
                }
                value={data?.definition_of_done || ""}
                placeholder={"Definition of Done"}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
        </CardBodyContent>
      </div>
    </ModalScroll>
  );
};

export default ModalEditAuditBacklog;
