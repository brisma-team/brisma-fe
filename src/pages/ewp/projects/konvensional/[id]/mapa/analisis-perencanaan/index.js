import {
  Breadcrumbs,
  ButtonIcon,
  Card,
  CheckboxField,
  DivButton,
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
  ImageCircleArrowRed,
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
  ModalDescAnlysisSubActivity,
} from "@/components/molecules/ewp/konvensional/analisis-perencanaan";
import {
  confirmationSwal,
  inputSwal,
  loadingSwal,
  useDeleteData,
  usePostData,
} from "@/helpers";
import useUser from "@/data/useUser";

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
  const [showModalDescAnlysisSubActivity, setShowModalDescAnlysisSubActivity] =
    useState(false);

  const [selectedUker, setSelectedUker] = useState({ id: "", name: "" });
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [selectedSubActivityId, setSelectedSubActivityId] = useState(null);
  const [selectedDesc, setSelectedDesc] = useState("");

  const [showModalDesc, setShowModalDesc] = useState(false);
  const [type, setType] = useState("");

  const { user } = useUser();
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
          child_parent_id: childParams.aktivitas_id,
          kode: v.mtd_sub_aktivitas_kode,
          name: v.mtd_sub_aktivitas_name,
          status_approval_kode: v.stc_status_persetujuan_kode,
          status_approval_name: v.stc_status_persetujuan_name,
          deskripsi: v.deskripsi,
          pic_pn: v.pn_pic_analisa,
          pic_name: v.name_pic_analisa,
          risk: v.total_risk_sub,
          is_reviewed: v.is_reviewed,
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
              deskripsi: aktivitas.deskripsi,
              is_reviewed: aktivitas.is_reviewed,
              children: [],
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
    setType("listSubActivity");
    planningAnalysisEWPMutate();
    loadingSwal("close");
  };

  const handleClickDescAnalysisSubActivity = (subActivityId) => {
    setSelectedSubActivityId(subActivityId);
    setShowModalDescAnlysisSubActivity(true);
  };

  const handleModalAddSubActivity = () => {
    setType("listSubActivity");
    planningAnalysisEWPMutate();
    setShowModalAddSubActivitiy(false);
  };

  const handleClickReview = async (isChecked, id, role) => {
    const payload = { is_reviewed: isChecked };
    if (role === "child-parent") {
      payload.aktivitas_id = id;
    } else if (role === "child") {
      payload.sub_aktivitas_id = id;
    }
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/update_review_status`,
      payload
    );
    mapaEWPMutate();
    planningAnalysisEWPMutate();
  };

  const handleUpdateApprovalStatusSubActivity = async (
    ukerId,
    activityId,
    subActivityId,
    type
  ) => {
    const payload = {
      aktivitas_kode: activityId,
      sub_aktivitas_kode: subActivityId,
      uker_id: ukerId,
      alasan: "",
      is_approved: "",
    };

    const result = await inputSwal();

    if (!result.isConfirmed) {
      return;
    }

    loadingSwal();
    if (type === "send") {
      payload.is_approved = true;
    } else {
      payload.is_approved = false;
      payload.alasan = result.value;
    }
    await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/sub_aktivitas/approval`,
      payload
    );
    loadingSwal("close");
  };

  const positionCenter = `w-full h-full flex justify-center items-center`;

  return (
    <LandingLayoutEWP>
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
                child_parent_id,
                kode,
                name,
                risk,
                pic_pn,
                pic_name,
                is_reviewed,
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
                  <Cell
                    width="7%"
                    className={`border-x cell-width-full-height-full`}
                  >
                    <div className={positionCenter}>
                      {role !== "parent" && (
                        <CheckboxField
                          isChecked={is_reviewed}
                          handleChange={(e) =>
                            handleClickReview(e.target.checked, id, role)
                          }
                        />
                      )}
                    </div>
                  </Cell>
                  <Cell
                    width="6%"
                    className={`border-r cell-width-full-height-full`}
                  >
                    {levelMap[`${id}-${role}`] > 0 && (
                      <div className={positionCenter}>
                        <ButtonIcon
                          icon={
                            <div className="rounded-full border border-atlasian-red w-5 h-5 p-1">
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
                      </div>
                    )}
                  </Cell>
                  <Cell
                    width="27%"
                    className="border-r cell-width-full-height-full cell-custom-dataTables flex justify-between items-center"
                  >
                    <div
                      className={`w-full flex pt-1 ${
                        levelMap[`${id}-${role}`] === 1
                          ? `pl-6`
                          : levelMap[`${id}-${role}`] === 2
                          ? `pl-12`
                          : `pl-0`
                      }`}
                    >
                      {role !== "child" ? (
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
                      <div
                        className={`flex items-center w-full justify-between ml-2`}
                      >
                        <div>{`${kode} - ${name}`}</div>
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
                          </>
                        )}
                      </div>
                    </div>
                  </Cell>
                  <Cell
                    width="15%"
                    className="border-r cell-width-full-height-full cell-custom-dataTables"
                  >
                    {levelMap[`${id}-${role}`] === 2 && (
                      <div className="w-full h-full flex items-center justify-center">
                        {pic_name}
                      </div>
                    )}
                  </Cell>
                  <Cell
                    width="5%"
                    className="border-r cell-width-full-height-full cell-custom-dataTables"
                  >
                    {levelMap[`${id}-${role}`] === 2 && (
                      <div className={positionCenter}>
                        <ButtonIcon
                          icon={<IconQuestions />}
                          color={"blue"}
                          handleClick={() => (
                            handleClickDescAnalysisSubActivity(id),
                            setSelectedDesc(deskripsi)
                          )}
                        />
                      </div>
                    )}
                  </Cell>
                  <Cell
                    width="8%"
                    className="border-r cell-width-full-height-full cell-custom-dataTables"
                  >
                    <div className={positionCenter}>{risk}</div>
                  </Cell>
                  <Cell
                    width="8%"
                    className="border-r cell-width-full-height-full cell-custom-dataTables"
                  >
                    {levelMap[`${id}-${role}`] === 2 && (
                      <div className={positionCenter}>
                        <LozengeField appreance="inprogress" isBold={true}>
                          <Link
                            href={`/ewp/projects/konvensional/${routeParamId}/mapa/analisis-perencanaan/${kode}/${parent_id}`}
                            className="text-white hover:text-white no-underline hover:no-underline py-[2.5px]"
                          >
                            <div className="py-[2.5px]">Set Risk Issue</div>
                          </Link>
                        </LozengeField>
                      </div>
                    )}
                  </Cell>
                  <Cell
                    width="8%"
                    className="border-r cell-width-full-height-full cell-custom-dataTables"
                  >
                    <div className={positionCenter}>
                      {levelMap[`${id}-${role}`] === 2 &&
                        (status_approval_name?.toLowerCase() === "on kta" ? (
                          <LozengeField appreance="removed" isBold={true}>
                            <div className="text-white py-[2.5px]">On KTA</div>
                          </LozengeField>
                        ) : status_approval_name?.toLowerCase() === "on ata" ? (
                          <LozengeField appreance="moved" isBold={true}>
                            <div className="text-white py-[2.5px]">On ATA</div>
                          </LozengeField>
                        ) : null)}
                    </div>
                  </Cell>
                  <Cell
                    width="8%"
                    className="border-r cell-width-full-height-full cell-custom-dataTables"
                  >
                    <div className={positionCenter}>
                      {levelMap[`${id}-${role}`] === 2 &&
                        (pic_pn === user.data.pn
                          ? levelMap[`${id}-${role}`] === 2 &&
                            (status_approval_name?.toLowerCase() ===
                            "on kta" ? (
                              <LozengeField appreance="removed" isBold={true}>
                                <DivButton
                                  className={"flex gap-1 py-0.5"}
                                  handleClick={() =>
                                    handleUpdateApprovalStatusSubActivity(
                                      parent_id,
                                      child_parent_id,
                                      id,
                                      "reject"
                                    )
                                  }
                                >
                                  <Image src={ImageCircleArrowRed} alt="" />
                                  <div className="text-white">Reject</div>
                                </DivButton>
                              </LozengeField>
                            ) : status_approval_name?.toLowerCase() ===
                              "on ata" ? (
                              <LozengeField appreance="moved" isBold={true}>
                                <DivButton
                                  className={"flex gap-1 py-0.5"}
                                  handleClick={() =>
                                    handleUpdateApprovalStatusSubActivity(
                                      parent_id,
                                      child_parent_id,
                                      id,
                                      "send"
                                    )
                                  }
                                >
                                  <Image src={ImageCircleArrowYellow} alt="" />
                                  <div className="text-white">Send</div>
                                </DivButton>
                              </LozengeField>
                            ) : null)
                          : "")}
                    </div>
                  </Cell>
                  <Cell
                    width="8%"
                    className="border-r cell-width-full-height-full cell-custom-dataTables"
                  >
                    {levelMap[`${id}-${role}`] === 2 && (
                      <div className={positionCenter}>
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
          <ModalAddActivity
            showModal={showModalAddActivity}
            setShowModal={setShowModalAddActivitiy}
            mutate={mapaEWPMutate}
            ukerValue={selectedUker}
          />
          <ModalAddSubActivity
            showModal={showModalAddSubActivity}
            setShowModal={setShowModalAddSubActivitiy}
            activityId={selectedActivityId}
            handleSubmit={handleModalAddSubActivity}
          />
          <ModalDescAnlysisSubActivity
            showModal={showModalDescAnlysisSubActivity}
            subActivityId={selectedSubActivityId}
            value={selectedDesc}
            handleCloseModal={() => (
              setSelectedDesc(""),
              setShowModalDescAnlysisSubActivity(false),
              planningAnalysisEWPMutate()
            )}
          />
        </div>
      </Card>
    </LandingLayoutEWP>
  );
};

export default index;
