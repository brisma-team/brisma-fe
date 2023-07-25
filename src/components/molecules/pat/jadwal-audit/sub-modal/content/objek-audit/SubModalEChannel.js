import { InlineEditText } from "@/components/atoms";
import { DatePicker } from "@atlaskit/datetime-picker";

const RowDatatable = ({ title }) => {
  return (
    <div className="flex">
      <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center text-justify p-1">
        <div className="-mt-2 ml-2 w-full">{title}</div>
      </div>
      <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center text-justify p-1">
        <div className="-mt-2 w-full">
          <InlineEditText />
        </div>
      </div>
      <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center p-1">
        <div className="-mt-2 w-full">
          <InlineEditText />
        </div>
      </div>
      <div className="border-b-2 border-[#DFE1E6] w-[25%] flex items-center p-2">
        <div className="w-full">
          <DatePicker placeholder="Tanggal" />
        </div>
      </div>
    </div>
  );
};

const data = [{ title: "A.T.M" }, { title: "E.D.C" }, { title: "C.R.M" }];

const SubModalEChannel = () => {
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
          {data.map((v, i) => {
            return <RowDatatable title={v.title} key={i} />;
          })}
        </div>
        <div className="w-40 text-sm font-semibold p-2 h-12" />
      </div>
    </div>
  );
};

export default SubModalEChannel;
