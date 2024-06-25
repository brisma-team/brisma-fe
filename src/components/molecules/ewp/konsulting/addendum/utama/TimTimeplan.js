import { ButtonField, Card, ErrorValidation } from "@/components/atoms";
import { CardMemberTeam, CardTeam } from "../../perencanaan/tim-timeplan";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjPayloadTimTimeplan,
  setValidationErrorsTimTimeplan,
  resetValidationErrorsTimTimeplan,
  resetObjPayloadTimTimeplan,
} from "@/slices/ewp/konsulting/addendum/utama/timTimeplanAddendumEWPKonsultingSlice";
import timTimeplanEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/perencanaan/timTimeplanEWPKonsultingSchema";
import {
  convertIntegerToDecimal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import { useEffect } from "react";
import { useTimTimeplan } from "@/data/ewp/konsulting/addendum/utama";

const TimTimeplan = ({
  id,
  isInitiator,
  isCloseSubmodule,
  dataProjectDetail,
  handleLoadFromMapa,
  oldDataTimTimeplan,
}) => {
  const dispatch = useDispatch();

  const payload = useSelector(
    (state) => state.timTimeplanAddendumEWPKonsulting.objPayloadTimTimeplan
  );
  const validation = useSelector(
    (state) =>
      state.timTimeplanAddendumEWPKonsulting.validationErrorsTimTimeplan
  );

  const { timTimeplan, timTimeplanError, timTimeplanMutate } = useTimTimeplan({
    id,
  });

  useEffect(() => {
    if (!timTimeplanError) {
      const timData =
        oldDataTimTimeplan !== ""
          ? oldDataTimTimeplan
          : timTimeplan?.data?.tim_audit;
      const mappingInitiator = [dataProjectDetail?.project_info?.initiator];
      const mappingAuditor = timData?.auditor?.length
        ? timData?.auditor?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];

      const mappingAuditee = timData?.auditee?.length
        ? timData?.auditee?.map((v) => {
            const { pn, nama, is_initiator } = v;
            return {
              pn,
              nama,
              is_initiator,
            };
          })
        : [];

      const mappingATA = timData?.ata?.length
        ? timData?.ata?.map((v) => {
            const { pn, nama, is_initiator, mandays, deskripsi } = v;
            return {
              pn,
              nama,
              is_initiator,
              mandays: convertIntegerToDecimal(mandays).decimal,
              deskripsi,
            };
          })
        : [];

      dispatch(
        setObjPayloadTimTimeplan({
          initiator: mappingInitiator,
          auditor: mappingAuditor,
          auditee: mappingAuditee,
          ata: mappingATA,
        })
      );
    } else {
      dispatch(resetObjPayloadTimTimeplan());
    }
  }, [timTimeplan, oldDataTimTimeplan, dataProjectDetail]);

  const handleAdd = (property) => {
    const newTimAudit = [...payload[property]];
    newTimAudit.push({ pn: "", nama: "", is_initiator: false });
    dispatch(
      setObjPayloadTimTimeplan({
        ...payload,
        [property]: newTimAudit,
      })
    );
  };

  const handleDelete = (index, property) => {
    const newData = [...payload[property]];
    newData.splice(index, 1);
    dispatch(setObjPayloadTimTimeplan({ ...payload, [property]: newData }));
  };

  const handleChangeSelect = (property, index, value) => {
    const newData = [...payload[property]];
    const updated = {
      ...newData[index],
      pn: value?.pn,
      nama: value?.name,
    };
    newData[index] = updated;
    dispatch(
      setObjPayloadTimTimeplan({
        ...payload,
        [property]: newData,
      })
    );
  };

  const handleChangeText = (property, propertyObj, index, value) => {
    const newData = [...payload[property]];
    const updated = {
      ...newData[index],
      [propertyObj]: value,
    };
    newData[index] = updated;
    dispatch(
      setObjPayloadTimTimeplan({
        ...payload,
        [property]: newData,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: timTimeplanEWPKonsultingSchema,
      resetErrors: resetValidationErrorsTimTimeplan,
      setErrors: setValidationErrorsTimTimeplan,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      const mappingATA = payload.ata.map((v) => {
        return {
          ..._.omit(v, ["mandays"]),
          mandays: convertIntegerToDecimal(v?.mandays).integer,
        };
      });
      const objPayload = {
        ..._.omit(payload, ["ata"]),
        ata: mappingATA,
      };
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/tim/${id}`,
        { tim_audit: _.omit(objPayload, ["initiator"]) }
      );
      timTimeplanMutate();
      loadingSwal("close");
    }
  };

  const handleClickHandleFromMapa = async () => {
    await handleLoadFromMapa("tim");
    timTimeplanMutate();
  };
  // [ END ] handler for time timeplan

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="p-5 grid grid-cols-3 gap-3 w-full h-full">
          <CardTeam
            data={payload}
            validation={validation}
            property={"initiator"}
            title={"Initiator"}
            textColorTitle={"text-atlasian-yellow"}
            withoutButton
            isDisabled
          />
          <CardTeam
            isUserSKAI
            data={payload}
            validation={validation}
            withoutButton={!(isInitiator && !isCloseSubmodule)}
            property={"auditor"}
            title={"P.I.C Auditor"}
            textColorTitle={"text-atlasian-blue-light"}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleChangeSelect={handleChangeSelect}
          />
          <CardTeam
            data={payload}
            validation={validation}
            withoutButton={!(isInitiator && !isCloseSubmodule)}
            property={"auditee"}
            title={"P.I.C Auditee"}
            textColorTitle={"text-atlasian-red"}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        <div className="p-5 w-full">
          <Card>
            <div className="px-4 py-2 flex flex-col gap-4 w-full">
              {isInitiator && !isCloseSubmodule ? (
                <div className="bg-atlasian-purple rounded w-fit">
                  <ButtonField
                    text={"Tambah Anggota Tim"}
                    handler={() => handleAdd("ata")}
                  />
                </div>
              ) : (
                ""
              )}
              {validation["ata"] ? (
                <ErrorValidation
                  className={"mt-3"}
                  message={validation["ata"]}
                />
              ) : (
                ""
              )}
              <CardMemberTeam
                title={"Anggota Tim Audit"}
                textColorTitle={"text-atlasian-green"}
                property={"ata"}
                data={payload}
                validation={validation}
                withoutButton={!(isInitiator && !isCloseSubmodule)}
                handleDelete={handleDelete}
                handleChangeSelect={handleChangeSelect}
                handleChangeText={handleChangeText}
              />
            </div>
          </Card>
        </div>
      </Card>
      <div className="w-full flex justify-end gap-3 -my-1">
        <div className="bg-atlasian-yellow rounded">
          <ButtonField
            text={"Load from MAPA"}
            handler={handleClickHandleFromMapa}
          />
        </div>
        <div className="rounded w-28 bg-atlasian-green">
          <ButtonField text={"Simpan"} handler={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default TimTimeplan;
