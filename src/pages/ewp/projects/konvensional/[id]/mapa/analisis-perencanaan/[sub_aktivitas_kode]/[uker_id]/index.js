import {
  Breadcrumbs,
  ButtonIcon,
  Card,
  LozengeField,
  PageTitle,
} from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrevNextNavigation } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from "@/components/icons";
import Image from "next/image";
import { ImageCheck, ImageClose } from "@/helpers/imagesUrl";
import Link from "next/link";
import { setRiskIssueData } from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { usePlanningAnalysisEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import { confirmationSwal, loadingSwal, useDeleteData } from "@/helpers";
import Button from "@atlaskit/button";
import { ModalAddRiskIssue } from "@/components/molecules/ewp/konvensional/analisis-perencanaan/risk-issue";

const index = () => {
  const dispatch = useDispatch();
  const { id, sub_aktivitas_kode, uker_id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;
  const riskIssueData = useSelector(
    (state) => state.planningAnalysisMapaEWP.riskIssueData
  );
  const [expansionMap, setExpansionMap] = useState({});
  const [levelMap, setLevelMap] = useState({});
  const [showModalCreateRiskIssue, setShowModalCreateRiskIssue] =
    useState(false);
  const [showModalCreateSample, setShowModalCreateSample] = useState(false);
  const [showModalCreateControl, setShowModalCreateControl] = useState(false);

  const { auditorEWP } = useAuditorEWP({ id });
  const { planningAnalysisEWP, planningAnalysisEWPMutate } =
    usePlanningAnalysisEWP("risk_issue_list", {
      id,
      uker_id,
      sub_aktivitas_kode,
    });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Analisis Perencanaan`,
      path: `/ewp/projects/konvensional/${id}/analisis-perencanaan`,
    },
  ];

  useEffect(() => {
    const mapping = planningAnalysisEWP?.data?.map((item) => {
      return {
        kode: item.ref_sub_major_kode,
        name: item.ref_sub_major_name,
        role: "parent",
        children: item.risk_issue.length
          ? item.risk_issue.map((risk) => ({
              id: risk.id,
              uker_id: risk.mapa_uker_id,
              kode: risk.ref_risk_issue_kode,
              name: risk.ref_risk_issue_name,
              program_audit: risk.program_audit ? true : false,
              kriteria: risk.kriteria ? true : false,
              sample: risk.sample ? true : false,
              total_mapa_sample: risk.sample_jumlah_sample
                ? risk.sample_jumlah_sample.toString()
                : "0",
              role: "child",
            }))
          : [],
      };
    });
    dispatch(setRiskIssueData(mapping));
  }, [planningAnalysisEWP]);

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

  // const handleDeleteActivity = async (data) => {
  //   const confirm = await confirmationSwal(
  //     "Menghapus Aktifitas akan menghapus seluruh Sub-Aktifitas terkait."
  //   );

  //   if (!confirm.value) {
  //     return;
  //   }

  //   const { parent_id, kode, name, pic_pn, pic_name } = data;

  //   loadingSwal();
  //   await useDeleteData(
  //     `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/aktivitas`,
  //     {
  //       mapa_uker_id: parent_id,
  //       mtd_aktivitas_name: kode,
  //       mtd_aktivitas_kode: name,
  //       pn_pic_analisa: pic_pn,
  //       name_pic_analisa: pic_name,
  //     }
  //   );
  //   loadingSwal("close");
  // };

  return (
    <LandingLayoutEWP>
      <div className="w-[80.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text="Set Risk Issue" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            prevUrl={"/analisis-perencanaan"}
          />
        </div>
        <div className="w-36">
          <Button
            appearance="primary"
            iconBefore={<IconPlus />}
            onClick={() => setShowModalCreateRiskIssue(true)}
            shouldFitContainer
          >
            Buat Project
          </Button>
          <ModalAddRiskIssue
            showModal={showModalCreateRiskIssue}
            setShowModal={setShowModalCreateRiskIssue}
            mutate={planningAnalysisEWPMutate}
          />
        </div>
        <div className="my-3" />
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
                  // id,
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
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                            <Image src={ImageClose} alt="" />
                          </div>
                        }
                        color={"blue"}
                        // handleClick={() =>
                        //   levelMap[`${kode}-${role}`] === 1 &&
                        //   handleDeleteActivity({
                        //     parent_id,
                        //     kode,
                        //     name,
                        //     pic_pn,
                        //     pic_name,
                        //   })
                        // }
                      />
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
                            <Link
                              href={"#"}
                              className="text-white hover:text-white no-underline hover:no-underline"
                            >
                              Tambah Sample
                            </Link>
                          </LozengeField>
                          <LozengeField appreance="moved" isBold={true}>
                            <Link
                              href={"#"}
                              className="text-white hover:text-white no-underline hover:no-underline"
                            >
                              Tambah Control
                            </Link>
                          </LozengeField>
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
      </div>
    </LandingLayoutEWP>
  );
};

export default index;
