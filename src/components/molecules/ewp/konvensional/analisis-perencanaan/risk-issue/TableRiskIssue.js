import { ButtonIcon, Card, DivButton, LozengeField } from "@/components/atoms";
import {
  IconChevronDown,
  IconChevronRight,
  IconEdit,
} from "@/components/icons";
import { confirmationSwal, loadingSwal, useDeleteData } from "@/helpers";
import { ImageCheck, ImageClose } from "@/helpers/imagesUrl";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModalAddSampleRisk from "./ModalAddSampleRisk";
import ModalSelectControl from "./ModalSelectControl";
import { DataNotFound } from "@/components/molecules/commons";

const TableRiskIssue = ({
  headerTextRiskIssue,
  setHeaderTextRiskIssue,
  selectedRiskIssue,
  setSelectedRiskIssue,
  setTypeModal,
  setShowModalCreateRiskIssue,
  mutate,
}) => {
  const { id } = useRouter().query;
  const riskIssueData = useSelector(
    (state) => state.planningAnalysisMapaEWP.riskIssueData
  );

  const [showModalCreateSample, setShowModalCreateSample] = useState(false);
  const [showModalSelectControl, setShowModalSelectControl] = useState(false);
  const [expansionMap, setExpansionMap] = useState({});
  const [levelMap, setLevelMap] = useState({});

  useEffect(() => {
    const result = generateLevel(riskIssueData);
    setLevelMap(result);
  }, [riskIssueData]);

  const generateLevel = (data, parentLevel = 0) => {
    const result = {};

    if (Array.isArray(data)) {
      data.forEach((item) => {
        const kodeWithRole = `${item.kode}-${item.role}`;
        result[kodeWithRole] = parentLevel;

        if (item.children && item.children.length > 0) {
          const childLevel = parentLevel + 1;
          const childResult = generateLevel(
            item.children,
            childLevel,
            item.kode
          );

          Object.keys(childResult).forEach((key) => {
            result[key] = childResult[key];
          });
        }
      });
    }

    return result;
  };

  const toggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  const handleDeleteRisk = async (riskId) => {
    const confirm = await confirmationSwal("Menghapus Risk Issue.");

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await useDeleteData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/risk?risk_id=${riskId}`
    );
    mutate();
    loadingSwal("close");
  };

  const handleCreateSample = (
    id,
    subAktivitasName,
    subMajorKode,
    riskIssueKode
  ) => {
    setShowModalCreateSample(true);
    setSelectedRiskIssue(id);
    setHeaderTextRiskIssue(
      `${subAktivitasName} / ${subMajorKode} / ${riskIssueKode}`
    );
  };

  const handleSelectControl = (id) => {
    setShowModalSelectControl(true);
    setSelectedRiskIssue(id);
  };

  const handleUpdateRisk = (id) => {
    setSelectedRiskIssue(id);
    setTypeModal("update");
    setShowModalCreateRiskIssue(true);
  };

  const customHeader = `w-full h-full flex items-center text-brisma`;
  const customCell = `cell-width-full-height-full cell-custom-dataTables`;
  const positionCenter = `w-full h-full flex justify-center gap-1 items-center`;

  return (
    <Card>
      <div className="w-full px-6 py-4 overflow-y-scroll max-h-[40rem]">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="7%"
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className={`${customHeader} justify-center`}>Aksi</div>
            </Header>
            <Header
              width="44%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`${customHeader} pl-2`}>
                SUB-MAJOR dan RISK ISSUE
              </div>
            </Header>
            <Header
              width="17%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`${customHeader} justify-center`}>Tindakan</div>
            </Header>
            <Header
              width="8%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`${customHeader} justify-center`}>
                Jumlah Sample
              </div>
            </Header>
            <Header
              width="8%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`${customHeader} justify-center`}>
                Program Audit
              </div>
            </Header>
            <Header
              width="8%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`${customHeader} justify-center`}>
                Kriteria Audit
              </div>
            </Header>
            <Header
              width="8%"
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`${customHeader} justify-center`}>Set Sample</div>
            </Header>
          </Headers>
          {riskIssueData?.length ? (
            <Rows
              items={riskIssueData}
              render={({
                id,
                kode,
                name,
                sub_aktivitas_name,
                sub_major_kode,
                program_audit,
                kriteria,
                total_mapa_sample,
                role,
                children = [],
              }) => (
                <Row
                  itemId={kode}
                  role={role}
                  items={children}
                  hasChildren={children.length > 0}
                  isExpanded={Boolean(expansionMap[`${kode}-${role}`])}
                >
                  <Cell className="!hidden" />
                  <Cell width="7%" className={`border-x ${customCell}`}>
                    {levelMap[`${kode}-${role}`] === 1 && (
                      <div className={positionCenter}>
                        <ButtonIcon
                          icon={
                            <div className="rounded-full border border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                              <Image src={ImageClose} alt="" />
                            </div>
                          }
                          handleClick={() => handleDeleteRisk(id)}
                        />
                        <ButtonIcon
                          icon={
                            <div className="rounded-full border border-atlasian-yellow w-5 h-5 flex items-center justify-center p-1">
                              <IconEdit size="small" />
                            </div>
                          }
                          handleClick={() => handleUpdateRisk(id)}
                          color={"yellow"}
                        />
                      </div>
                    )}
                  </Cell>
                  <Cell width="44%" className={`border-r ${customCell}`}>
                    <div
                      className={`w-full h-full flex items-center ${
                        levelMap[`${kode}-${role}`] === 1 ? `pl-6` : ``
                      }`}
                    >
                      {children.length > 0 ? (
                        <ButtonIcon
                          handleClick={() => toggleExpansion(kode, role)}
                          icon={
                            expansionMap[`${kode}-${role}`] ? (
                              <IconChevronDown />
                            ) : (
                              <IconChevronRight />
                            )
                          }
                        />
                      ) : (
                        <div className="ml-5" />
                      )}
                      <div>
                        <p>
                          <span className="font-semibold">{kode}</span> -{" "}
                          <span>{name}</span>
                        </p>
                      </div>
                    </div>
                  </Cell>
                  <Cell width="17%" className={`border-r ${customCell}`}>
                    {levelMap[`${kode}-${role}`] === 1 && (
                      <div className={`${positionCenter} gap-2`}>
                        <LozengeField appreance="inprogress" isBold={true}>
                          <DivButton
                            className="text-white hover:text-white no-underline hover:no-underline"
                            handleClick={() =>
                              handleCreateSample(
                                id,
                                sub_aktivitas_name,
                                sub_major_kode,
                                kode
                              )
                            }
                          >
                            Tambah Sample
                          </DivButton>
                        </LozengeField>
                        <LozengeField appreance="moved" isBold={true}>
                          <DivButton
                            className="text-white hover:text-white no-underline hover:no-underline"
                            handleClick={() => handleSelectControl(id)}
                          >
                            Pilih Control
                          </DivButton>
                        </LozengeField>
                      </div>
                    )}
                  </Cell>
                  <Cell width="8%" className={`border-r ${customCell}`}>
                    <div className={positionCenter}>{total_mapa_sample}</div>
                  </Cell>
                  <Cell width="8%" className={`border-r ${customCell}`}>
                    {levelMap[`${kode}-${role}`] === 1 && program_audit && (
                      <div className={positionCenter}>
                        <Image src={ImageCheck} alt="" />
                      </div>
                    )}
                  </Cell>
                  <Cell width="8%" className={`border-r ${customCell}`}>
                    {levelMap[`${kode}-${role}`] === 1 && kriteria && (
                      <div className={positionCenter}>
                        <Image src={ImageCheck} alt="" />
                      </div>
                    )}
                  </Cell>
                  <Cell width="8%" className={`border-r ${customCell}`}>
                    {levelMap[`${kode}-${role}`] === 1 &&
                      total_mapa_sample > 0 && (
                        <div className={positionCenter}>
                          <Image src={ImageCheck} alt="" />
                        </div>
                      )}
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
        <ModalAddSampleRisk
          headerTextRiskIssue={headerTextRiskIssue}
          showModal={showModalCreateSample}
          setShowModal={setShowModalCreateSample}
          mutate={mutate}
          selectedRiskIssue={selectedRiskIssue}
        />
        <ModalSelectControl
          showModal={showModalSelectControl}
          handleCloseModal={() => setShowModalSelectControl(false)}
          selectedRiskIssue={selectedRiskIssue}
        />
      </div>
    </Card>
  );
};

export default TableRiskIssue;
