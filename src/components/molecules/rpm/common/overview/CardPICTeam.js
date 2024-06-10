import { ButtonIcon, ErrorValidation } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CardContent, UserSKAISelect } from "@/components/molecules/commons";

const CardPICTeam = ({
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
                  label: `${data[property]?.pn} - ${data[property]?.nama}`,
                  value: data[property],
                }
              : null
          }
          customIcon={
            <ButtonIcon
              handleClick={() => handleChange(property, {})}
              icon={<IconClose size="medium" />}
            />
          }
          handleChange={(e) => {
            handleChange(property, { pn: e.value.pn, nama: e.value.name });
          }}
        />
        {validation && validation[`${property}.pn`] ? (
          <ErrorValidation message={validation[`${property}.pn`]} />
        ) : (
          ""
        )}
      </div>
    </CardContent>
  );
};

export default CardPICTeam;
