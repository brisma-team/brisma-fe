import {
  ButtonIcon,
  DatepickerStartEnd,
  Modal,
  TextAreaField,
  TextInput,
} from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  ModalHeader,
  ModalFooter,
  CardBodyContent,
  FormWithLabel,
  BudgetCategorySelect,
} from "@/components/molecules/commons";
import { confirmationSwal, usePostData, useUpdateData } from "@/helpers";
import {
  resetPayload,
  setPayload,
} from "@/slices/ewp/konvensional/mapa/budgetMapaEWPSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const handleChangeSelectBudgetCategory = (value) => {
    const updatedData = {
      ...payload,
      stc_mapa_tipe_anggaran_kode: value.kode,
      tipe_anggaran_name: value.nama,
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
            <BudgetCategorySelect
              handleChange={(e) => handleChangeSelectBudgetCategory(e.value)}
              selectedValue={{
                label: payload.tipe_anggaran_name,
                value: {
                  kode: payload.stc_mapa_tipe_anggaran_kode,
                  nama: payload.tipe_anggaran_name,
                },
              }}
            />
          }
          widthLabel={"w-2/5"}
          widthForm={"w-3/5"}
        />
        <FormWithLabel
          label={"Nominal Biaya"}
          form={
            <TextInput
              icon={
                <ButtonIcon
                  handleClick={() => handleChange("name_kegiatan_audit", "")}
                  icon={<IconClose size="medium" />}
                />
              }
              onChange={(e) => handleChange("amount", e.target.value)}
              value={payload.amount}
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
