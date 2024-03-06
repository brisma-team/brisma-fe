import { ButtonIcon, CustomTooltip } from "@/components/atoms";
import { IconInfo } from "@/components/icons";

const PopupKlipping = ({ text }) => {
  return (
    <CustomTooltip
      content={
        <div className="p-2 w-[22rem] text-center">
          <p className="text-xl text-atlasian-yellow font-bold">PERHATIAN</p>
          <p className="text-base">
            Fitur ini digunakan untuk mendapatkan image url yang dapat
            disematkan pada text-editor. <br />
            <br />
            Gambar pada kliping tidak akan tersimpan dan akan terhapus apabila
            berganti atau refresh halaman.
          </p>
        </div>
      }
    >
      <ButtonIcon isDisabled color={"blue"} icon={<IconInfo />} />
    </CustomTooltip>
  );
};

export default PopupKlipping;
