import { ButtonIcon, ErrorValidation } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CardContent, UserSKAISelect } from "@/components/molecules/commons";

const CardTeam = ({
  data,
  label,
  property,
  validation,
  labelColor,
  handleChange,
}) => {
  return (
    <CardContent>
      <div className="flex flex-col gap-2 pb-2">
        <p className={labelColor}>{label}</p>
        <UserSKAISelect
          selectedValue={
            data[property]?.pn
              ? {
                  label: data[property]?.name,
                  value: data[property],
                }
              : null
          }
          customIcon={
            <ButtonIcon
              handleClick={() => handleChange(property, "")}
              icon={<IconClose size="medium" />}
            />
          }
          handleChange={(e) => {
            handleChange(property, e.value);
          }}
        />
        {validation && validation[property] ? (
          <ErrorValidation message={validation[property]} />
        ) : (
          ""
        )}
      </div>
    </CardContent>
  );
};

export default CardTeam;
