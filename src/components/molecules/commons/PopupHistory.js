import { ButtonIcon, CustomTooltip } from "@/components/atoms";
import { IconInfo } from "@/components/icons";

const PopupHistory = () => {
  return (
    <CustomTooltip
      content={
        <div className="p-2 w-[22rem] text-center">
          <p className="text-xl text-atlasian-yellow font-bold">PERHATIAN</p>
          <p className="text-base">
            Fitur ini digunakan untuk mencatat perubahan isi konten. <br />
            <br />
            Riwayat yang disimpan berupa identitas seseorang yang merubah isi
            konten.
          </p>
        </div>
      }
    >
      <ButtonIcon isDisabled color={"blue"} icon={<IconInfo />} />
    </CustomTooltip>
  );
};

export default PopupHistory;
