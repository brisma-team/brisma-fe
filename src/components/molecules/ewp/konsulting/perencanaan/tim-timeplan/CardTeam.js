import {
  ButtonIcon,
  ButtonField,
  Card,
  TextInputDecimal,
  TextInput,
  ErrorValidation,
} from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import { PekerjaSelect } from "@/components/molecules/commons";
import { ImageCheck } from "@/helpers/imagesUrl";
import Image from "next/image";

const CardTeam = ({
  data,
  validation,
  property,
  title,
  isDisabled,
  handleDelete,
  handleAdd,
  handleChangeSelect,
  handleChangeText,
  textColorTitle,
  withoutButton,
  withMandays,
  withDescription,
}) => {
  return (
    <div className="w-full h-fit">
      <Card>
        <div className="px-3 pb-1.5 w-full flex flex-col gap-2">
          <p
            className={`${
              textColorTitle || "text-brisma"
            } text-sm font-semibold ml-2`}
          >
            {title}
          </p>
          {data
            ? data[property]
              ? data[property]?.length
                ? data[property].map((v, i) => {
                    return (
                      <div key={i} className="flex gap-3 items-center">
                        <div className="w-full">
                          <PekerjaSelect
                            selectedValue={
                              v?.pn
                                ? {
                                    label: `${v?.pn} - ${v?.nama}`,
                                    value: { pn: v?.pn, nama: v?.nama },
                                  }
                                : null
                            }
                            customIcon={
                              !withoutButton ? (
                                <ButtonIcon
                                  icon={<IconClose />}
                                  handleClick={() => handleDelete(i, property)}
                                  isDisabled={isDisabled}
                                />
                              ) : (
                                ""
                              )
                            }
                            handleChange={(e) =>
                              handleChangeSelect(property, i, e.value)
                            }
                            width={"w-full"}
                            isDisabled={isDisabled}
                          />
                          {validation &&
                          (validation[property] ||
                            validation[`${property}[${i}.pn]`]) ? (
                            <ErrorValidation
                              className={"mt-3"}
                              message={
                                validation[property] ||
                                validation[`${property}[${i}.pn]`]
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        {withMandays ? (
                          <div className="w-96">
                            <TextInputDecimal
                              placeholder={"Mandays"}
                              value={v?.mandays || null}
                              onChange={(value) =>
                                handleChangeText(
                                  property,
                                  "mandays",
                                  i,
                                  value?.toString()
                                )
                              }
                            />
                            {validation && validation?.mandays ? (
                              <ErrorValidation
                                className={"mt-3"}
                                message={validation?.mandays}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                        {withDescription ? (
                          <div className="flex gap-3 items-center w-[141rem]">
                            <TextInput
                              placeholder={"Deskripsi"}
                              value={v?.deskripsi || ""}
                              onChange={(e) =>
                                handleChangeText(
                                  property,
                                  "deskripsi",
                                  i,
                                  e.target.value
                                )
                              }
                            />
                            {v?.is_initiator ? (
                              <div className="w-5">
                                <Image alt="" src={ImageCheck} />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                        {!withDescription && v?.is_initiator ? (
                          <div>
                            <Image alt="" src={ImageCheck} />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })
                : ""
              : ""
            : ""}
          {!withoutButton ? (
            <div className="bg-none w-fit mt-3">
              <ButtonField
                iconAfter={
                  <div className="text-brisma">
                    <IconPlus size="medium" />
                  </div>
                }
                text={`Tambah ${title}`}
                textColor={"purple"}
                handler={() => handleAdd(property)}
                style={"px-2"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </Card>
    </div>
  );
};

export default CardTeam;
