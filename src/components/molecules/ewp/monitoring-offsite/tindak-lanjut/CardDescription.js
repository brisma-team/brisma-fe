import {
  ButtonField,
  Card,
  TextInput,
} from "@/components/atoms";
import { IconClose, IconPlus } from "@/components/icons";
import { ImageCheck } from "@/helpers/imagesUrl";
import Image from "next/image";

const CardDescription = ({
  data,
  property,
  title,
  handleDelete,
  handleAdd,
  handleChangeText,
  textColorTitle,
  withoutButton,
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
                              icon={<IconClose />}
                              handleClick={() => handleDelete(i, property)}
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

export default CardDescription;
