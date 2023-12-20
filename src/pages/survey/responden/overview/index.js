import {
  Breadcrumbs,
  ButtonField,
  PageTitle,
  CustomPagination,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import {
  CardOverview,
  CardFilterOverview,
} from "@/components/molecules/survey/responden/overview";
import { LandingLayoutSurvey } from "@/layouts/survey";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useOverview } from "@/data/survey/responden/overview";
import { useRouter } from "next/router";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Survei", path: "/survey" },
  { name: "Survei Overview", path: "/survey/responden/overview" },
];

const index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(0);

  const [filter, setFilter] = useState({
    nama_pembuat: "",
    pn_responden: "",
    project_code: "",
    jenis_survey: "",
    status_survey: "",
    tanggal_dimulai: "",
    tanggal_selesai: "",
    sort_by: "ASC",
    limit: 3,
    page: 1,
  });
  const [params, setParams] = useState({
    nama_pembuat: "",
    pn_responden: "",
    project_code: "",
    jenis_survey: "",
    status_survey: "",
    tanggal_dimulai: "",
    tanggal_selesai: "",
    sort_by: "ASC",
    limit: 3,
    page: 1,
  });

  const { overview } = useOverview("all", params);

  useEffect(() => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
      };
    });
  }, [filter.limit]);

  useEffect(() => {
    setTotalData(overview?.pagination?.totalData);
    if (overview?.data?.length) {
      const mapping = overview?.data?.map((v) => {
        return {
          id: v.id,
          jenis_kode: v.jenis_survey_kode,
          jenis_nama: v.jenis_survey_name,
          nama_survey: v.nama_survey,
          kode: v.project_survey_id,
          desc: v.deskripsi,
          tanggal_pelaksanaan: `${v.pelaksanaan_start} s/d ${v.pelaksanaan_end}`,
          createdBy: v.create_by,
          createdAt: v.createdAt,
          status_kode: v.status_kode,
          status_name: v.status_name,
          status_persetujuan: v.status_persetujuan,
        };
      });

      setData(mapping);
    } else {
      setData([]);
    }
  }, [overview]);

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

  const handleShowFilter = () => {
    setShowFilter((prev) => {
      return !prev;
    });
  };

  const handleChangeFilter = (props, value) => {
    setFilter((prev) => {
      return {
        ...prev,
        [props]: value,
      };
    });
  };

  const handleClickApproval = (id) => {
    router.push(`overview/${id}?is_approver=true`);
  };

  const handleClickDownload = (id) => {
    router.push(`overview/${id}/preview`);
  };

  const handleClickShowScoreSurvey = (id) => {
    router.push(`overview/${id}/penilaian`);
  };

  return (
    <LandingLayoutSurvey overflowY={true}>
      <div className="w-full h-full pr-16 pb-20">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Survei Overview"} />
        </div>
        <div className="flex items-end gap-4">
          <div className="w-36 rounded bg-atlasian-blue-light">
            <ButtonField
              handler={handleShowFilter}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
        </div>
        <div className="mt-3">
          <CardFilterOverview
            showFilter={showFilter}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <div className="w-full flex items-end justify-end">
          <SelectSortFilter change={handleChangeFilter} />
        </div>
        {/* Start Content */}
        {!data?.length ? (
          <DataNotFound />
        ) : (
          data?.length && (
            <div className="grid lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 px-0.5 py-4">
              {data.map((item, idx) => {
                return (
                  <CardOverview
                    key={idx}
                    data={item}
                    handleDownloadSurvey={handleClickDownload}
                    handleApprovalSurvey={handleClickApproval}
                    handleShowScoreSurvey={handleClickShowScoreSurvey}
                  />
                );
              })}
            </div>
          )
        )}
        <CustomPagination
          perPage={filter.limit}
          handleSetPagination={(start, end, pageNow) =>
            handleChangeFilter("page", pageNow)
          }
          defaultCurrentPage={filter.page}
          totalData={totalData}
        />
        {/* End Content */}
      </div>
    </LandingLayoutSurvey>
  );
};

export default index;
