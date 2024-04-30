import { useEffect, useState } from "react";
import useUser from "@/data/useUser";
import {
  setProjectOverviewData,
  setObjPayloadRelatedProject,
  resetObjPayloadRelatedProject,
  resetValidationErrorsRelatedProjectNonPAT,
  setValidationErrorsRelatedProjectNonPAT,
} from "@/slices/ewp/konsulting/projectOverviewEWPKonsultingSlice";
import { useDispatch, useSelector } from "react-redux";

import { confirmationSwal, setErrorValidation } from "@/helpers";
import { relatedProjectNonPATSchema } from "@/helpers/schemas/ewp/konsulting/overview/projectOverviewEWPKonsultingSchema";
import TableRelatedProject from "./TableRelatedProject";

const ModalBodyRelatedProjectNonPAT = ({ data, setCurrentModalStage }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const [isAddNewRow, setIsAddNewRow] = useState(false);

  const payload = useSelector(
    (state) => state.projectOverviewEWPKonsulting.objPayloadRelatedProject
  );
  const validation = useSelector(
    (state) =>
      state.projectOverviewEWPKonsulting.validationErrorsRelatedProjectNonPAT
  );

  useEffect(() => {
    setCurrentModalStage(3);
  }, []);

  const handleChangeText = (props, value) => {
    const newPayload = {
      ...payload,
      [props]: value,
    };
    dispatch(setObjPayloadRelatedProject(newPayload));
  };

  const handleClickAddRow = () => {
    if (!isAddNewRow) {
      const newDataTables = JSON.parse(JSON.stringify(data));
      newDataTables?.project_terkait?.push(payload);
      dispatch(setProjectOverviewData(newDataTables));
      setIsAddNewRow(true);
    }
  };

  const handleClickSave = (project_id) => {
    const newData = JSON.parse(JSON.stringify(data));
    const newDataTables = [...newData.project_terkait];
    const findIndex = newDataTables.findIndex(
      (v) => v.project_id === project_id
    );
    if (findIndex !== -1) {
      const schemaMapping = {
        schema: relatedProjectNonPATSchema,
        resetErrors: resetValidationErrorsRelatedProjectNonPAT,
        setErrors: setValidationErrorsRelatedProjectNonPAT,
      };
      const validate = setErrorValidation(payload, dispatch, schemaMapping);

      if (validate) {
        newDataTables[findIndex] = { ...payload, is_new: false };
        newData.project_terkait = newDataTables;
        dispatch(setProjectOverviewData(newData));
        dispatch(resetObjPayloadRelatedProject());
        dispatch(resetValidationErrorsRelatedProjectNonPAT());
        setIsAddNewRow(false);
      }
    }
  };

  const handleClickDelete = async (project_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    const newDataTables = JSON.parse(
      JSON.stringify(data.project_terkait || [])
    );
    const findAnswerIndex = newDataTables?.findIndex(
      (v) => v.project_id == project_id
    );
    newDataTables.splice(findAnswerIndex, 1);
    dispatch(
      setProjectOverviewData({ ...data, project_terkait: newDataTables })
    );
    dispatch(resetValidationErrorsRelatedProjectNonPAT());
    setIsAddNewRow(false);
  };

  return (
    <div className="w-[61rem] pb-2">
      <p className="text-brisma text-lg font-bold">{user?.data?.uka_name}</p>
      <div className="p-4">
        <TableRelatedProject
          data={data?.project_terkait}
          payload={payload}
          validation={validation}
          handleChangeText={handleChangeText}
          handleClickAddRow={handleClickAddRow}
          handleClickDelete={handleClickDelete}
          handleClickSave={handleClickSave}
        />
      </div>
    </div>
  );
};

export default ModalBodyRelatedProjectNonPAT;
