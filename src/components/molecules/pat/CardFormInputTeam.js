import {
  ButtonField,
  Card,
  ErrorValidation,
  LinkIcon,
  ReactSelect,
} from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import { PekerjaSelect, OrgehSelect, BranchSelect } from "../commons";
import { useForm } from "react-hook-form";
import Link from "next/link";

const CardFormInputTeam = ({
  type,
  placeholder,
  data,
  handlerDeleteParent,
  handlerDeleteChild,
  handlerAddParent,
  handlerAddChild,
  handlerChangeParent,
  handlerChangeChild,
  validationErrors,
  property,
}) => {
  const { control } = useForm();
  let textColor, buttonText;
  switch (type) {
    case "Manajer Audit":
      textColor = "text-atlasian-blue-light";
      buttonText = "Manajer";
      break;
    case "Ketua Tim Audit":
      textColor = "text-atlasian-red";
      buttonText = "Ketua";
      break;
    case "Anggota Tim Audit":
      textColor = "text-atlasian-green";
      buttonText = "Anggota";
      break;
    case "Tipe Tim":
      textColor = "text-atlasian-yellow";
      break;
    case "P.I.C":
      textColor = "text-atlasian-red";
      buttonText = "P.I.C";
  }

  return (
    <div className="">
      <Card>
        <div className="w-full px-3 py-1">
          {type === "Anggota Tim Audit" ? (
            <>
              <div className="w-full px-3 flex mb-2">
                <div className="w-1/3">
                  <p className={`font-semibold text-sm ${textColor}`}>{type}</p>
                </div>
                <div className="w-2/3 text-center">
                  <p className={`font-semibold text-sm ${textColor}`}>
                    UKER Binaan
                  </p>
                </div>
              </div>
              {data?.map((v, i) => {
                return (
                  <div key={i} className="w-full p-1 flex my-1">
                    <Card>
                      <div className="w-full">
                        <div className="w-full flex justify-between pl-3 pr-1.5 py-1">
                          <div className="w-1/3 pr-1.5">
                            <div className="w-full">
                              <PekerjaSelect
                                control={control}
                                handleChange={(e) => handlerChangeParent(i, e)}
                                selectedValue={{
                                  label: `${v.pn} - ${v.nama}`,
                                  value: { v },
                                }}
                                customIcon={
                                  <LinkIcon
                                    icon={<IconClose />}
                                    handler={() => handlerDeleteParent(i)}
                                  />
                                }
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
                          <div className="w-2/3 px-1.5">
                            {v?.uker_binaans?.map((x, idx) => {
                              return (
                                <div key={idx} className="flex gap-3 mb-2">
                                  <div className="flex gap-3 w-full">
                                    <div className="w-1/2">
                                      <OrgehSelect
                                        handleChange={(e) =>
                                          handlerChangeChild(i, idx, e, "orgeh")
                                        }
                                        selectedValue={{
                                          label: `${x.orgeh_kode} - ${x.orgeh_name}`,
                                          value: {
                                            orgeh_kode: x.orgeh_kode,
                                            orgeh_name: x.orgeh_name,
                                          },
                                        }}
                                        customIcon={
                                          <LinkIcon
                                            icon={<IconClose />}
                                            handler={() =>
                                              handlerDeleteChild(i, idx)
                                            }
                                          />
                                        }
                                      />
                                      {validationErrors[
                                        `ref_tim_audit_ata[${i}].uker_binaans[${idx}].orgeh_kode`
                                      ] && (
                                        <ErrorValidation
                                          message={
                                            validationErrors[
                                              `ref_tim_audit_ata[${i}].uker_binaans[${idx}].orgeh_kode`
                                            ]
                                          }
                                        />
                                      )}
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
                                        selectedValue={{
                                          label: `${x.branch_kode} - ${x.branch_name}`,
                                          value: {
                                            orgeh_kode: x.branch_kode,
                                            orgeh_name: x.branch_name,
                                          },
                                        }}
                                        customIcon={
                                          <LinkIcon
                                            icon={<IconClose />}
                                            handler={() =>
                                              handlerDeleteChild(i, idx)
                                            }
                                          />
                                        }
                                      />
                                      {validationErrors[
                                        `ref_tim_audit_ata[${i}].uker_binaans[${idx}].branch_kode`
                                      ] && (
                                        <ErrorValidation
                                          message={
                                            validationErrors[
                                              `ref_tim_audit_ata[${i}].uker_binaans[${idx}].branch_kode`
                                            ]
                                          }
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-center gap-2">
                                    <Link
                                      className="no-underline hover:no-underline w-7 h-7 flex items-center justify-center rounded-full border border-atlasian-red text-atlasian-red hover:text-atlasian-red"
                                      href={"#"}
                                      onClick={() => handlerAddChild(i)}
                                    >
                                      <IconPlus />
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
              {validationErrors[property] && (
                <div className="pl-2">
                  <ErrorValidation message={validationErrors[property]} />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-full px-2 mb-2">
                <p className={`font-semibold text-sm ${textColor}`}>{type}</p>
              </div>
              {type === "Tipe Tim" ? (
                <ReactSelect
                  control={control}
                  options={[
                    { label: "Original Team", value: "Original Team" },
                    { label: "Scheduled Team", value: "Scheduled Team" },
                    { label: "dll", value: "Dll" },
                  ]}
                  isSearchable={false}
                  handleChange={(e) => console.log("E CHANGE => ", e)}
                  placeholder={placeholder}
                />
              ) : (
                data?.map((v, i) => {
                  return (
                    <div key={i} className="my-3">
                      <PekerjaSelect
                        key={i}
                        handleChange={(e) => handlerChangeParent(i, e)}
                        selectedValue={{
                          label: `${v?.pn} - ${v?.nama}`,
                          value: { v },
                        }}
                        customIcon={
                          <LinkIcon
                            icon={<IconClose />}
                            handler={() => handlerDeleteParent(i)}
                          />
                        }
                      />
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
                        : ""}
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
          {type !== "Tipe Tim" && (
            <div className="flex w-full items-center gap-2">
              <div className="bg-none w-40 mt-3">
                <ButtonField
                  iconAfter={
                    <div className="text-brisma">
                      <IconPlus size="medium" />
                    </div>
                  }
                  text={`Tambah ${buttonText}`}
                  textColor={"brisma"}
                  handler={handlerAddParent}
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
