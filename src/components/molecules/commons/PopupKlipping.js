import Popup from "@atlaskit/popup";
import { ButtonIcon } from "@/components/atoms";
import { IconInfo } from "@/components/icons";
import { useState } from "react";

const PopupKlipping = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      content={() => (
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
      )}
      trigger={(triggerProps) => (
        <ButtonIcon
          color={"yellow"}
          icon={<IconInfo />}
          handleClick={() => setIsOpen(true)}
          handleMouseEnter={() => setIsOpen(true)}
          handleMouseLeave={() => setIsOpen(false)}
          props={triggerProps}
        />
      )}
    />
  );
};

export default PopupKlipping;
