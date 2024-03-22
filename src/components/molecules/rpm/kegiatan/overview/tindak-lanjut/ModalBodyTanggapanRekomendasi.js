import { CardContentHeaderFooter } from "@/components/molecules/commons";

const TextAreaTanggapan = ({ selectedValue, onChange }) => {
  return (
    <textarea
      className="w-full border-2 border-gray-200 text-sm rounded-md"
      value={selectedValue}
      placeholder="Berikan tanggapan disini..."
      rows={5}
      onChange={onChange}
    ></textarea>
  );
};

const ModalBodyTanggapanRekomendasi = ({ selectedValue, setSelectedValue }) => {
  return (
    <div className="w-[63rem]">
      <div className="w-full p-4 -mt-2">
        <CardContentHeaderFooter
          header={
            <div className="py-2 px-4 text-base font-semibold w-full">
              Tanggapan
            </div>
          }
        >
          <div className="flex flex-col gap-4 px-6 py-4 w-full">
            <TextAreaTanggapan
              selectedValue={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
          </div>
        </CardContentHeaderFooter>
      </div>
    </div>
  );
};

export default ModalBodyTanggapanRekomendasi;
