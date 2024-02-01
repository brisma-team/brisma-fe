import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useOverviewKKPA } from "@/data/ewp/konvensional/kkpa";
import {
  CardFilterTableOverview,
  TableOverview,
} from "@/components/molecules/ewp/konvensional/kkpa/overview";
import _ from "lodash";

const index = () => {
  const { id, audited } = useRouter().query;
  const router = useRouter();
  const baseUrl = `/ewp/projects/konvensional/${id}/kkpa/${audited}`;
  const [dataTables, setDataTables] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [filter, setFilter] = useState({
    auditor: "",
    status: "",
    risk_issue_kode: "",
    risk_issue_name: "",
    sub_major_kode: "",
    sub_major_name: "",
    sub_aktivitas_kode: "",
    sub_aktivitas_name: "",
    aktivitas_kode: "",
    aktivitas_name: "",
    branch: "",
    orgeh: "",
    limit: 10,
    page: 1,
  });
  const [params, setParams] = useState({
    auditor: "",
    status: "",
    risk_issue_kode: "",
    risk_issue_name: "",
    sub_major_kode: "",
    sub_major_name: "",
    sub_aktivitas_kode: "",
    sub_aktivitas_name: "",
    aktivitas_kode: "",
    aktivitas_name: "",
    branch: "",
    orgeh: "",
    limit: 10,
    page: 1,
  });

  const { auditorEWP } = useAuditorEWP({ id });
  const { overviewKKPA } = useOverviewKKPA({
    id,
    is_na: audited !== "audited",
    ...params,
  });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id?.toUpperCase()} / KKPA ${
        audited !== "audited" ? "Unaudited" : ""
      } Overview`,
      path: `/ewp/projects/konvensional/${id}/kkpa`,
    },
  ];

  useEffect(() => {
    if (overviewKKPA?.data?.length) {
      const mapping = overviewKKPA.data.map((v) => {
        const { id, auditor, status_persetujuan, mapa_uker_mcr } = v;
        return {
          id,
          auditor: auditor?.name,
          status: status_persetujuan,
          mandays: mapa_uker_mcr?.mandays,
          risk_issue_code: mapa_uker_mcr?.ref_risk_issue_kode,
          risk_issue_name: mapa_uker_mcr?.ref_risk_issue_name,
          sub_major_code: mapa_uker_mcr?.ref_sub_major_code,
          sub_major_name: mapa_uker_mcr?.ref_sub_major_name,
          sub_aktivitas: mapa_uker_mcr?.ref_sub_aktivitas_name,
          aktivitas: mapa_uker_mcr?.ref_aktivitas_name,
          branch_kode: mapa_uker_mcr?.mapa_uker?.ref_auditee_branch_kode,
          branch_name: mapa_uker_mcr?.mapa_uker?.ref_auditee_branch_name,
          orgeh_kode: mapa_uker_mcr?.mapa_uker?.ref_auditee_orgeh_kode,
          orgeh_name: mapa_uker_mcr?.mapa_uker?.ref_auditee_orgeh_name,
        };
      });
      setDataTables(mapping);
      setTotalData(overviewKKPA?.pagination?.totalData);
    } else {
      setDataTables([]);
      setTotalData(0);
    }
  }, [overviewKKPA]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const handleClickButtonUnaudited = () => {
    router.push(`/ewp/projects/konvensional/${id}/kkpa/unaudited`);
  };

  // [START] Filter Table
  const handleChangeFilterText = (props, value) => {
    setFilter((prev) => {
      return {
        ...prev,
        [props]: value,
      };
    });
  };

  const handleChangeFilterSelect = (props, value) => {
    setFilter((prev) => {
      return {
        ...prev,
        [props]: value,
      };
    });
  };
  // [END] Filter Table

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle
          text={`K.K.P.A ${audited !== "audited" ? "Unaudited" : ""} Overview`}
          className={audited !== "audited" && "text-atlasian-red"}
        />
      </div>
      <div className="flex justify-between items-center gap-2 w-72 mb-5">
        <div className="w-36 rounded bg-atlasian-blue-light">
          <ButtonField
            handler={() => setShowFilter(!showFilter)}
            text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
          />
        </div>
        {audited === "audited" ? (
          <div className="w-36 rounded bg-atlasian-red">
            <ButtonField
              text={"Unaudited List"}
              handler={handleClickButtonUnaudited}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="w-fit">
        <CardFilterTableOverview
          data={filter}
          showFilter={showFilter}
          handleChangeText={handleChangeFilterText}
          handleChangeSelect={handleChangeFilterSelect}
        />
      </div>
      {/* Start Content */}
      <div className="mt-5">
        <TableOverview data={dataTables} baseUrl={baseUrl} />
      </div>
      <div className="w-full border-x border-b rounded-b-xl pb-5 pt-0.5">
        <div className="-mt-3">
          <CustomPagination
            perPage={filter.limit}
            handleSetPagination={(start, end, pageNow) =>
              handleChangeFilterText("page", pageNow)
            }
            defaultCurrentPage={filter.page}
            totalData={totalData}
          />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;
