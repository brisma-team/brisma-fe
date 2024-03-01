import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardFilterTable,
  DataTables,
} from "@/components/molecules/ewp/konsulting/analisa/lingkup";
import { useLingkupAnalisa } from "@/data/ewp/konsulting/analisa/lingkup";
import {
  setObjData,
  resetObjData,
} from "@/slices/ewp/konsulting/analisa/lingkupEWPKonsultingSlice";
import _ from "lodash";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathName = `${baseUrl}/analisa`;

  const [showFilter, setShowFilter] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [filter, setFilter] = useState({
    auditor: "",
    lingkup: "",
    risk: "",
    control: "",
    status: "",
  });
  const [params, setParams] = useState({
    auditor: "",
    lingkup: "",
    risk: "",
    control: "",
    status: "",
  });

  const data = useSelector((state) => state.lingkupEWPKonsulting.objData);
  const { lingkupAnalisa } = useLingkupAnalisa({ id, ...params });

  const { projectDetail } = useProjectDetail({ id });

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
        name: `Analisa / Lingkup Konsulting Ringkasan`,
        path: `${pathName}/lingkup`,
      },
    ]);
  }, [projectDetail]);

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

  useEffect(() => {
    if (lingkupAnalisa?.data?.length) {
      const mappingAnalisa = lingkupAnalisa?.data?.map((v) => {
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
  }, [lingkupAnalisa]);

  useEffect(() => {
    console.log("filter => ", filter);
  }, [filter]);

  // [ START ] handler for filter
  const handleShowFilter = () => {
    setShowFilter((prev) => {
      return !prev;
    });
  };

  const handleChangeFilter = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleResetFilter = (property) => {
    setFilter({ ...filter, [property]: "" });
  };
  // [ END ] handler for filter

  const handleClickMatrix = () => {
    router.push(`/ewp/konsulting/overview/${id}/analisa/matrix`);
  };

  const handleClickDokumenPerencanaan = () => {
    router.push(`/ewp/konsulting/overview/${id}/perencanaan/dokumen`);
  };

  const handleClickKertasKerja = (kkpa_id) => {
    router.push(`/ewp/konsulting/overview/${id}/analisa/lingkup/${kkpa_id}`);
  };

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="mb-5">
        <PageTitle text="Lingkup Konsulting" />
      </div>
      <div className="flex items-end gap-4 mb-4">
        {/* Start Filter */}
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 rounded bg-atlasian-blue-light">
            <ButtonField
              handler={handleShowFilter}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-36 rounded bg-atlasian-purple">
            <ButtonField handler={handleClickMatrix} text={"Matrix Peluang"} />
          </div>
        </div>
      </div>
      <CardFilterTable
        showFilter={showFilter}
        filter={filter}
        handleChange={handleChangeFilter}
        handleReset={handleResetFilter}
      />
      {/* Start Content */}
      <DataTables
        data={data}
        handleClickDokumenPerencanaan={handleClickDokumenPerencanaan}
        handleClickKertasKerja={handleClickKertasKerja}
      />
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
