import { ButtonField, Modal } from "@/components/atoms";
import { confirmationSwal } from "@/helpers";
import { ModalHeader } from "./modal/sample-risk";
import { TableMasterData, TableSelectControl } from "./modal/select-risk";
import { useEffect, useState } from "react";
import { useRiskControl } from "@/data/reference";
import { useRiskControlMapaEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";

const ModalFooter = ({ handleSubmit }) => {
  return (
    <div className="rounded w-28 bg-atlasian-green">
      <ButtonField
        text={"Simpan"}
        handler={handleSubmit}
        type={"submit"}
        name={"saveButton"}
      />
    </div>
  );
};

const ModalSelectControl = ({
  showModal,
  handleCloseModal,
  selectedRiskIssue,
}) => {
  const [keywordSelectControl, setKeywordSelectControl] = useState("");
  const [keywordMasterData, setKeywordMasterData] = useState("");
  const [data, setData] = useState({ select_control: [], master_data: [] });

  const { riskControl } = useRiskControl("all");
  const { riskControlMapaEWP } = useRiskControlMapaEWP({
    risk_issue_id: selectedRiskIssue,
  });

  useEffect(() => {
    if (riskControlMapaEWP?.data?.length) {
      const mapping = riskControlMapaEWP?.data?.map((v, i) => {
        return {
          id: v?.id,
          no: i + 1,
          code: v?.mtd_control?.kode,
          deskripsi: v?.mtd_control?.nama,
          flag: v?.is_default,
        };
      });

      setData((prev) => {
        return { ...prev, select_control: mapping };
      });
    }
  }, [riskControlMapaEWP]);

  useEffect(() => {
    const mapping = riskControl?.data?.map((v) => ({
      code: v?.kode,
      deskripsi: v?.nama,
    }));

    const filteredData = data.select_control.length
      ? mapping.filter((item) => {
          const existsInSelectControl = data.select_control.some(
            (selectItem) => selectItem.code === item.code
          );
        })
      : mapping;

    setData((prev) => ({ ...prev, master_data: filteredData }));
  }, [riskControl, keywordMasterData]);

  const handleClose = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    handleCloseModal();
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Pilih Risk Kontrol"}
          showModal={showModal}
          handleCloseModal={handleClose}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <div className="w-[85rem] relative">
        <div className="flex gap-3 w-full">
          <div className="w-3/5">
            <TableSelectControl
              data={data.select_control}
              handleChangeKeyword={(e) =>
                setKeywordSelectControl(e.target.value)
              }
            />
          </div>
          <div className="w-2/5">
            <TableMasterData
              data={data.master_data}
              keywordMasterData={keywordMasterData}
              handleChangeKeyword={(e) => setKeywordMasterData(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectControl;
