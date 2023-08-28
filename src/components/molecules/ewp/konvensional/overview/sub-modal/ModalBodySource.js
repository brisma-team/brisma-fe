import { useEffect } from "react";
import { CardHeaderContent } from "@/components/molecules/commons";
import { resetProjectOverviewData } from "@/slices/ewp/projectOverviewEWPSlice";
import { useDispatch } from "react-redux";

const ModalBodySource = ({ setCurrentModalStage, setIsPat, typeModal }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentModalStage(1);
    dispatch(resetProjectOverviewData());
  }, []);

  const handleClick = (value) => {
    setIsPat(value);
    setCurrentModalStage((prev) => prev + 1);
  };

  return (
    <div className="w-[31rem] px-4 py-2">
      <p className="text-brisma text-lg font-bold">Sumber Informasi</p>
      <div className="mt-2 flex gap-5">
        <CardHeaderContent
          headerTitle="P.A.T"
          description="Dengan menggunakan Jadwal dari Usulan Perencanaan Audit Tahunan"
          buttonText="Pilih Jadwal"
          handleClick={() => handleClick(true)}
          width="w-[13.75rem]"
        />
        <CardHeaderContent
          headerTitle="Non P.A.T"
          description="Tanpa menggunakan Jadwal dari Usulan Perencanaan Audit Tahunan"
          buttonText="Buat Jadwal"
          handleClick={() => handleClick(false)}
          width="w-[13.75rem]"
        />
      </div>
    </div>
  );
};

export default ModalBodySource;
