import { Breadcrumbs, Card, PageTitle, QRGenerator } from "@/components/atoms";
import { useRouter } from "next/router";
import { PrevNextNavigation } from "@/components/molecules/commons";
import {
  PageCheckIn,
  TableAttendance,
} from "@/components/molecules/ewp/konsulting/meeting/attendance";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useProjectDetail } from "@/data/ewp/konsulting";
import {
  useAttendance,
  useLandingStatus,
  useMeetingDetail,
} from "@/data/ewp/konsulting/meeting";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { loginSchema } from "@/helpers/schemas";
import {
  setObjDataMeeting,
  setObjDataAttendance,
  setObjPayload,
  setValidationErrors,
  resetObjDataAttendance,
  resetObjDataMeeting,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/meeting/attendanceMeetingEWPKonsultingSlice";

const index = () => {
  const dispatch = useDispatch();
  const { id, meeting_id, code } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const pathNameSubModulMeeting = `${baseUrl}/meeting`;
  const pathNameLanding = `${baseUrl}/meeting/${meeting_id}`;

  const [valueQR, setValueQR] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessCheckIn, setIsSuccessCheckIn] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(0);

  const dataAttendance = useSelector(
    (state) => state.attendanceMeetingEWPKonsulting.objDataAttendance
  );
  const dataMeeting = useSelector(
    (state) => state.attendanceMeetingEWPKonsulting.objDataMeeting
  );
  const payload = useSelector(
    (state) => state.attendanceMeetingEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.attendanceMeetingEWPKonsulting.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { landingStatus } = useLandingStatus({ id: meeting_id });
  const { attendance, attendanceMutate } = useAttendance({
    id: selectedAttendanceId,
  });
  const { meetingDetail } = useMeetingDetail({ id: meeting_id });

  const routes = [
    {
      name: "Daftar Kehadiran",
      slug: `attendance`,
    },
    {
      name: "Notulen",
      slug: `notulen`,
    },
    {
      name: "Berita Acara",
      slug: `berita-acara`,
    },
  ];

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `${baseUrl}/info`,
      },
      {
        name: `Meeting`,
        path: pathNameSubModulMeeting,
      },
      {
        name: `Entrance`,
        path: pathNameLanding,
      },
      {
        name: `Daftar Kehadiran`,
        path: `${pathNameLanding}/attendance`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (meetingDetail?.data) {
      const mappingPIC = meetingDetail?.data?.meeting_info?.pic_meeting?.length
        ? meetingDetail?.data?.meeting_info?.pic_meeting?.map((pic) => {
            const { pn, nama, jabatan } = pic;
            return {
              pn,
              nama,
              jabatan,
            };
          })
        : [];

      const mappingPembicara = meetingDetail?.data?.meeting_info
        ?.pembicara_meeting?.length
        ? meetingDetail?.data?.meeting_info?.pembicara_meeting?.map(
            (pembicara) => {
              const { pn, nama, jabatan } = pembicara;
              return {
                pn,
                nama,
                jabatan,
              };
            }
          )
        : [];

      const mappingMeetingDetail = {
        pic_meeting: mappingPIC,
        pembicara_meeting: mappingPembicara,
        ..._.pick(meetingDetail?.data?.meeting_info, [
          "id",
          "judul_meeting",
          "desc",
          "create_by",
          "createdAt",
          "link_meeting",
          "periode_start",
          "periode_end",
          "metode_meeting",
        ]),
      };
      setIsLoading(false);
      dispatch(setObjDataMeeting(mappingMeetingDetail));
    } else {
      dispatch(resetObjDataMeeting());
    }
  }, [meetingDetail]);

  useEffect(() => {
    setSelectedAttendanceId(landingStatus?.data?.attendance?.id || 0);
  }, [landingStatus]);

  useEffect(() => {
    if (attendance?.data) {
      const mappingAttendance = attendance?.data?.attendance_audience?.length
        ? attendance?.data?.attendance_audience?.map((v) => {
            return {
              id: v?.id,
              anggota: `${v?.pn} - ${v?.nama}`,
              attendance_date: convertDate(v?.created_at, "/", "d"),
              jabatan: v?.jabatan,
              uker: v?.unit_kerja,
            };
          })
        : [];
      setValueQR(
        `${window.location.protocol}//${window.location.host}/ewp/konsulting/overview/${id}/meeting/${meeting_id}/attendance?code=${attendance?.data?.attendance_info?.meet_code}`
      );
      dispatch(setObjDataAttendance(mappingAttendance));
    } else {
      setValueQR("");
      dispatch(resetObjDataAttendance());
    }
  }, [attendance]);

  const handleDelete = async (audience_id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menghapus anggota ini dari daftar kehadiran?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/meeting/attendance/audience/${audience_id}`
    );
    attendanceMutate();
    loadingSwal("close");
  };

  // [ START ] handler for CheckInAttendance
  const handleChangePayloadLogin = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const schemaMappings = {
      schema: loginSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };

    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      loadingSwal();
      const response = await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/meeting/attendance/login`,
        { meet_code: code, ...payload }
      );

      if (!response?.isDismissed) return;

      attendanceMutate();
      setIsSuccessCheckIn(true);
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      loadingSwal("close");
    }
  };
  // [ END ] handler for CheckInAttendance

  if (code) {
    return (
      <PageCheckIn
        isLoading={isLoading}
        isSuccessCheckIn={isSuccessCheckIn}
        payload={payload}
        meetingCode={code}
        meetingDetail={dataMeeting}
        validation={validation}
        handleSubmitLogin={handleSubmitLogin}
        handleChangePayload={handleChangePayloadLogin}
      />
    );
  }

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-3">
        <PageTitle text="Daftar Kehadiran" />
        <PrevNextNavigation
          baseUrl={pathNameLanding}
          routes={routes}
          nextUrl={"/notulen"}
          marginLeft={"-55px"}
        />
      </div>
      <div className="w-[82rem]">
        <Card>
          <div className="w-full flex justify-between gap-5 px-4 py-2">
            <div className="w-full">
              <TableAttendance
                data={dataAttendance}
                handleDelete={handleDelete}
              />
            </div>
            <div className="py-4">
              <div className="flex w-full justify-center">
                <QRGenerator value={valueQR} size={150} />
              </div>
              <div className="text-center pt-1 font-semibold text-base">
                BRISMA 2.0.2
              </div>
              <div className="mt-2 w-[200px] py-3 px-2 bg-slate-300 rounded text-xs text-center overflow-auto max-w-[200px]">
                <Link
                  href={valueQR}
                  target="_blank"
                  className="whitespace-normal"
                >
                  {valueQR}
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </LandingLayoutEWPConsulting>
  );
};

export default index;
