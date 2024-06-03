import { useEffect } from "react";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { resetProjectOverviewData } from "@/slices/ewp/konsulting/projectOverviewEWPKonsultingSlice";
import { useDispatch } from "react-redux";
import { ButtonField, Card } from "@/components/atoms";

const ModalBodySource = ({
  currentModalStage,
  setCurrentModalStage,
  handleIsPAT,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentModalStage === 1) {
      dispatch(resetProjectOverviewData());
    }
  }, [currentModalStage]);

  const handleClick = (value) => {
    handleIsPAT(value);
    setCurrentModalStage((prev) => prev + 1);
  };

  return (
    <div className="w-[42.5rem] px-4 py-2">
      <p className="text-brisma text-lg font-bold">Sumber Proyek Kegiatan</p>
      <div className="w-full mt-4">
        <Card>
          <div className="mt-2 flex gap-5 px-4 py-2">
            <CardContentHeaderFooter
              className={"p-0.5"}
              header={
                <div className="p-2">
                  <h3 className="text-atlasian-yellow font-semibold text-center">
                    P.A.T
                  </h3>
                </div>
              }
            >
              <div className="bg-white p-5 h-40 flex flex-col justify-between">
                <p className="text-center text-base">
                  Membuat proyek dengan sumber dari Usulan Perencanaan Audit
                  Tahunan.
                </p>
                <div className="w-full flex justify-center">
                  <div className="bg-atlasian-blue-light w-28 rounded">
                    <ButtonField
                      text={"Pilih Jadwal"}
                      handler={() => handleClick(true)}
                    />
                  </div>
                </div>
              </div>
            </CardContentHeaderFooter>
            <CardContentHeaderFooter
              className={"p-0.5"}
              header={
                <div className="p-2">
                  <h3 className="text-atlasian-purple font-semibold text-center">
                    Non-P.A.T
                  </h3>
                </div>
              }
            >
              <div className="bg-white p-5 h-40 flex flex-col justify-between">
                <p className="text-center text-base">
                  Membuat proyek tanpa menggunakan sumber eksisting.
                </p>
                <div className="w-full flex justify-center">
                  <div className="bg-atlasian-blue-light w-28 rounded">
                    <ButtonField
                      text={"Pilih Jadwal"}
                      handler={() => handleClick(false)}
                    />
                  </div>
                </div>
              </div>
            </CardContentHeaderFooter>
            {/* <CardHeaderContent
            headerTitle="P.A.T"
            description="Dengan menggunakan Jadwal dari Usulan Perencanaan Audit Tahunan"
            buttonText="Pilih Jadwal"
            handleClick={() => handleClick(true)}
            width="w-full"
          />
          <CardHeaderContent
            headerTitle="Non P.A.T"
            description="Tanpa menggunakan Jadwal dari Usulan Perencanaan Audit Tahunan"
            buttonText="Buat Jadwal"
            handleClick={() => handleClick(false)}
            width="w-full"
          /> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ModalBodySource;
