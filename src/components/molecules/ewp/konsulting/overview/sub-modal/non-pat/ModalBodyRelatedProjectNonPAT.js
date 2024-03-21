import { useEffect, useState } from "react";
import { DataNotFound } from "@/components/molecules/commons";
import { ButtonField, DatepickerField } from "@/components/atoms";
import useUser from "@/data/useUser";
import _ from "lodash";
import { useRelatedEWP } from "@/data/ewp/konsulting/overview";
import RowTableRelatedProjectNonPAT from "./RowTableRelatedProjectNonPAT";
import { setProjectOverviewData } from "@/slices/ewp/konsulting/projectOverviewEWPKonsultingSlice";
import { useDispatch } from "react-redux";
import CardFilterRelatedProjectNonPAT from "./CardFilterRelatedProjectNonPAT";

const ModalBodyRelatedProjectNonPAT = ({ data, setCurrentModalStage }) => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [objData, setObjData] = useState([]);

  const [filter, setFilter] = useState({
    date: "",
    project_name: "",
    project_id: "",
    ref_tipe: "",
    ref_jenis: "",
  });
  const [params, setParams] = useState({
    date: "",
    project_name: "",
    project_id: "",
    ref_tipe: "",
    ref_jenis: "",
  });

  const { relatedEWP } = useRelatedEWP(params);
  const { user } = useUser();

  useEffect(() => {
    setCurrentModalStage(3);
  }, []);

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
    if (relatedEWP?.data?.length) {
      const mapping = relatedEWP?.data?.map((v) => {
        return {
          id: v?.id,
          ..._.pick(v, ["project_id", "project_name", "ref_tipe", "ref_jenis"]),
        };
      });
      setObjData(mapping);
    } else {
      setObjData([]);
    }
  }, [relatedEWP]);

  const handleChangeFilter = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleResetFilter = (property) => {
    setFilter({ ...filter, [property]: "" });
  };

  const handleClickRow = (isChecked, ref_ewp_id) => {
    const project_terkait = data.project_terkait || [];
    let updatedData;

    if (isChecked) {
      const findId = project_terkait.some(
        (value) => value?.ref_ewp_id === ref_ewp_id
      );

      if (!findId) {
        updatedData = [...project_terkait, { ref_ewp_id }];
      } else {
        updatedData = [...project_terkait];
      }
    } else {
      updatedData = project_terkait.filter(
        (value) => value?.ref_ewp_id !== ref_ewp_id
      );
    }

    const updatedDataObject = { ...data, project_terkait: updatedData };
    dispatch(setProjectOverviewData(updatedDataObject));
  };

  return (
    <div className="w-[61rem] pb-2">
      <p className="text-brisma text-lg font-bold">{user?.data?.uka_name}</p>
      <div className="w-full flex justify-between items-center my-3">
        <div className="w-full">
          <div className="flex w-full justify-between">
            <div className="flex gap-3">
              <div>
                <DatepickerField
                  handleChange={(value) => handleChangeFilter("date", value)}
                  placeholder={"Pilih tanggal"}
                  value={filter?.date}
                />
              </div>
              <div className="bg-atlasian-blue-light h-8 rounded flex items-center mt-1">
                <ButtonField
                  text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
                  handler={() => setShowFilter(!showFilter)}
                />
              </div>
            </div>
          </div>
          <CardFilterRelatedProjectNonPAT
            showFilter={showFilter}
            filter={filter}
            handleChange={handleChangeFilter}
            handleReset={handleResetFilter}
          />
        </div>
      </div>
      <div className="w-full text-sm mt-4">
        <div className="border-2 border-[#DFE1E6] rounded-xl">
          {/* Start Table */}
          {/* Start Table Header */}
          <div className="flex h-14 font-bold">
            <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[7%] flex items-center justify-center">
              <p className="font-bold text-sm">AKSI</p>
            </div>
            <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[40%] flex items-center text-justify px-2 py-3">
              <p className="font-bold text-sm">JUDUL PROYEK TERKAIT</p>
            </div>
            <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center text-justify px-2 py-3">
              <p className="font-bold text-sm">PROJECT ID</p>
            </div>
            <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex items-center text-justify px-2 py-3">
              <p className="font-bold text-sm">TIPE</p>
            </div>
            <div className="border-b-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3">
              <p className="font-bold text-sm">JENIS</p>
            </div>
          </div>
          {objData.length ? (
            <div className="overflow-y-scroll max-h-80">
              {objData.map((items, idx) => {
                return (
                  <RowTableRelatedProjectNonPAT
                    key={idx}
                    idx={idx + 1}
                    value={items}
                    data={data}
                    handleClick={handleClickRow}
                    totalData={objData?.length}
                  />
                );
              })}
            </div>
          ) : (
            <DataNotFound />
          )}
          {/* End Body Table */}
          {/* End Table */}
        </div>
      </div>
    </div>
  );
};

export default ModalBodyRelatedProjectNonPAT;
