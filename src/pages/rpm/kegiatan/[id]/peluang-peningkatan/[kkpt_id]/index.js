import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import _ from "lodash";
import {
  CardOverview,
  CardFilterOverview,
} from "@/components/molecules/rpm/kegiatan/overview/rekomendasi";
import { useRekomendasiList } from "@/data/rpm/kegiatan";
import { LandingLayoutRPMKegiatan } from "@/layouts/rpm";
import { IconFile } from "@/components/icons";
import { useRouter } from "next/router";

const index = () => {
  const { id, kkpt_id } = useRouter().query;
  const [showFilter, setShowFilter] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    control_kode: "",
    risk_kode: "",
    judul_lingkup: "",
    batas_waktu_start: "",
    batas_waktu_end: "",
    status_complete: "",
    desc: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const baseUrl = `/rpm/kegiatan/${id}`;
  const [params, setParams] = useState({
    control_kode: "",
    risk_kode: "",
    judul_lingkup: "",
    batas_waktu_start: "",
    batas_waktu_end: "",
    status_complete: "",
    desc: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Kegiatan Overview", path: "/rpm/kegiatan" },
      {
        name: `Landing Monitoring`,
        path: `${baseUrl}`,
      },
      {
        name: `Peluang Peningkatan`,
        path: `${baseUrl}/peluang-peningkatan`,
      },
      {
        name: `Rekomendasi Overview`,
        path: `${baseUrl}/peluang-peningkatan/${kkpt_id}`,
      },
    ]);
  }, [id]);

  const { rekomendasiList, rekomendasiListMutate } = useRekomendasiList({
    kkpt_id,
    rpm_id: id,
    params,
  });

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      rekomendasiListMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (rekomendasiList?.data?.rekomendasi?.length) {
      const mapping = rekomendasiList?.data?.rekomendasi?.map((v) => {
        const { batas_waktu, status_complete, rekomendasi_kkpt } = v;
        return {
          tipe: status_complete,
          rekomendasi: rekomendasi_kkpt?.description,
          lingkup: rekomendasi_kkpt?.lingkup?.judul_lingkup_pemeriksaan,
          risk:
            rekomendasi_kkpt?.risk?.mtd_risk_issue?.abbr +
            " - " +
            rekomendasi_kkpt?.risk?.mtd_risk_issue?.nama,
          control:
            rekomendasi_kkpt?.control?.mtd_control?.abbr +
            " - " +
            rekomendasi_kkpt?.control?.mtd_control?.nama,
          deadline: batas_waktu,
          href: `/rpm/kegiatan/${id}/peluang-peningkatan/${kkpt_id}/rekomendasi/${v?.id}/tindak-lanjut`,
        };
      });
      setData(mapping);
      setTotalData(rekomendasiList?.data?.pagination?.totalData);
    } else {
      setData([]);
      setTotalData(1);
    }
  }, [rekomendasiList]);

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  return (
    <LandingLayoutRPMKegiatan>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flexitems-center mb-6">
        <PageTitle text={"Rekomendasi Overview"} />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
        </div>
        <div className="w-24 rounded bg-atlasian-blue-light">
          <ButtonField
            icon={<IconFile primaryColor="white" />}
            text={`Arsip`}
          />
        </div>
      </div>
      <div>
        <CardFilterOverview
          showFilter={showFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="w-full mt-6 flex items-end justify-end">
        <SelectSortFilter
          change={handleChangeFilter}
          options={[4, 8, 16, 50, 100]}
        />
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {data?.length ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 my-4">
          {data.map((v, i) => {
            return <CardOverview key={i} data={v} />;
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
      <CustomPagination
        perPage={filter.limit}
        defaultCurrentPage={1}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        totalData={totalData}
      />
      {/* End Content */}
    </LandingLayoutRPMKegiatan>
  );
};

export default index;
