import {
  Breadcrumbs,
  ButtonIcon,
  ButtonIconBack,
  PageTitle,
} from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import {
  setObjData,
  resetObjData,
} from "@/slices/ewp/konsulting/analisa/lingkupEWPKonsultingSlice";
import {
  useMatrixDetail,
  useMatrixList,
} from "@/data/ewp/konsulting/analisa/matrix";
import { ButtonDelete, ButtonEdit } from "@/components/molecules/commons";
import { fetchApi, loadingSwal } from "@/helpers";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/analisa`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [selectedId, setSelectedId] = useState(0);

  const data = useSelector((state) => state.lingkupEWPKonsulting.objData);

  const { projectDetail } = useProjectDetail({ id });
  const { matrixList, matrixListMutate } = useMatrixList({ id });
  const { matrixDetail } = useMatrixDetail({ id: selectedId });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Analisa / Matrix Peluang`,
        path: `${pathName}/matrix`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (matrixList?.data?.length) {
      const mappingAnalisa = matrixList?.data?.map((v) => {
        const {
          auditor,
          mapa_uker_mcr,
          mapa_uker_mcr_control,
          status_persetujuan,
        } = v;
        return {
          kkpa_id: v?.id,
          auditor,
          status: status_persetujuan,
          lingkup: {
            kode: mapa_uker_mcr?.lingkup_pemeriksaan?.id,
            nama: mapa_uker_mcr?.lingkup_pemeriksaan?.judul_lingkup_pemeriksaan,
          },
          risk: {
            kode: mapa_uker_mcr?.mtd_risk_issue?.abbr,
            nama: mapa_uker_mcr?.mtd_risk_issue?.nama,
          },
          control: {
            kode: mapa_uker_mcr_control?.mtd_control?.abbr,
            nama: mapa_uker_mcr_control?.mtd_control?.nama,
          },
        };
      });

      dispatch(setObjData(mappingAnalisa));
    } else {
      dispatch(resetObjData());
    }
  }, [matrixList]);

  const handleClickEdit = (matrix_id) => {
    setSelectedId(matrix_id);
  };

  const handleClickDelete = async (matrix_id) => {
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/rencana_peluang/delete/${matrix_id}`,
      {}
    );
    matrixListMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack
          backUrl={`/ewp/konsulting/overview/${id}/analisa/lingkup`}
        />
        <PageTitle text="Matrix Peluang Peningkatan" />
      </div>
      {/* Start Content */}
      <div className="w-[60rem]">
        <TableTree>
          <Headers>
            <Header
              width="10%"
              className="border-x border-t rounded-ss-lg cell-custom-dataTables"
            >
              <div
                className={`custom-table-header justify-center text-sm font-semibold`}
              >
                AKSI
              </div>
            </Header>
            <Header
              width="45%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold">
                JUDUL MATRIX PELUANG
              </div>
            </Header>
            <Header
              width="15%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center text-sm font-semibold">
                TANGGAL
              </div>
            </Header>
            <Header
              width="30%"
              className="border-t border-r cell-custom-dataTables rounded-se-lg"
            >
              <div className="custom-table-header text-sm font-semibold">
                AUDITOR
              </div>
            </Header>
          </Headers>
          <Rows
            items={data}
            render={({ matrix_id, judul, tanggal, auditor }) => (
              <Row>
                <Cell width="10%" className={`border-x ${customCell}`}>
                  <div className="custom-table-position-center justify-center gap-1">
                    <ButtonIcon
                      icon={<ButtonEdit />}
                      handleClick={() => handleClickEdit(matrix_id)}
                      color={"yellow"}
                    />
                    <ButtonIcon
                      icon={<ButtonDelete />}
                      handleClick={() => handleClickDelete(matrix_id)}
                    />
                  </div>
                </Cell>
                <Cell width="45%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">{judul}</div>
                </Cell>
                <Cell width="15%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {tanggal}
                  </div>
                </Cell>
                <Cell width="30%" className={`border-r ${customCell}`}>
                  <div className="custom-table-position-center">{auditor}</div>
                </Cell>
              </Row>
            )}
          />
        </TableTree>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
