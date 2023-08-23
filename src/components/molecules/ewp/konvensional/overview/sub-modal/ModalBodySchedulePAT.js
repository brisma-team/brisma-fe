import { useEffect } from "react";
import { ButtonField } from "@/components/atoms";
import { useState } from "react";
import { useOverviewEWP } from "@/data/ewp/konvensional";
import _ from "lodash";
import { CardTypeCount, DataNotFound } from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import { setProjectOverviewData } from "@/slices/ewp/projectOverviewEWPSlice";
import CustomSelect from "@/components/molecules/commons/CustomSelect";
import RowTable from "./RowTable";

const ModalBodySchedulePAT = ({ setCurrentModalStage, typeModal }) => {
  const dispatch = useDispatch();
  const projectOverviewData = useSelector(
    (state) => state.projectOverviewEWP.projectOverviewData
  );
  const isDisabled = false;
  const [schedulePAT, setSchedulePAT] = useState([]);
  const [yearOption, setYearOption] = useState([]);
  const [countStatus, setCountStatus] = useState([]);
  const yearPAT = useOverviewEWP("tahun_pat", { pages: 1, limit: 1 });
  const { overviewEWP, overviewEWPMutate } = useOverviewEWP("jadwal_pat", {
    pages: 1,
    limit: 1,
  });

  useEffect(() => {
    console.log("yearPAT => ", yearPAT.overviewEWP);
    // if (yearPAT.overviewEWP.data) {
    //   const mappingYear = yearPAT.overviewEWP.data.map((v) => {
    //     return v.tahun;
    //   });

    //   setYearOption(mappingYear);
    // }
    setCurrentModalStage(2);
  }, []);

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

  useEffect(() => {
    console.log("projectOVerview Data => ", projectOverviewData);
  }, [projectOverviewData]);

  useEffect(() => {
    console.log("countStatus => ", countStatus);
  }, [countStatus]);

  useEffect(() => {
    console.log("yearOption => ", yearOption);
  }, [yearOption]);

  const handleChangeFilterYear = (e) => {
    const updatedData = {
      ...projectOverviewData,
      audit_year: e.value,
    };
    dispatch(setProjectOverviewData(updatedData));
  };

  const handleClick = (value) => {
    const {
      id,
      name_kegiatan_audit,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
    } = value;
    const updatedData = {
      ...projectOverviewData,
      project_name: name_kegiatan_audit,
      pat_jadwal_audit_id: id,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
    };
    dispatch(setProjectOverviewData(updatedData));
  };

  return (
    <div className="w-[71rem] px-4 py-2">
      <p className="text-brisma text-lg font-bold">RAO Tangerang Selatan</p>
      <div className="w-full flex justify-between items-center my-3">
        <div className="flex justify-between gap-3">
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
          <div className="bg-atlasian-blue-light w-32 rounded flex items-center">
            <ButtonField
              text="Tampilkan Filter"
              handler={() => console.log("test")}
            />
          </div>
        </div>
        {countStatus?.length && (
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
        )}
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
      </div>
    </div>
  );
};

export default ModalBodySchedulePAT;
