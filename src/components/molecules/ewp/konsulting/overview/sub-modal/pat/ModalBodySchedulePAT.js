import { useEffect } from "react";
import {
  ButtonField,
  CustomPagination,
  ErrorValidation,
} from "@/components/atoms";
import { useState } from "react";
import _ from "lodash";
import { CardTypeCount, DataNotFound } from "@/components/molecules/commons";
import CustomSelect from "@/components/molecules/commons/CustomSelect";
import CardFilterProjectOverview from "./CardFilterProjectOverview";
import {
  useYearPAT,
  useScheduleActivityPAT,
} from "@/data/ewp/konsulting/overview";
import RowTable from "../RowTable";

const ModalBodySchedulePAT = ({
  data,
  user,
  validationErrors,
  setCurrentModalStage,
  handleChangeData,
  handleChangeFilter,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [schedulePAT, setSchedulePAT] = useState([]);
  const [yearOption, setYearOption] = useState([]);
  const [totalData, setTotalData] = useState(1);
  const [countStatus, setCountStatus] = useState([]);

  const [pagination, setPagination] = useState({
    min: 0,
    max: 5,
  });
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

  const { yearPAT } = useYearPAT();
  const { scheduleActivityPAT, scheduleActivityPATMutate } =
    useScheduleActivityPAT({ ...params, tahun: data.audit_year });

  useEffect(() => {
    setCurrentModalStage(2);
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      scheduleActivityPATMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (yearPAT?.data?.length) {
      const mappingYear = yearPAT?.data?.map((v) => {
        return { label: v.tahun.toString(), value: v.tahun.toString() };
      });
      setYearOption(mappingYear);
    } else {
      setYearOption([]);
    }
  }, [yearPAT]);

  useEffect(() => {
    if (scheduleActivityPAT?.data) {
      const mappingSchedulePAT = scheduleActivityPAT?.data?.list_pat?.map(
        (v) => {
          return _.pick(v, [
            "id",
            "name_kegiatan_audit",
            "ref_penanggung_jawabs",
            "ref_metode",
            "ref_tipe",
            "ref_jenis",
            "ref_tema",
            "audited",
          ]);
        }
      );

      const totalCount = scheduleActivityPAT?.data?.list_pat?.length;
      if (totalCount) {
        const auditCounts = scheduleActivityPAT?.data?.list_pat.reduce(
          (acc, item) => {
            const audit = item?.audited;
            acc[audit] = (acc[audit] || 0) + 1;
            return acc;
          },
          {}
        );

        const result = Object.entries(auditCounts).map(([audit, count]) => ({
          status: audit === "true" ? "Sudah di-Audit" : "Belum di-Audit",
          count: count.toString(),
          percent: ((count / totalCount) * 100).toFixed(0),
        }));

        setSchedulePAT(mappingSchedulePAT);
        setCountStatus(result);
        setTotalData(mappingSchedulePAT?.length);
      }
    } else {
      setSchedulePAT([]);
      setCountStatus([]);
      setTotalData(0);
    }
  }, [scheduleActivityPAT]);

  const handleSetPagination = (min, max) => {
    setPagination({ min, max });
  };

  return (
    <div className="w-[71rem] px-4 py-2">
      <p className="text-brisma text-lg font-bold">{user?.uka_name}</p>
      <div className="w-full flex justify-between items-center my-3">
        <div className="w-full">
          <div className="flex gap-3">
            <div>
              <CustomSelect
                placeholder="Pilih tahun"
                isSearchable={false}
                optionValue={yearOption}
                handleChange={(e) => {
                  handleChangeFilter(e);
                  scheduleActivityPATMutate();
                }}
                selectedValue={
                  data?.audit_year
                    ? {
                        label: data?.audit_year,
                        value: data?.audit_year,
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
              <CardFilterProjectOverview
                showFilter={showFilter}
                filter={filter}
                setFilter={setFilter}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
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
      <div className="w-full text-sm mt-4">
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
                <p>PIC</p>
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
            {schedulePAT.length ? (
              schedulePAT
                ?.slice(pagination.min, pagination.max)
                .map((items, idx) => {
                  return (
                    <RowTable
                      key={idx}
                      idx={idx + 1}
                      totalData={totalData}
                      value={items}
                      handleClick={handleChangeData}
                      selectedValue={data?.pat_jadwal_kegiatan_id}
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
        <CustomPagination
          defaultCurrentPage={1}
          perPage={5}
          totalData={totalData}
          handleSetPagination={handleSetPagination}
          getValue={(value) => {
            setPagination({ min: value.min, max: value.max });
          }}
        />
      </div>
    </div>
  );
};

export default ModalBodySchedulePAT;
