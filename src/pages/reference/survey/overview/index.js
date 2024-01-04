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
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Reference", path: "/reference" },
  { name: "Form Survei", path: "/reference/survey/overview" },
];

const index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(0);

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

  const { overview, overviewMutate } = useOverview("all", params);

  useEffect(() => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
      };
    });
  }, [filter.limit]);

  useEffect(() => {
    setTotalData(overview?.pagination?.totalItems);
    if (overview?.data?.length) {
      const mapping = overview?.data?.map((v) => {
        return {
          id: v.id,
          kode: v.project_template_id,
          title: v.judul,
          jenis_kode: v.jenis_survey_kode,
          jenis_nama: v.jenis_survey_name,
          desc: v.deskripsi,
          createdBy: v.create_by,
          createdAt: v.createdAt,
          approvalAt:
            v.template_survey_log_persetujuan[
              v.template_survey_log_persetujuan.length - 1
            ]?.createdAt,
          status_persetujuan: v.status_persetujuan,
          is_active: v.is_active,
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

  const handleEnableTemplate = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin mengaktifkan template survey ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/aktivasi/${id}?is_active=true`,
      {}
    );
    overviewMutate();
    loadingSwal("close");
  };

  const handleDisableTemplate = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menonaktifkan template survey ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/aktivasi/${id}?is_active=false`,
      {}
    );
    overviewMutate();
    loadingSwal("close");
  };

  const handleClickSimulation = (id) => {
    router.push(`overview/${id}/rumus`);
  };

  const handleClickApproval = (id) => {
    router.push(`overview/${id}?is_approval=true`);
  };

  const handleClickDownload = (id) => {
    router.push(`overview/${id}/preview?is_print=true`);
  };

  const handleDeleteTemplate = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus template survey ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/delete/${id}`
    );
    overviewMutate();
    loadingSwal("close");
  };

  return (
    <LayoutSurveyReference overflowY={true}>
      <div className="w-full h-full pr-16 pb-20">
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
                handler={() => router.push("overview/new")}
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
                    handleDisableTemplate={handleDisableTemplate}
                    handleClickApproval={handleClickApproval}
                    handleClickDownload={handleClickDownload}
                    handleClickSimulation={handleClickSimulation}
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
          defaultCurrentPage={filter.page}
          totalData={totalData}
          isDynamicPageTotal
        />
        {/* End Content */}
      </div>
    </LayoutSurveyReference>
  );
};

export default index;
