import {
  ButtonField,
  ButtonIcon,
  CloseModal,
  ModalScroll,
  Spinner,
} from "@/components/atoms";
import {
  ButtonEdit,
  CardContent,
  CardContentHeaderFooter,
  FormWithLabel,
} from "@/components/molecules/commons";
import { convertDate } from "@/helpers";

const ModalDetailPelaksanaan = ({
  payload,
  withoutButton,
  showModal,
  isLoading,
  handleCloseModal,
  handleClickClose,
  handleClickReplicate,
  handleClickEdit,
  // handleSubmit,
}) => {
  return (
    <ModalScroll showModal={showModal} positionCenter>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-[55rem] relative">
          <div className="flex">
            <CloseModal
              showModal={showModal}
              handleCloseModal={handleCloseModal}
            />
          </div>
          <div className="mt-6">
            <CardContentHeaderFooter
              header={
                <div className="px-3 py-4">
                  <p className="text-base font-semibold">
                    [{payload?.project_id?.toUpperCase()}]{" "}
                    {payload?.project_name}
                  </p>
                </div>
              }
              footer={
                !withoutButton ? (
                  <div className="py-3 px-4 flex justify-end">
                    {payload?.is_close ? (
                      <div className="rounded bg-atlasian-purple w-fit">
                        <ButtonField
                          text="Replicate Survey"
                          handler={handleClickReplicate}
                        />
                      </div>
                    ) : (
                      <div className="rounded bg-atlasian-red w-fit">
                        <ButtonField
                          text="Close Survey"
                          handler={handleClickClose}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )
              }
            >
              <div className="p-4 flex gap-3">
                <CardContent>
                  <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.3rem]">
                          <p>{payload?.survey_id?.toUpperCase() || "-"}</p>
                        </div>
                      </CardContent>
                    }
                    label="Survey ID"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.3rem]">
                          <p>{payload?.survey_name || "-"}</p>
                        </div>
                      </CardContent>
                    }
                    label="Survey Name"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                </CardContent>
                <CardContent>
                  <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.3rem]">
                          <p>
                            {payload?.start_date
                              ? convertDate(payload?.start_date, "-", "d")
                              : "-"}
                          </p>
                        </div>
                      </CardContent>
                    }
                    label="Tanggal Mulai"
                    widthLabel={"w-4/12"}
                    widthForm={"w-7/12"}
                  />
                  <FormWithLabel
                    form={
                      <div className="flex gap-1.5 items-center">
                        <CardContent>
                          <div className="min-h-[1.3rem]">
                            <p>
                              {payload?.end_date
                                ? convertDate(payload?.end_date, "-", "d")
                                : "-"}
                            </p>
                          </div>
                        </CardContent>
                        {!withoutButton ? (
                          <ButtonIcon
                            icon={<ButtonEdit />}
                            handleClick={() => handleClickEdit(payload?.id)}
                            color={"yellow"}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    }
                    label="Tanggal Berakhir"
                    widthLabel={"w-4/12"}
                    widthForm={"w-8/12"}
                  />
                </CardContent>
              </div>
            </CardContentHeaderFooter>
          </div>
        </div>
      )}
    </ModalScroll>
  );
};

export default ModalDetailPelaksanaan;
