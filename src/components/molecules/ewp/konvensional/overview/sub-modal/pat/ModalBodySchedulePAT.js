import { useEffect } from "react";
import { ButtonField, ErrorValidation, Pagination } from "@/components/atoms";
import { useState } from "react";
import { useOverviewEWP } from "@/data/ewp/konvensional";
import _ from "lodash";
import { CardTypeCount, DataNotFound } from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import { setProjectOverviewData } from "@/slices/ewp/projectOverviewEWPSlice";
import CustomSelect from "@/components/molecules/commons/CustomSelect";
import RowTable from "../RowTable";
import useUser from "@/data/useUser";
import CardFilterProjectOverview from "../../CardFilterProjectOverview";

const ModalBodySchedulePAT = ({ setCurrentModalStage, setDifferentKTA }) => {
  const dispatch = useDispatch();
  const projectOverviewData = useSelector(
    (state) => state.projectOverviewEWP.projectOverviewData
  );
  const validationErrors = useSelector(
    (state) => state.projectOverviewEWP.validationErrorsSchedulePAT
  );

  const isDisabled = false;
  const [showFilter, setShowFilter] = useState(false);
  const [schedulePAT, setSchedulePAT] = useState([]);
  const [yearOption, setYearOption] = useState([]);
  const [countStatus, setCountStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    name: "",
    is_audited: "",
    ref_metode: "",
    ref_tipe: "",
    ref_jenis: "",
    ref_tema: "",
  });
  const [params, setParams] = useState({
    name: "",
    is_audited: "",
    ref_metode: "",
    ref_tipe: "",
    ref_jenis: "",
    ref_tema: "",
  });

  const yearPAT = useOverviewEWP("tahun_pat", {});
  const { overviewEWP, overviewEWPMutate } = useOverviewEWP("jadwal_pat", {
    ...params,
    pages: currentPage,
    limit: 6,
    tahun: projectOverviewData.audit_year,
  });
  const { user } = useUser();

  useEffect(() => {
    setCurrentModalStage(2);
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      overviewEWPMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (yearPAT.overviewEWP?.data) {
      const mappingYear = yearPAT.overviewEWP?.data.map((v) => {
        return { label: v.tahun.toString(), value: v.tahun.toString() };
      });
      setYearOption(mappingYear);
    }
  }, [yearPAT.overviewEWP]);

  useEffect(() => {
    if (overviewEWP?.data) {
      const mappingSchedulePAT = overviewEWP?.data?.list_pat?.map((v) => {
        return _.pick(v, [
          "id",
          "name_kegiatan_audit",
          "tim_audit",
          "ref_metode",
          "ref_tipe",
          "ref_jenis",
          "ref_tema",
          "audited",
        ]);
      });
      setSchedulePAT(mappingSchedulePAT);
      const totalCount = overviewEWP?.data?.list_pat?.length;
      if (totalCount) {
        const auditCounts = overviewEWP?.data?.list_pat.reduce((acc, item) => {
          const audit = item?.audited;
          acc[audit] = (acc[audit] || 0) + 1;
          return acc;
        }, {});

        const result = Object.entries(auditCounts).map(([audit, count]) => ({
          status: audit === "true" ? "Sudah di-Audit" : "Belum di-Audit",
          count: count.toString(),
          percent: ((count / totalCount) * 100).toFixed(0),
        }));

        setCountStatus(result);
      }
    }
  }, [overviewEWP]);

  const handleChangeFilterYear = (e) => {
    const updatedData = {
      ...projectOverviewData,
      audit_year: e.value,
    };
    dispatch(setProjectOverviewData(updatedData));
    overviewEWPMutate();
  };

  const handleClick = (value) => {
    const {
      id,
      name_kegiatan_audit,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
      tim_audit,
      audited,
    } = value;

    const updatedData = {
      ...projectOverviewData,
      project_name: name_kegiatan_audit,
      pat_jadwal_audit_id: id,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
      tim_audit,
      audited,
    };
    dispatch(setProjectOverviewData(updatedData));

    const result = tim_audit?.kta?.find((v) => v?.pn_kta == user?.data?.pn);

    if (result) {
      setDifferentKTA(false);
    }
  };

  return (
    <div className="w-[71rem] px-4 py-2">
      <p className="text-brisma text-lg font-bold">RAO Tangerang Selatan</p>
      <div className="w-full flex justify-between items-center my-3">
        <div className="flex w-full justify-between">
          <div className="flex gap-3">
            <div>
              <CustomSelect
                placeholder="Pilih tahun"
                isSearchable={false}
                optionValue={yearOption}
                handleChange={handleChangeFilterYear}
                selectedValue={
                  projectOverviewData.audit_year
                    ? {
                        label: projectOverviewData.audit_year,
                        value: projectOverviewData.audit_year,
                      }
                    : ""
                }
              />
              {validationErrors["audit_year"] && (
                <ErrorValidation message={validationErrors["audit_year"]} />
              )}
            </div>
            <div>
              <div className="bg-atlasian-blue-light w-32 h-8 rounded flex items-center mt-1">
                <ButtonField
                  text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
                  handler={() => setShowFilter(!showFilter)}
                />
              </div>
              <div className="relative">
                <CardFilterProjectOverview
                  showFilter={showFilter}
                  filter={filter}
                  setFilter={setFilter}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {countStatus?.length ? (
              <div className="flex gap-2">
                {countStatus.map((v, i) => {
                  return (
                    <CardTypeCount
                      key={i}
                      title={v.status}
                      total={v.count}
                      percent={v.percent}
                      width={"w-[12.8rem]"}
                    />
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="w-full text-sm mt-6">
        <div className="border-2 border-[#DFE1E6] rounded-xl">
          <div className="overflow-y-scroll max-h-80">
            {/* Start Table */}
            {/* Start Table Header */}
            <div className="flex h-14 font-bold">
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[5%] flex items-center justify-center">
                <p>Aksi</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center text-justify px-2 py-3">
                <p>Judul Jadwal</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[17%] flex items-center text-justify px-2 py-3">
                <p>Tim</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[12%] flex items-center text-justify px-2 py-3">
                <p>Tipe</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[12%] flex items-center text-justify px-2 py-3">
                <p>Jenis</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[12%] flex items-center text-justify px-2 py-3">
                <p>Tema</p>
              </div>
              <div className="border-b-2 border-[#DFE1E6] w-[12%] flex items-center px-2 py-3">
                <p>Status Audit</p>
              </div>
            </div>
            {/* End Header Table */}
            {/* Start Body Table */}
            {schedulePAT.length ? (
              schedulePAT?.map((items, idx) => {
                return (
                  <RowTable
                    key={idx}
                    idx={idx + 1}
                    totalData={schedulePAT.length}
                    value={items}
                    handleClick={handleClick}
                    isDisabled={isDisabled}
                    selectedValue={projectOverviewData.pat_jadwal_audit_id}
                  />
                );
              })
            ) : (
              <DataNotFound />
            )}
            {/* End Body Table */}
            {/* End Table */}
          </div>
        </div>
        {validationErrors["pat_jadwal_audit_id"] && (
          <ErrorValidation message={validationErrors["pat_jadwal_audit_id"]} />
        )}

        {validationErrors["audited"] && (
          <ErrorValidation message={validationErrors["audited"]} />
        )}
        <Pagination setCurrentPage={setCurrentPage} pages={1} />
      </div>
    </div>
  );
};

export default ModalBodySchedulePAT;
