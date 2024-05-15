import {
  Breadcrumbs,
  ButtonField,
  Card,
  PageTitle,
  TextInput,
} from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setObjData,
  setValidationErrors,
  resetObjData,
  resetValidationErrors,
} from "@/slices/ewp/monitoring-offsite/tindak-lanjut/tindakLanjutEWPMonoffSlice";
import { useSelector } from "react-redux";
import {
  useAuditorTindakLanjut,
  useTindakLanjut,
} from "@/data/ewp/monitoring-offsite/tindak-lanjut";
import { CardTeam } from "@/components/molecules/ewp/monitoring-offsite/tindak-lanjut";
import { fetchApi, loadingSwal, setErrorValidation } from "@/helpers";
import tindakLanjutEWPMonoffSchema from "@/helpers/schemas/ewp/monitoring-offsite/tindak-lanjut/tindakLanjutEWPMonoffSchema";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const payload = useSelector((state) => state.tindakLanjutEWPMonoff.objData);
  const validation = useSelector(
    (state) => state.tindakLanjutEWPMonoff.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { tindakLanjut, tindakLanjutMutate, tindakLanjutError } =
    useTindakLanjut({
      id,
    });

  const { auditorTindakLanjut } = useAuditorTindakLanjut({
    id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Monitoring / Overview", path: "/ewp/monitoring-offsite" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / tindak-lanjut`,
        path: `/ewp/monitoring-offsite/${id}/tindak-lanjut`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (!tindakLanjutError) {
      const mappingAuditor = auditorTindakLanjut?.data?.auditor?.length
        ? auditorTindakLanjut?.data?.auditor?.map((v) => {
            const { pn, nama } = v;
            return {
              pn,
              nama,
            };
          })
        : [];

      const mappingDesc = tindakLanjut?.data?.description || "";

      dispatch(
        setObjData({
          ...payload,
          auditor: mappingAuditor,
          deskripsi: mappingDesc,
          realisasi: tindakLanjut?.data?.realisasi,
        })
      );
    } else {
      dispatch(resetObjData());
    }
  }, [tindakLanjut, auditorTindakLanjut]);

  const handleAddObjectInsideArray = (property) => {
    const newTimAudit = [...payload[property]];
    newTimAudit.push({ pn: "", nama: "", is_initiator: false });
    dispatch(setObjData({ ...payload, [property]: newTimAudit }));
  };

  const handleDeleteObjectInsideArray = (index, property) => {
    const newData = [...payload[property]];
    newData.splice(index, 1);
    dispatch(setObjData({ ...payload, [property]: newData }));
  };

  const handleChangeSelectValueObjectInsideArray = (property, index, value) => {
    const newData = [...payload[property]];
    const updated = {
      ...newData[index],
      pn: value?.pn,
      nama: value?.name,
    };
    newData[index] = updated;
    dispatch(
      setObjData({
        ...payload,
        [property]: newData,
      })
    );
  };

  const handleChangeTextValueObjectInsideArray = (property, value) => {
    dispatch(
      setObjData({
        ...payload,
        [property]: value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: tindakLanjutEWPMonoffSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "PATCH",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/tindaklanjut/content`,
        {
          id,
          auditor: payload?.auditor,
          desc: payload?.deskripsi,
          realisasi: payload?.realisasi,
        }
      );
      tindakLanjutMutate();
      loadingSwal("close");
    }
  };

  return (
    <LandingLayoutEWPMonOff>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Tindak Lanjut" />
      </div>
      {/* Start Content */}
      <Card>
        <div className="p-5 grid grid-cols-3 gap-3 w-full h-full">
          <CardTeam
            data={payload}
            validation={validation}
            property={"auditor"}
            title={"P.I.C Tindak Lanjut"}
            textColorTitle={"text-atlasian-red"}
            handleAdd={handleAddObjectInsideArray}
            handleDelete={handleDeleteObjectInsideArray}
            handleChangeSelect={handleChangeSelectValueObjectInsideArray}
          />
        </div>
        <div className="px-5 py-2 w-full">
          <div className="w-full h-fit">
            <Card>
              <div className="px-5 py-2 w-full">
                <p
                  className={`${"text-atlasian-green"} text-sm font-semibold mb-3`}
                >
                  {"Deskripsi Tindak Lanjut"}
                </p>
                <TextInput
                  className={"w-full h-10"}
                  placeholder={"Deskripsi"}
                  value={payload["deskripsi"]}
                  maxLength={500}
                  onChange={(e) =>
                    handleChangeTextValueObjectInsideArray(
                      "deskripsi",
                      e.target.value
                    )
                  }
                />
              </div>
            </Card>
          </div>
        </div>
      </Card>
      <div className="mt-3 flex justify-end">
        <div className="w-36 bg-atlasian-green rounded">
          <ButtonField text={"Simpan"} handler={handleSubmit} />
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutEWPMonOff>
  );
};

export default index;
