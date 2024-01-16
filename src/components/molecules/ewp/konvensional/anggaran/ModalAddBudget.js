import {
  ButtonIcon,
  DatepickerStartEnd,
  Modal,
  TextAreaField,
  TextInput,
  TextInputDecimal,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
} from "@/components/molecules/commons";
import { useDetailBudgetMapaEWP } from "@/data/ewp/konvensional/mapa/anggaran";
import {
  addDaysToDate,
  confirmationSwal,
  dateNow,
  usePostData,
  useUpdateData,
} from "@/helpers";
import {
  resetPayload,
  setPayload,
} from "@/slices/ewp/konvensional/mapa/budgetMapaEWPSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const ModalAddBudget = ({
  showModal,
  setShowModal,
  mutate,
  typeModal,
  setTypeModal,
  selectedId,
  setSelectedId,
}) => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.budgetMapaEWP.payload);

  const { detailBudgetMapaEWP } = useDetailBudgetMapaEWP({
    id: selectedId,
  });

  useEffect(() => {
    if (detailBudgetMapaEWP?.data && typeModal === "update") {
      dispatch(
        setPayload(
          _.pick(detailBudgetMapaEWP?.data, [
            "tipe_anggaran_name",
            "tanggal",
            "tanggal_end",
            "amount",
            "deskripsi",
          ])
        )
      );
    }
  }, [detailBudgetMapaEWP, typeModal, showModal]);

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setTypeModal("");
    setSelectedId("");
    dispatch(resetPayload());
  };

  const handleChange = (property, value) => {
    const updatedData = {
      ...payload,
      [property]: value,
    };
    dispatch(setPayload(updatedData));
  };

  const handleSubmit = async () => {
    if (typeModal === "update") {
      await useUpdateData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/anggaran/${id}`,
        { id: selectedId, ...payload }
      );
    } else {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/anggaran/${id}`,
        payload
      );
    }

    mutate();
    setShowModal(false);
    setTypeModal("");
    setSelectedId("");
    dispatch(resetPayload());
  };

  useEffect(() => {
    console.log("payload => ", payload);
  }, [payload]);
  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          handleCloseModal={handleCloseModal}
          headerText={"Buat Anggaran MAPA"}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <CardBodyContent>
        <FormWithLabel
          label={"Nama Pengeluaran"}
          form={
            <TextInput
              value={payload.tipe_anggaran_name}
              onChange={(e) =>
                handleChange("tipe_anggaran_name", e.target.value)
              }
              placeholder="Nominal Pengeluaran"
              icon={
                <ButtonIcon
                  handleClick={() => handleChange("tipe_anggaran_name", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
            // <div>test</div>
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Nominal Biaya"}
          form={
            <TextInputDecimal
              value={payload.amount}
              onChange={(value) => handleChange("amount", value)}
              placeholder="Nominal Biaya"
              icon={
                <ButtonIcon
                  handleClick={() => handleChange("amount", "")}
                  icon={<IconClose size="medium" />}
                />
              }
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Periode"}
          form={
            <DatepickerStartEnd
              placeholderStart={"Tanggal"}
              placeholderEnd={"Tanggal"}
              handlerChangeStart={(e) => handleChange("tanggal", e)}
              handlerChangeEnd={(e) => handleChange("tanggal_end", e)}
              valueStart={payload.tanggal}
              valueEnd={payload.tanggal_end}
              format={"DD/MM/YYYY"}
              minDateStart={dateNow()}
              maxDateStart={addDaysToDate(payload?.tanggal_end, "-", 1) || null}
              minDateEnd={
                addDaysToDate(payload?.tanggal, "+", 1) ||
                addDaysToDate(dateNow(), "+", 1) ||
                null
              }
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Deskripsi"}
          form={
            <TextAreaField
              resize="auto"
              handleChange={(e) => handleChange("deskripsi", e.target.value)}
              value={payload.deskripsi}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
      </CardBodyContent>
    </Modal>
  );
};

export default ModalAddBudget;
