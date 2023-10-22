import { ButtonField, Modal, Spinner } from "@/components/atoms";
import {
  confirmationSwal,
  loadingSwal,
  useDeleteData,
  usePostData,
} from "@/helpers";
import { ModalHeader } from "./modal/sample-risk";
import { TableMasterData, TableSelectControl } from "./modal/select-risk";
import { useEffect, useState } from "react";
import { useRiskControl } from "@/data/reference";
import { useRiskControlMapaEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import _ from "lodash";

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
  const [isLoading, setIsLoading] = useState(true);
  const [keywordSelectControl, setKeywordSelectControl] = useState("");
  const [keywordMasterData, setKeywordMasterData] = useState("");
  const [paramsSelectControl, setParamsSelectControl] = useState({
    search: "",
    limit: 50,
  });
  const [paramsMasterData, setParamsMasterData] = useState({
    search: "",
    limit: 50,
  });
  const [data, setData] = useState({ select_control: [], master_data: [] });

  const { riskControl, riskControlMutate } = useRiskControl(
    "all",
    paramsMasterData
  );
  const { riskControlMapaEWP, riskControlMapaEWPMutate } =
    useRiskControlMapaEWP({
      risk_issue_id: selectedRiskIssue,
      ...paramsSelectControl,
    });

  useEffect(() => {
    const handleSearch = () => {
      setParamsSelectControl({
        ...paramsSelectControl,
        search: keywordSelectControl,
      });
    };
    const debouncedSearch = _.debounce(handleSearch, 500);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [keywordSelectControl]);

  useEffect(() => {
    const handleSearch = () => {
      setParamsMasterData({ ...paramsMasterData, search: keywordMasterData });
    };
    const debouncedSearch = _.debounce(handleSearch, 500);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [keywordMasterData]);

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

      setIsLoading(false);
    }
  }, [riskControlMapaEWP]);

  useEffect(() => {
    const mapping = riskControl?.data?.map((v) => ({
      code: v?.kode,
      deskripsi: v?.nama,
    }));

    setData((prev) => ({ ...prev, master_data: mapping }));
  }, [riskControl]);

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

  const handleAddControl = async (code) => {
    loadingSwal();
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${selectedRiskIssue}/risk_control`,
      { mtd_control_kode: code }
    );
    riskControlMutate();
    riskControlMapaEWPMutate();
    loadingSwal("close");
  };

  const handleDeleteControl = async (code) => {
    loadingSwal();
    await useDeleteData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${selectedRiskIssue}/risk_control/${code}`,
      {}
    );
    riskControlMutate();
    riskControlMapaEWPMutate();
    loadingSwal("close");
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
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size="xlarge" />
          </div>
        ) : (
          <div className="flex gap-3 w-full">
            <div className="w-3/5">
              <TableSelectControl
                data={data.select_control}
                handleChangeKeyword={(e) =>
                  setKeywordSelectControl(e.target.value)
                }
                handleDeleteControl={handleDeleteControl}
              />
            </div>
            <div className="w-2/5">
              <TableMasterData
                data={data.master_data}
                dataSelectControl={data.select_control}
                keywordMasterData={keywordMasterData}
                handleChangeKeyword={(e) =>
                  setKeywordMasterData(e.target.value)
                }
                handleAddControl={handleAddControl}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalSelectControl;
