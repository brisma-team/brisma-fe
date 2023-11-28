import {
  Breadcrumbs,
  ButtonField,
  PageTitle,
  CustomPagination,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import {
  CardFilterOverview,
  CardOverview,
} from "@/components/molecules/reference/survey/overview";
import LayoutSurveyReference from "@/layouts/reference/LayoutSurveyReference";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useOverview } from "@/data/reference/admin-survey/overview";
import { useRouter } from "next/router";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Reference", path: "/reference" },
  { name: "Form Survei", path: "/reference/survey/overview" },
];

const index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showModalCreateTemplate, setShowModalCreateTemplate] = useState(false);

  const [showModalConfirmEnable, setShowModalConfirmEnable] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalScore, setShowModalScore] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  const [selectedTemplateId, setSelectedTemplateId] = useState(0);

  const [filter, setFilter] = useState({
    kode: "",
    judul: "",
    nama_pembuat: "",
    status: "",
    jenis: "",
    tanggal_pembuatan: "",
    tanggal_approval: "",
    sort_by: "ASC",
    limit: 3,
    page: 1,
  });
  const [params, setParams] = useState({
    kode: "",
    judul: "",
    nama_pembuat: "",
    status: "",
    jenis: "",
    tanggal_pembuatan: "",
    tanggal_approval: "",
    sort_by: "ASC",
    limit: 3,
    page: 1,
  });

  const { overview } = useOverview("all", params);

  useEffect(() => {
    if (overview?.data?.length) {
      const mapping = overview?.data?.map((v) => {
        return {
          id: v.id,
          kode: v.project_template_id,
          title: v.judul,
          jenis_kode: v.jenis_survey_kode,
          jenis_nama: v.jenis_survey_name,
          desc: v.deskripsi,
          createdBy: v.create_by.pn,
          createdAt: v.createdAt,
          approvalAt: "2022-10-10",
          is_active: v.is_active,
        };
      });

      setData(mapping);
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

  const handleEnableTemplate = (kode) => {
    setShowModalConfirmEnable(true);
  };

  const handleDetailTemplate = (kode) => {
    setShowModalConfirmEnable(true);
  };

  const handleShowScore = (kode) => {
    setShowModalConfirmEnable(true);
  };

  const handleDeleteTemplate = (kode) => {
    setShowModalConfirmEnable(true);
  };

  return (
    <LayoutSurveyReference>
      <div className="w-full h-full pr-16 pb-4">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Template Kuesioner Overview"} />
        </div>
        <div className="flex items-end gap-4">
          {/* Start Filter */}
          <div className="flex justify-between items-center gap-2">
            <div className="w-36 rounded bg-atlasian-blue-light">
              <ButtonField
                handler={handleShowFilter}
                text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
              />
            </div>
            <div className="w-36 rounded bg-atlasian-purple">
              <ButtonField
                handler={() => router.push("overview/buat-template/new")}
                text={"Buat Template"}
              />
            </div>
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
                    handleEnableTemplate={handleEnableTemplate}
                    handleDetailTemplate={handleDetailTemplate}
                    handleShowScore={handleShowScore}
                    handleDeleteTemplate={handleDeleteTemplate}
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
          defaultCurrentPage={1}
          totalData={data?.length}
        />
        {/* End Content */}
      </div>
    </LayoutSurveyReference>
  );
};

export default index;
