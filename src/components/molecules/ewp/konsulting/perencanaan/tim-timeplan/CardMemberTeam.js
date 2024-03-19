import {
  ButtonIcon,
  Card,
  TextInputDecimal,
  ErrorValidation,
  TextAreaField,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { PekerjaSelect } from "@/components/molecules/commons";

const CardMemberTeam = ({
  data,
  validation,
  property,
  title,
  isDisabled,
  handleDelete,
  handleChangeSelect,
  handleChangeText,
  textColorTitle,
  withoutButton,
}) => {
  return data
    ? data[property]
      ? data[property]?.length
        ? data[property].map((v, i) => {
            return (
              <Card key={i}>
                <div className="w-full flex -my-2.5">
                  <div className="w-1/3 p-3 flex flex-col gap-4" key={i}>
                    <p
                      className={`${
                        textColorTitle || "text-brisma"
                      } text-sm font-semibold`}
                    >
                      {title}
                    </p>
                    <div>
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
                    <div>
                      <div className="w-48">
                        <TextInputDecimal
                          placeholder={"Mandays"}
                          value={null}
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
                    </div>
                  </div>
                  <div className="w-2/3 border-l-2 p-3 flex flex-col gap-4">
                    <p className={`text-atlasian-green text-sm font-semibold`}>
                      Deskripsi
                    </p>
                    <TextAreaField
                      placeholder={"Deskripsi"}
                      value={v?.deskripsi || ""}
                      handleChange={(e) =>
                        handleChangeText(
                          property,
                          "deskripsi",
                          i,
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </Card>
              // <div key={i} className="flex gap-3 items-center">
              //   <div className="w-full">
              //     <PekerjaSelect
              //       selectedValue={
              //         v?.pn
              //           ? {
              //               label: `${v?.pn} - ${v?.nama}`,
              //               value: { pn: v?.pn, nama: v?.nama },
              //             }
              //           : null
              //       }
              //       customIcon={
              //         !withoutButton ? (
              //           <ButtonIcon
              //             icon={<IconClose />}
              //             handleClick={() => handleDelete(i, property)}
              //             isDisabled={isDisabled}
              //           />
              //         ) : (
              //           ""
              //         )
              //       }
              //       handleChange={(e) =>
              //         handleChangeSelect(property, i, e.value)
              //       }
              //       width={"w-full"}
              //       isDisabled={isDisabled}
              //     />
              //     {validation &&
              //     (validation[property] ||
              //       validation[`${property}[${i}.pn]`]) ? (
              //       <ErrorValidation
              //         className={"mt-3"}
              //         message={
              //           validation[property] ||
              //           validation[`${property}[${i}.pn]`]
              //         }
              //       />
              //     ) : (
              //       ""
              //     )}
              //   </div>
              //   {withMandays ? (
              //     <div className="w-96">
              //       <TextInputDecimal
              //         placeholder={"Mandays"}
              //         value={v?.mandays || null}
              //         onChange={(value) =>
              //           handleChangeText(
              //             property,
              //             "mandays",
              //             i,
              //             value?.toString()
              //           )
              //         }
              //       />
              //       {validation && validation?.mandays ? (
              //         <ErrorValidation
              //           className={"mt-3"}
              //           message={validation?.mandays}
              //         />
              //       ) : (
              //         ""
              //       )}
              //     </div>
              //   ) : (
              //     ""
              //   )}
              //   {withDescription ? (
              //     <div className="flex gap-3 items-center w-[141rem]">
              //       <TextInput
              //         placeholder={"Deskripsi"}
              //         value={v?.deskripsi || ""}
              //         onChange={(e) =>
              //           handleChangeText(
              //             property,
              //             "deskripsi",
              //             i,
              //             e.target.value
              //           )
              //         }
              //       />
              //       {v?.is_initiator ? (
              //         <div className="w-5">
              //           <Image alt="" src={ImageCheck} />
              //         </div>
              //       ) : (
              //         ""
              //       )}
              //     </div>
              //   ) : (
              //     ""
              //   )}
              //   {!withDescription && v?.is_initiator ? (
              //     <div>
              //       <Image alt="" src={ImageCheck} />
              //     </div>
              //   ) : (
              //     ""
              //   )}
              // </div>
            );
          })
        : ""
      : ""
    : "";
};

export default CardMemberTeam;
