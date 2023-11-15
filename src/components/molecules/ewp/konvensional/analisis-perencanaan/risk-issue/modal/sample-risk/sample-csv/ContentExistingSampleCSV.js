import { ButtonField, ButtonIcon } from "@/components/atoms";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setDataTables,
  setPayloadUploadSample,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { useState } from "react";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { DataNotFound } from "@/components/molecules/commons";
import Image from "next/image";
import { ImageClose } from "@/helpers/imagesUrl";
import { IconArrowDown } from "@/components/icons";
import { loadingSwal, withTokenConfig } from "@/helpers";
import Papa from "papaparse";
import { useSelector } from "react-redux";

const ContentExistingSampleCSV = ({
  data,
  currentModalStage,
  currentSubModalStage,
  setCurrentSubModalStage,
  setIsSelectedSamplePool,
  setSelectedSamplePoolId,
  handleClickDeleteSamplePool,
}) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const dataTables = useSelector(
    (state) => state.planningAnalysisMapaEWP.dataTables
  );

  useEffect(() => {
    if (data?.length) {
      const mappingRows = data?.map((v) => {
        const { id, directory, filename } = v;
        return {
          id,
          directory,
          filename,
          uploader: v.name_uploader,
          risk_issue_kode: v.original_risk_issue_kode,
          risk_issue_nama: v.original_risk_issue_nama,
          aktivitas: v.original_aktivitas_nama,
          sub_aktivitas: v.original_sub_aktivitas_nama,
        };
      });

      setRows(mappingRows);
    }
  }, [data]);

  const { headers } = withTokenConfig();
  const importDataFromUrl = async (directory, fileName) => {
    if (currentModalStage === 1) {
      const fetchData = async () => {
        const response = await fetch(directory, {
          method: "GET",
          headers,
        });

        const csvFile = await response.text();
        Papa.parse(csvFile, {
          header: true,
          dynamicTyping: true,
          complete: function (result) {
            const arrColumns = Object.keys(result.data[0]);
            const mappingColumns = arrColumns.map((column) => {
              return { content: column };
            });

            const mappingRows = result.data.map((item) => ({
              cells: arrColumns.map((key) => ({
                content: item[key],
              })),
            }));

            if (result?.data) {
              dispatch(
                setDataTables({
                  ...dataTables,
                  fileName,
                  tableRows: mappingRows,
                  tableColumns: { cells: mappingColumns },
                })
              );

              const dataLength = result.data?.filter(
                (obj) => obj[arrColumns[0]] !== null
              );

              dispatch(
                setPayloadUploadSample({
                  url: directory,
                  filename: fileName,
                  values: [],
                  jumlah_baris: dataLength?.length?.toString(),
                  uniq_column: arrColumns[0],
                })
              );
            }
          },
          error: (error) => {
            console.error("Error parsing CSV:", error.message);
          },
        });
      };

      fetchData();
    } else {
      dispatch(
        setPayloadUploadSample({
          url: directory,
          filename: fileName,
          description: "",
        })
      );
    }

    loadingSwal();
    loadingSwal("close");
  };

  const handleSelectedSample = async (id, directory, fileName) => {
    setSelectedSamplePoolId(id);
    await importDataFromUrl(directory, fileName);
    if (currentSubModalStage === 2 && currentModalStage === 1) {
      setIsSelectedSamplePool(true);
    }
    setCurrentSubModalStage(1);
  };

  const customHeader = `h-full flex items-center text-brisma`;
  const customHeaderCenter = `flex justify-center py-0.5`;
  const customCell = `cell-width-full-height-full cell-custom-dataTables`;

  return (
    <div className="px-4 py-2">
      <div className="w-32 bg-atlasian-blue-light rounded">
        <ButtonField text="Tampilkan Filter" />
      </div>
      <div className="my-2" />
      <div className="w-full p-4 overflow-y-scroll max-h-[35rem]">
        <TableTree>
          <Headers>
            <Header
              width="8%"
              className="border-x border-t rounded-ss-xl header-width-full-height-full"
            >
              <div
                className={`${customHeader} w-full justify-center text-center`}
              >
                Aksi
              </div>
            </Header>
            <Header width="27%" className="border-t border-r">
              <div className={`${customHeader} w-full`}>Nama File Sample</div>
            </Header>
            <Header
              width="65%"
              className="border-t border-r rounded-se-xl header-width-full-height-full"
            >
              <div className="w-full">
                <div
                  className={`${customHeader} ${customHeaderCenter} w-full border-b`}
                >
                  Original
                </div>
                <div className="w-full flex">
                  <div
                    className={`${customHeader} ${customHeaderCenter} w-[17%] border-r`}
                  >
                    Uploader
                  </div>
                  <div
                    className={`${customHeader}  ${customHeaderCenter} w-[37%] border-r`}
                  >
                    Risk Issue
                  </div>
                  <div
                    className={`${customHeader} ${customHeaderCenter} w-[23%] border-r`}
                  >
                    Sub Aktivitas
                  </div>
                  <div
                    className={`${customHeader} ${customHeaderCenter} w-[23%]`}
                  >
                    Aktivitas
                  </div>
                </div>
              </div>
            </Header>
          </Headers>
          {rows?.length ? (
            <Rows
              items={rows}
              render={({
                id,
                directory,
                filename,
                uploader,
                risk_issue_kode,
                risk_issue_nama,
                sub_aktivitas,
                aktivitas,
              }) => (
                <Row>
                  <Cell width="8%" className={`border-x ${customCell}`}>
                    <div className="flex items-center justify-center w-full h-full gap-0.5">
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-5 h-5 flex items-center justify-center">
                            <IconArrowDown size="small" />
                          </div>
                        }
                        handleClick={() =>
                          handleSelectedSample(id, directory, filename)
                        }
                      />
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border-2 border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                            <Image src={ImageClose} alt="" />
                          </div>
                        }
                        handleClick={() => handleClickDeleteSamplePool(id)}
                      />
                    </div>
                  </Cell>
                  <Cell width="27%" className={`border-r ${customCell} `}>
                    <div className="text-xs h-full flex items-center">
                      {filename}
                    </div>
                  </Cell>
                  <Cell
                    width="65%"
                    className={`border-r cell-custom-dataTables-padding-0`}
                  >
                    <div className="w-full h-full flex">
                      <div
                        className={`w-[17%] border-r p-1.5 flex items-center text-xs font-semibold`}
                      >
                        {uploader}
                      </div>
                      <div
                        className={`w-[37%] border-r p-1.5 flex items-center`}
                      >
                        <p className="text-xs">
                          <span className="font-bold">{risk_issue_kode}</span> -{" "}
                          <span>{risk_issue_nama}</span>
                        </p>
                      </div>
                      <div
                        className={`w-[23%] border-r p-1.5 flex items-center text-xs`}
                      >
                        {aktivitas}
                      </div>
                      <div
                        className={`w-[23%] p-1.5 flex items-center text-xs`}
                      >
                        {sub_aktivitas}
                      </div>
                    </div>
                  </Cell>
                </Row>
              )}
            />
          ) : (
            <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
              <DataNotFound />
            </div>
          )}
        </TableTree>
      </div>
    </div>
  );
};

export default ContentExistingSampleCSV;
