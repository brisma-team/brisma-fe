import { ButtonIcon, Card, DivButton, LozengeField } from "@/components/atoms";
import { IconChevronDown, IconChevronRight } from "@/components/icons";
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
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalAddSampleRisk from "./ModalAddSampleRisk";

const TableRiskIssue = ({
  selectedRiskIssue,
  setSelectedRiskIssue,
  mutate,
}) => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const riskIssueData = useSelector(
    (state) => state.planningAnalysisMapaEWP.riskIssueData
  );
  const payloadUploadSample = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadUploadSample
  );

  const [showModalCreateSample, setShowModalCreateSample] = useState(false);
  const [showModalCreateControl, setShowModalCreateControl] = useState(false);
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

  const handleCreateSample = (id) => {
    setShowModalCreateSample(true);
    setSelectedRiskIssue(id);
  };

  return (
    <Card>
      <div className="w-full px-6 py-4 overflow-y-scroll max-h-[40rem]">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header width="6%" className="border-x border-t rounded-ss-xl">
              Aksi
            </Header>
            <Header width="42%" className="border-t border-r">
              SUB-MAJOR dan RISK ISSUE
            </Header>
            <Header
              width="20%"
              className="border-t border-r flex justify-center"
            >
              Tindakan
            </Header>
            <Header
              width="8%"
              className="border-t border-r flex justify-center"
            >
              Jumlah Sample
            </Header>
            <Header
              width="8%"
              className="border-t border-r flex justify-center"
            >
              Program Audit
            </Header>
            <Header
              width="8%"
              className="border-t border-r flex justify-center"
            >
              Kriteria Audit
            </Header>
            <Header width="8%" className="border-t border-r rounded-se-xl">
              Set Sample
            </Header>
          </Headers>
          <Rows
            items={riskIssueData}
            render={({
              id,
              kode,
              name,
              uker_id,
              program_audit,
              kriteria,
              sample,
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
                <Cell width="6%" className="border-x">
                  {levelMap[`${kode}-${role}`] === 1 && (
                    <ButtonIcon
                      icon={
                        <div className="rounded-full border border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                          <Image src={ImageClose} alt="" />
                        </div>
                      }
                      handleClick={() => handleDeleteRisk(id)}
                    />
                  )}
                </Cell>
                <Cell width="42%" className="border-r">
                  <div
                    className={`w-full flex pt-2 ${
                      levelMap[`${kode}-${role}`] === 1 ? `ml-6` : `ml-0`
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
                    <div className={`flex items-center`}>
                      <div
                        className={`${
                          levelMap[`${kode}-${role}`] === 1
                            ? `w-[11.4rem]`
                            : `w-[14.5rem]`
                        }`}
                      >
                        {`${kode} - ${name}`}
                      </div>
                    </div>
                  </div>
                </Cell>
                <Cell width="20%" className="border-r">
                  {levelMap[`${kode}-${role}`] === 1 && (
                    <div className="-ml-3 flex gap-1">
                      <LozengeField appreance="inprogress" isBold={true}>
                        <DivButton
                          className="text-white hover:text-white no-underline hover:no-underline"
                          handleClick={() => handleCreateSample(id)}
                        >
                          Tambah Sample
                        </DivButton>
                      </LozengeField>
                      <LozengeField appreance="moved" isBold={true}>
                        <Link
                          href={"#"}
                          className="text-white hover:text-white no-underline hover:no-underline"
                        >
                          Tambah Control
                        </Link>
                      </LozengeField>
                      <ModalAddSampleRisk
                        showModal={showModalCreateSample}
                        setShowModal={setShowModalCreateSample}
                        mutate={mutate}
                        selectedRiskIssue={selectedRiskIssue}
                      />
                    </div>
                  )}
                </Cell>
                <Cell
                  width="8%"
                  className="border-r flex justify-center items-center"
                >
                  {total_mapa_sample}
                </Cell>
                <Cell width="8%" className="border-r">
                  {levelMap[`${kode}-${role}`] === 1 && program_audit && (
                    <div className="-ml-4">
                      <Image src={ImageCheck} alt="" />
                    </div>
                  )}
                </Cell>
                <Cell width="8%" className="border-r">
                  {levelMap[`${kode}-${role}`] === 1 && kriteria && (
                    <div className="-ml-4">
                      <Image src={ImageCheck} alt="" />
                    </div>
                  )}
                </Cell>
                <Cell width="8%" className="border-r">
                  {levelMap[`${kode}-${role}`] === 1 && sample && (
                    <div className="-ml-4">
                      <Image src={ImageCheck} alt="" />
                    </div>
                  )}
                </Cell>
              </Row>
            )}
          />
        </TableTree>
      </div>
    </Card>
  );
};

export default TableRiskIssue;
