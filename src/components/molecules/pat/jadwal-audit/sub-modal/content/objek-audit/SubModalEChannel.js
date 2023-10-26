import { TextInputDecimal } from "@/components/atoms";
import { DatePicker } from "@atlaskit/datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { setAuditScheduleData } from "@/slices/pat/auditScheduleSlice";
import { convertDate, parseDate } from "@/helpers";
import { useEchannel } from "@/data/reference";
import { useEffect } from "react";

const RowDatatable = ({ idx, handleChange, value, isDisabled }) => {
  return (
    <div className="flex">
      <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center text-justify p-1">
        <div className="-mt-2 ml-2 w-full">
          {value?.ref_echanel_type_kode?.name}
        </div>
      </div>
      <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center text-justify p-1">
        <div className="w-full">
          <TextInputDecimal
            value={value?.jumlah_existing?.toString()}
            isDisabled={isDisabled}
            onChange={(value) => handleChange("jumlah_existing", value, idx)}
          />
        </div>
      </div>
      <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center p-1">
        <div className="w-full">
          <TextInputDecimal
            value={value?.jumlah_target?.toString()}
            isDisabled={isDisabled}
            onChange={(value) => {
              handleChange("jumlah_target", value, idx);
            }}
          />
        </div>
      </div>
      <div className="border-b-2 border-[#DFE1E6] w-[25%] flex items-center p-2">
        <div className="w-full">
          <DatePicker
            dateFormat="YYYY/MM/DD"
            placeholder="Tanggal"
            onChange={(e) =>
              handleChange(
                "posisi_data",
                e !== "" ? parseDate(e, "/") : "",
                idx
              )
            }
            value={
              value?.posisi_data ? convertDate(value?.posisi_data, "-") : ""
            }
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

const SubModalEChannel = ({ isDisabled }) => {
  const dispatch = useDispatch();
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );
  const { echannel } = useEchannel();

  useEffect(() => {
    if (!auditScheduleData.echannel?.length) {
      const mapping = echannel?.data.map((v) => {
        return {
          ref_echanel_type_kode: v,
          jumlah_existing: 0,
          jumlah_target: 0,
          posisi_data: "",
        };
      });
      dispatch(
        setAuditScheduleData({ ...auditScheduleData, echannel: mapping })
      );
    }
  }, [echannel]);

  const handleChange = (property, value, idx) => {
    const echannelData = [...auditScheduleData.echannel];
    const updatedUker = { ...echannelData[idx] };
    updatedUker[property] = value;
    echannelData[idx] = updatedUker;
    const updatedData = {
      ...auditScheduleData,
      echannel: echannelData,
    };

    dispatch(setAuditScheduleData(updatedData));
  };

  return (
    <div className="w-full font-bold text-sm px-4 mt-6">
      <div className="border-2 border-[#DFE1E6] rounded-xl">
        <div className="overflow-y-scroll max-h-80">
          <div className="flex h-14">
            <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center justify-center">
              <p>Jenis E-Channel</p>
            </div>
            <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center text-justify p-3">
              <p>Jumlah Eksisting</p>
            </div>
            <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center text-justify p-3">
              <p>Jumlah Target Audit</p>
            </div>
            <div className="border-b-2 border-[#DFE1E6] w-[25%] flex items-center justify-center">
              <p>Posisi Data</p>
            </div>
          </div>
          {auditScheduleData?.echannel?.map((v, i) => {
            return (
              <RowDatatable
                key={i}
                idx={i}
                handleChange={handleChange}
                value={v}
                isDisabled={isDisabled}
              />
            );
          })}
        </div>
        <div className="w-40 text-sm font-semibold p-2 h-12" />
      </div>
    </div>
  );
};

export default SubModalEChannel;
