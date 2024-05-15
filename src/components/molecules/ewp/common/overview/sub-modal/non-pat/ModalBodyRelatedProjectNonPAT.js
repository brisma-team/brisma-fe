import { useEffect } from "react";
import useUser from "@/data/useUser";
import TableRelatedProject from "./TableRelatedProject";

const ModalBodyRelatedProjectNonPAT = ({
  data,
  payload,
  validation,
  setCurrentModalStage,
  handleChangePayload,
  handleClickAdd,
  handleClickDelete,
  handleClickSave,
}) => {
  const { user } = useUser();

  useEffect(() => {
    setCurrentModalStage(3);
  }, []);

  return (
    <div className="w-[61rem] pb-2">
      <p className="text-brisma text-lg font-bold">{user?.data?.uka_name}</p>
      <div className="p-4">
        <TableRelatedProject
          data={data?.project_terkait}
          payload={payload}
          validation={validation}
          handleChangeText={handleChangePayload}
          handleClickAddRow={handleClickAdd}
          handleClickDelete={handleClickDelete}
          handleClickSave={handleClickSave}
        />
      </div>
    </div>
  );
};

export default ModalBodyRelatedProjectNonPAT;
