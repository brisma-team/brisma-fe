import {
  Breadcrumbs,
  ButtonIcon,
  Card,
  CheckboxField,
  LozengeField,
  PageTitle,
} from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DescriptionModal,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
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
  IconQuestions,
} from "@/components/icons";
import Image from "next/image";
import {
  ImageCircleArrowYellow,
  ImageClose,
  ImageGroup,
} from "@/helpers/imagesUrl";
import Link from "next/link";
import {
  setPayloadSubActivity,
  setPlanningAnalysisData,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { usePlanningAnalysisEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import {
  ModalAddActivity,
  ModalAddSubActivity,
} from "@/components/molecules/ewp/konvensional/analisis-perencanaan";
import { confirmationSwal, loadingSwal, useDeleteData } from "@/helpers";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis", slug: "analisis-perencanaan" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokument" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const routeParamId = id;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;
  const planningAnalysisData = useSelector(
    (state) => state.planningAnalysisMapaEWP.planningAnalysisData
  );
  const [expansionMap, setExpansionMap] = useState({});
  const [levelMap, setLevelMap] = useState({});
  const [childParams, setChildParams] = useState({
    uker_id: null,
    aktivitas_id: null,
    aktivitas_kode: null,
  });
  const [parentIndex, setParentIndex] = useState(0);
  const [childParentIndex, setChildParentIndex] = useState(0);
  const [showModalAddActivity, setShowModalAddActivitiy] = useState(false);
  const [showModalAddSubActivity, setShowModalAddSubActivitiy] =
    useState(false);
  const [selectedUker, setSelectedUker] = useState({ id: "", name: "" });
  const [selectedActivityId, setSelectedActivityId] = useState(0);

  const [showModalDesc, setShowModalDesc] = useState(false);
  const [type, setType] = useState("");

  const { mapaEWP, mapaEWPMutate } = useMapaEWP("analisis_perencanaan", { id });
  const { auditorEWP } = useAuditorEWP({ id });
  const { planningAnalysisEWP, planningAnalysisEWPMutate } =
    usePlanningAnalysisEWP("sub_aktivitas", {
      id,
      uker_id: childParams.uker_id,
      aktivitas_id: childParams.aktivitas_id,
      aktivitas_kode: childParams.aktivitas_kode,
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
    if (type === "modalSubActivity") {
      dispatch(
        setPayloadSubActivity({
          aktivitas_id: selectedActivityId,
          sub_aktivitas: planningAnalysisEWP?.data,
        })
      );
      return;
    } else if (type === "listSubActivity") {
      const newData = JSON.parse(JSON.stringify(planningAnalysisData));
      const mappingChildren = planningAnalysisEWP?.data?.map((v) => {
        return {
          id: v.id,
          parent_id: childParams.uker_id,
          kode: v.mtd_sub_aktivitas_kode,
          name: v.mtd_sub_aktivitas_name,
          status_approval_kode: v.stc_status_persetujuan_kode,
          status_approval_name: v.stc_status_persetujuan_name,
          deskripsi: v.deskripsi,
          pic_pn: v.pn_pic_analisa,
          pic_name: v.name_pic_analisa,
          risk: v.total_risk_sub,
          role: "child",
        };
      });
      if (parentIndex !== -1 && parentIndex < newData.length) {
        const children = newData[parentIndex].children;
        if (childParentIndex !== -1 && childParentIndex < children.length) {
          newData[parentIndex].children[childParentIndex].children =
            mappingChildren;
          dispatch(setPlanningAnalysisData(newData));
        }
      }
      return;
    }
  }, [planningAnalysisEWP, childParams]);

  useEffect(() => {
    const mapping = mapaEWP?.data?.map((item) => {
      return {
        id: item.id,
        kode: item.ref_auditee_branch_kode,
        name: item.ref_auditee_branch_name,
        risk: item.jumlah_risk_uker,
        role: "parent",
        children: item.mapa_uker_aktivitas.length
          ? item.mapa_uker_aktivitas.map((aktivitas) => ({
              parent_id: item.id,
              id: aktivitas.id,
              kode: aktivitas.mtd_aktivitas_kode,
              name: aktivitas.mtd_aktivitas_name,
              status_approval_kode: aktivitas.stc_status_persetujuan_kode,
              status_approval_name: aktivitas.stc_status_persetujuan_name,
              risk: aktivitas.jumlah_risk_aktivitas,
              role: "child-parent",
              children: [{ role: "child" }],
            }))
          : [],
      };
    });
    dispatch(setPlanningAnalysisData(mapping));
  }, [mapaEWP]);

  useEffect(() => {
    const result = generateLevel(planningAnalysisData);
    setLevelMap(result);
  }, [planningAnalysisData]);

  const generateLevel = (data, parentLevel = 0) => {
    const result = {};

    if (Array.isArray(data)) {
      data.forEach((item) => {
        const idWithRole = `${item.id}-${item.role}`;
        result[idWithRole] = parentLevel;

        if (item.children && item.children.length > 0) {
          const childLevel = parentLevel + 1;
          const childResult = generateLevel(item.children, childLevel, item.id);

          Object.keys(childResult).forEach((key) => {
            result[key] = childResult[key];
          });
        }
      });
    }

    return result;
  };

  const toggleExpansion = (id, role, kode, parent_id) => {
    if (
      kode !== undefined &&
      parent_id !== undefined &&
      !expansionMap[`${id}-${role}`]
    ) {
      const newData = JSON.parse(JSON.stringify(planningAnalysisData));

      const parentIdx = newData.findIndex((item) => item.id === parent_id);
      if (parentIdx !== -1) {
        const childParentIdx = newData[parentIdx]?.children.findIndex(
          (item) => item.id === id && item.role === "child-parent"
        );
        if (childParentIdx !== -1) {
          setChildParams({
            uker_id: parent_id,
            aktivitas_id: id,
            aktivitas_kode: kode,
          });
          setType("listSubActivity");
          setParentIndex(parentIdx);
          setChildParentIndex(childParentIdx);
          planningAnalysisEWPMutate();
        }
      }
    }
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${id}-${role}`]: !prevState[`${id}-${role}`],
    }));
  };

  const handleAddActivity = (id, name, parent_id, kode, role) => {
    if (role === "parent") {
      setShowModalAddActivitiy(true);
      setSelectedUker({ id, name });
    } else if (role === "child-parent") {
      setShowModalAddSubActivitiy(true);
      setSelectedActivityId(id);
      setType("modalSubActivity");
      setChildParams({
        uker_id: parent_id,
        aktivitas_id: id,
        aktivitas_kode: kode,
      });
    }
  };

  const handleDeleteActivity = async (activityId) => {
    console.log("activityId => ", activityId);
    const confirm = await confirmationSwal(
      "Menghapus Aktifitas akan menghapus seluruh Sub-Aktifitas terkait."
    );

    if (!confirm.value) {
      return;
    }
    mapaEWPMutate();
    loadingSwal();
    await useDeleteData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/aktivitas?aktivitas_id=${activityId}`
    );
    loadingSwal("close");
  };

  const handleDeleteSubActivity = async (subActivityId) => {
    console.log("subActivityId => ", subActivityId);
    const confirm = await confirmationSwal(
      "Menghapus Sub-Aktifitas akan menghapus seluruh Risk Issue terkait."
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await useDeleteData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/sub_aktivitas?sub_aktivitas_id=${subActivityId}`
    );
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWP>
      <div className="w-[80.5rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text="Analisis Perencanaan" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/uker-assessment"}
            nextUrl={"/penugasan"}
          />
        </div>
        <div className="w-64"></div>
        <Card>
          <div className="w-full px-6 py-4 overflow-y-scroll max-h-[40rem]">
            <TableTree>
              <Headers>
                <Header className="!hidden" />
                <Header width="7%" className="border-x border-t rounded-ss-xl">
                  Review
                </Header>
                <Header width="6%" className="border-t border-r">
                  Aksi
                </Header>
                <Header width="27%" className="border-t border-r">
                  UKER, AKTIFITAS dan SUB-AKTIFITAS
                </Header>
                <Header
                  width="20%"
                  className="border-t border-r flex justify-center"
                >
                  PIC
                </Header>
                <Header
                  width="8%"
                  className="border-t border-r flex justify-center"
                >
                  Risk
                </Header>
                <Header
                  width="8%"
                  className="border-t border-r flex justify-center"
                >
                  Analisa
                </Header>
                <Header
                  width="8%"
                  className="border-t border-r flex justify-center"
                >
                  Status
                </Header>
                <Header
                  width="8%"
                  className="border-t border-r flex justify-center"
                >
                  Approval
                </Header>
                <Header width="8%" className="border-t border-r rounded-se-xl">
                  Comment
                </Header>
              </Headers>
              <Rows
                items={planningAnalysisData}
                render={({
                  id,
                  role,
                  parent_id,
                  kode,
                  name,
                  risk,
                  pic_pn,
                  pic_name,
                  status_approval_kode,
                  status_approval_name,
                  deskripsi,
                  children = [],
                }) => (
                  <Row
                    itemId={id}
                    role={role}
                    items={children}
                    hasChildren={children.length > 0}
                    isExpanded={Boolean(expansionMap[`${id}-${role}`])}
                  >
                    <Cell className="!hidden" />
                    <Cell width="7%" className="border-x">
                      <CheckboxField />
                    </Cell>
                    <Cell width="6%" className="border-r">
                      {levelMap[`${id}-${role}`] > 0 && (
                        <ButtonIcon
                          icon={
                            <div className="rounded-full border border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                              <Image src={ImageClose} alt="" />
                            </div>
                          }
                          color={"blue"}
                          handleClick={() =>
                            levelMap[`${id}-${role}`] === 1
                              ? handleDeleteActivity(id)
                              : handleDeleteSubActivity(id)
                          }
                        />
                      )}
                    </Cell>
                    <Cell width="27%" className="border-r">
                      <div
                        className={`w-full flex pt-2 ${
                          levelMap[`${id}-${role}`] === 1
                            ? `ml-6`
                            : levelMap[`${id}-${role}`] === 2
                            ? `ml-12`
                            : `ml-0`
                        }`}
                      >
                        {children.length > 0 ? (
                          <ButtonIcon
                            handleClick={() =>
                              toggleExpansion(id, role, kode, parent_id)
                            }
                            icon={
                              expansionMap[`${id}-${role}`] ? (
                                <IconChevronDown />
                              ) : (
                                <IconChevronRight />
                              )
                            }
                          />
                        ) : (
                          <div className="ml-5" />
                        )}
                        <div className={`flex items-center gap-2 ml-2`}>
                          <div
                            className={`${
                              levelMap[`${id}-${role}`] === 1
                                ? `w-[12.7rem]`
                                : levelMap[`${id}-${role}`] === 2
                                ? `w-[11.4rem]`
                                : `w-[14.5rem]`
                            }`}
                          >
                            {`${kode} - ${name}`}
                          </div>
                          {levelMap[`${id}-${role}`] < 2 && (
                            <>
                              <ButtonIcon
                                icon={<Image src={ImageGroup} alt="" />}
                                handleClick={() =>
                                  handleAddActivity(
                                    id,
                                    name,
                                    parent_id,
                                    kode,
                                    role
                                  )
                                }
                              />
                              <ModalAddActivity
                                showModal={showModalAddActivity}
                                setShowModal={setShowModalAddActivitiy}
                                mutate={mapaEWPMutate}
                                ukerValue={selectedUker}
                              />
                              <ModalAddSubActivity
                                showModal={showModalAddSubActivity}
                                setShowModal={setShowModalAddSubActivitiy}
                                mutate={mapaEWPMutate}
                                activityId={selectedActivityId}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </Cell>
                    <Cell width="15%" className="border-r">
                      {levelMap[`${id}-${role}`] === 2 && (
                        <div className="w-36">{pic_name}</div>
                      )}
                    </Cell>
                    <Cell
                      width="5%"
                      className="border-r flex justify-center items-center"
                    >
                      {levelMap[`${id}-${role}`] === 2 && (
                        <div className="flex justify-center items-center w-7">
                          <ButtonIcon
                            icon={<IconQuestions />}
                            color={"blue"}
                            handleClick={() => setShowModalDesc(true)}
                          />
                          <DescriptionModal
                            showModal={showModalDesc}
                            setShowModal={setShowModalDesc}
                            value={deskripsi}
                          />
                        </div>
                      )}
                    </Cell>
                    <Cell width="8%" className="border-r">
                      {risk}
                    </Cell>
                    <Cell width="8%" className="border-r">
                      {levelMap[`${id}-${role}`] === 2 && (
                        <div className="-ml-4">
                          <LozengeField appreance="inprogress" isBold={true}>
                            <Link
                              href={`/ewp/projects/konvensional/${routeParamId}/mapa/analisis-perencanaan/${kode}/${parent_id}`}
                              className="text-white hover:text-white no-underline hover:no-underline"
                            >
                              Set Risk Issue
                            </Link>
                          </LozengeField>
                        </div>
                      )}
                    </Cell>
                    <Cell width="8%" className="border-r">
                      {levelMap[`${id}-${role}`] === 2 && (
                        <LozengeField appreance="removed" isBold={true}>
                          {status_approval_name}
                        </LozengeField>
                      )}
                    </Cell>
                    <Cell width="8%" className="border-r">
                      {levelMap[`${id}-${role}`] === 2 && (
                        <div className="w-16 flex items-center">
                          <LozengeField appreance="moved" isBold={true}>
                            <div className="flex gap-1 py-0.5">
                              <Image src={ImageCircleArrowYellow} alt="" />
                              <div>Send</div>
                            </div>
                          </LozengeField>
                        </div>
                      )}
                    </Cell>
                    <Cell width="8%" className="border-r">
                      {levelMap[`${id}-${role}`] === 2 && (
                        <div className="flex justify-center items-center w-7">
                          <ButtonIcon
                            icon={<IconQuestions />}
                            color={"blue"}
                            handleClick={() => setShowModalDesc(true)}
                          />
                          <DescriptionModal
                            showModal={showModalDesc}
                            setShowModal={setShowModalDesc}
                            value={deskripsi}
                          />
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
