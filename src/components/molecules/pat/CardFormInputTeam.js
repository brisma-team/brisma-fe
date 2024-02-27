import {
  ButtonField,
  ButtonIcon,
  Card,
  ErrorValidation,
} from "@/components/atoms";
import { IconChevronDown, IconClose, IconPlus } from "@/components/icons";
import {
  PekerjaSelect,
  OrgehSelect,
  BranchSelect,
  TypeTeamSelect,
} from "../commons";
import CustomSelect from "../commons/CustomSelect";

const CardFormInputTeam = ({
  type,
  data,
  handlerDeleteParent,
  handlerDeleteChild,
  handlerAddParent,
  handlerAddChild,
  handlerChangeParent,
  handlerChangeChild,
  validationErrors,
  property,
  childProperty,
  optionValue,
  iconBeside,
  isDisabled,
  withoutButtonAdd,
  isButtonChange,
}) => {
  let textColor, buttonText;
  switch (type) {
    case "Manajer Audit":
      textColor = "text-atlasian-blue-light";
      buttonText = "MA";
      break;
    case "Ketua Tim Audit":
      textColor = "text-atlasian-red";
      buttonText = "KTA";
      break;
    case "Anggota Tim Audit":
      textColor = "text-atlasian-green";
      buttonText = "ATA";
      break;
    case "Tipe Tim":
      textColor = "text-atlasian-yellow";
      break;
    case "P.I.C":
      textColor = "text-atlasian-red";
      buttonText = "P.I.C";
      break;
    case "Maker":
      textColor = "text-atlasian-blue-light";
      buttonText = "Maker";
      break;
    case "Approver":
      textColor = "text-atlasian-red";
      buttonText = "Approver";
      break;
    case "Signer":
      textColor = "text-atlasian-green";
      buttonText = "Signer";
      break;
  }

  return (
    <div className="">
      <Card>
        <div className="w-full p-4">
          {type === "Anggota Tim Audit" ? (
            <>
              <div className="w-full flex justify-start">
								<div className="w-[7.75rem] bg-atlasian-purple rounded flex justify-center">
									<ButtonField
										text={`Tambah ${buttonText}`}
                    handler={() => handlerAddParent(property)}
									/>
								</div>
							</div>
              {data?.map((v, i) => {
                return (
                <div key={i} className=" mt-4">
                  <div  className="w-full flex my-1">
                      <div className="w-full">
                        <div className="w-full flex justify-between py-1">
                          <div className="p-4 border-gray-200 border-l border-t border-b rounded-md w-1/3 pr-1.5">
                            <p className={`font-semibold text-sm mb-3 ${textColor}`}>{type}</p>
                            <div className="w-full">
                              <PekerjaSelect
                                handleChange={(e) =>
                                  handlerChangeParent(property, i, e)
                                }
                                placeholder={"Anggota Tim Audit"}
                                selectedValue={
                                  v.pn
                                    ? {
                                        label: `${v.pn} - ${v.nama}`,
                                        value: { v },
                                      }
                                    : ""
                                }
                                customIcon={
                                  <ButtonIcon
                                    color="red"
                                    icon={<IconClose />}
                                    handleClick={() =>
                                      handlerDeleteParent(property, i)
                                    }
                                  />
                                }
                                isDisabled={isDisabled}
                              />
                              {validationErrors[
                                `ref_tim_audit_ata[${i}].pn`
                              ] && (
                                <ErrorValidation
                                  message={
                                    validationErrors[
                                      `ref_tim_audit_ata[${i}].pn`
                                    ]
                                  }
                                />
                              )}
                            </div>
                          </div>
                          <div className="p-4 border-gray-200 border rounded-md w-2/3 px-1.5">
                              <p className={`font-semibold text-sm mb-3 ${textColor}`}>
                                UKER Binaan
                              </p>
                            {v?.uker_binaans?.map((x, idx) => {
                              return (
                                <div key={idx} className="flex gap-3 mb-2 flex-wrap">
                                  <div className="flex gap-3 w-full">
                                    <div className="w-1/2">
                                      <OrgehSelect
                                        handleChange={(e) =>
                                          handlerChangeChild(i, idx, e, "orgeh")
                                        }
                                        placeholder={"Orgeh"}
                                        selectedValue={
                                          x.orgeh_kode
                                            ? {
                                                label: `${x.orgeh_kode} - ${x.orgeh_name}`,
                                                value: {
                                                  orgeh_kode: x.orgeh_kode,
                                                  orgeh_name: x.orgeh_name,
                                                },
                                              }
                                            : ""
                                        }
                                        customIcon={
                                          <ButtonIcon
                                            color="red"
                                            icon={<IconClose />}
                                            handleClick={() =>
                                              handlerDeleteChild(i, idx)
                                            }
                                          />
                                        }
                                        isDisabled={isDisabled}
                                      />
                                    </div>
                                    <div className="w-1/2">
                                      <BranchSelect
                                        handleChange={(e) =>
                                          handlerChangeChild(
                                            i,
                                            idx,
                                            e,
                                            "branch"
                                          )
                                        }
                                        placeholder={"Branch"}
                                        selectedValue={
                                          x.branch_kode
                                            ? {
                                                label: `${x.branch_kode} - ${x.branch_name}`,
                                                value: {
                                                  orgeh_kode: x.branch_kode,
                                                  orgeh_name: x.branch_name,
                                                },
                                              }
                                            : ""
                                        }
                                        customIcon={
                                          <ButtonIcon
                                            color="red"
                                            icon={<IconClose />}
                                            handleClick={() =>
                                              handlerDeleteChild(i, idx)
                                            }
                                          />
                                        }
                                        isDisabled={isDisabled}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                                  <div className="flex justify-end w-full items-center gap-2">
                                    <div className="bg-none w-44 mt-3">
                                        <ButtonField
                                          iconAfter={
                                            <div className="text-brisma">
                                              <IconPlus size="medium" />
                                            </div>
                                          }
                                          text={`${isButtonChange || `Tambah UKER`}`}
                                          textColor={"purple"}
                                          handler={() => handlerAddChild(i)}
                                          disabled={isDisabled}
                                        />
                                    </div>
                                  </div>
                          </div>
                        </div>
                      </div>
               
                  </div>
                  {validationErrors[property] && (
                    <div className="pl-2">
                      <ErrorValidation message={validationErrors[property]} />
                    </div>
                  )}
              </div>
                  );
                })}
            </>
          ) : (
            <>
              <div className="w-full px-2 mb-2">
                <p className={`font-semibold text-sm ${textColor}`}>{type}</p>
              </div>
              {type === "Tipe Tim" ? (
                <div className="mt-3 pt-0.5 w-full">
                  <TypeTeamSelect
                    isSearchable={false}
                    handleChange={handlerChangeParent}
                    placeholder={"Tipe Tim"}
                    selectedValue={
                      data?.nama
                        ? {
                            label: data?.nama,
                            value: data,
                          }
                        : ""
                    }
                    isDisabled={isDisabled}
                    customIcon={<ButtonIcon icon={<IconChevronDown />} />}
                  />
                </div>
              ) : (
                data?.map((v, i) => {
                  return (
                    <div className="flex" key={i}>
                      <div className="my-1.5 w-full">
                        {optionValue ? (
                          <CustomSelect
                            key={i}
                            handleChange={(e) =>
                              handlerChangeParent(property, i, e)
                            }
                            placeholder={type}
                            optionValue={optionValue}
                            selectedValue={
                              v.pn
                                ? {
                                    label: `${v?.pn} - ${v?.nama}`,
                                    value: { v },
                                  }
                                : ""
                            }
                            customIcon={
                              <ButtonIcon
                                color="red"
                                icon={<IconClose />}
                                handleClick={() =>
                                  handlerDeleteParent(property, i)
                                }
                              />
                            }
                            isDisabled={isDisabled}
                          />
                        ) : (
                          <PekerjaSelect
                            key={i}
                            handleChange={(e) =>
                              handlerChangeParent(property, i, e)
                            }
                            placeholder={type}
                            selectedValue={
                              v.pn
                                ? {
                                    label: `${v?.pn} - ${v?.nama}`,
                                    value: { v },
                                  }
                                : ""
                            }
                            customIcon={
                              <ButtonIcon
                                color="red"
                                icon={<IconClose />}
                                handleClick={() =>
                                  handlerDeleteParent(property, i)
                                }
                              />
                            }
                            isDisabled={isDisabled || v[childProperty]}
                          />
                        )}
                        {type === "Manajer Audit"
                          ? validationErrors[`ref_tim_audit_ma[${i}].pn`] && (
                              <ErrorValidation
                                message={
                                  validationErrors[`ref_tim_audit_ma[${i}].pn`]
                                }
                              />
                            )
                          : type === "Ketua Tim Audit"
                          ? validationErrors[`ref_tim_audit_kta[${i}].pn`] && (
                              <ErrorValidation
                                message={
                                  validationErrors[`ref_tim_audit_kta[${i}].pn`]
                                }
                              />
                            )
                          : type === "P.I.C"
                          ? validationErrors[`penanggung_jawab[${i}].pn`] && (
                              <ErrorValidation
                                message={
                                  validationErrors[`penanggung_jawab[${i}].pn`]
                                }
                              />
                            )
                          : type === "Approver"
                          ? validationErrors[
                              `ref_tim_audit_approver[${i}].pn`
                            ] && (
                              <ErrorValidation
                                message={
                                  validationErrors[
                                    `ref_tim_audit_approver[${i}].pn`
                                  ]
                                }
                              />
                            )
                          : type === "Signer"
                          ? validationErrors[
                              `ref_tim_audit_signer[${i}].pn`
                            ] && (
                              <ErrorValidation
                                message={
                                  validationErrors[
                                    `ref_tim_audit_signer[${i}].pn`
                                  ]
                                }
                              />
                            )
                          : ""}
                      </div>
                      {v[childProperty] && iconBeside ? iconBeside : ""}
                    </div>
                  );
                })
              )}
              {validationErrors?.[property] && (
                <div className="pl-2">
                  <ErrorValidation message={validationErrors?.[property]} />
                </div>
              )}
            </>
          )}
          {type !== "Maker" && type !== "Tipe Tim" && type !== "Anggota Tim Audit" && !withoutButtonAdd && (
            <div className="flex justify-end w-full items-center gap-2">
              <div className="bg-none w-44 mt-3">
                <ButtonField
                  iconAfter={
                    <div className="text-brisma">
                      <IconPlus size="medium" />
                    </div>
                  }
                  text={`${isButtonChange || `Tambah`} ${buttonText}`}
                  textColor={"purple"}
                  handler={() => handlerAddParent(property)}
                  disabled={isDisabled}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CardFormInputTeam;
