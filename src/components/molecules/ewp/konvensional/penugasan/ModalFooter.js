import { ButtonField, TextInput } from "@/components/atoms";
import { PekerjaSelect } from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import { setProjectOverviewData } from "@/slices/ewp/projectOverviewEWPSlice";
import { useEffect } from "react";

const ModalFooter = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  //   const projectOverviewData = useSelector(
  //     (state) => state.projectOverviewEWP.projectOverviewData
  //   );

  return (
    <div className="w-full flex justify-end gap-2 -my-1">
      <div className="w-full flex gap-2">
        <PekerjaSelect
          placeholder="Masukan PN/Nama KTA Manajer Audit atau EVP"
          className={"w-full"}
        />
        <div className="w-52">
          <TextInput placeholder="Mandays (hari)" />
        </div>
        <div className="rounded w-40 bg-atlasian-yellow flex items-center">
          <ButtonField text={"Tetapkan Auditor"} name={"auditorButton"} />
        </div>
      </div>
      <div className="rounded w-32 bg-atlasian-green flex items-center">
        <ButtonField text={"Simpan"} type={"submit"} name={"saveButton"} />
      </div>
    </div>
  );
};

export default ModalFooter;
