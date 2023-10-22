import { ButtonField, Spinner, TextInput } from "@/components/atoms";
import { CardOverview } from "../../overview";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuditorDetailEWP } from "@/data/ewp/konvensional";
import { convertDate, usePostData } from "@/helpers";
import PasswordTextField from "@/components/atoms/PasswordTextField";

const CheckInAttendance = ({ handleSubmit }) => {
  const { id, code } = useRouter().query;
  const [data, setData] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [userLogin, setUserLogin] = useState({
    pn: "",
    password: "",
    meet_code: code,
  });

  const { auditorDetailEWP } = useAuditorDetailEWP({ id });

  const handleSubmitLogin = async () => {
    const response = await usePostData(
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/entrance/attendance/login`,
      userLogin
    );

    if (!response.isConfirmed) {
      handleSubmit();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSubmitLogin(e);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSubmitLogin]);

  useEffect(() => {
    if (auditorDetailEWP?.data) {
      const {
        id,
        ref_jenis,
        project_id,
        project_name,
        info_periode_pelaksanaan_start,
        info_periode_pelaksanaan_end,
        status_kode,
        status_name,
        info_team_audit,
        status_approver,
        number_adendum,
      } = auditorDetailEWP.data;
      const mapping = {
        id,
        jenis: ref_jenis.nama,
        projectId: project_id,
        projectName: project_name,
        period: `${convertDate(
          info_periode_pelaksanaan_start,
          "-",
          "d"
        )} s/d ${convertDate(info_periode_pelaksanaan_end, "-", "d")}`,
        progress: convertProgressAndPercent(status_kode).progress,
        percent: convertProgressAndPercent(status_kode).percent,
        ma: info_team_audit.ma,
        kta: info_team_audit.kta,
        ata: info_team_audit.ata,
        documentStatus: status_name,
        approvalStatus: status_approver?.pn,
        addendum: number_adendum.toString(),
        needApproval: false,
        href: `#`,
      };

      setData(mapping);
      setIsShown(true);
    }
  }, [auditorDetailEWP]);

  const convertProgressAndPercent = (status) => {
    const statusNumber = parseInt(status, 10);

    if (statusNumber >= 1 && statusNumber <= 7) {
      const progress = (statusNumber / 7).toFixed(2);
      const percent = (progress * 100).toFixed(0) + "%";
      return { progress, percent };
    }

    return { progress: 0, percent: "0%" };
  };

  const handleChange = (e, props) => {
    setUserLogin((prev) => {
      return { ...prev, [props]: e.target.value };
    });
  };

  if (!isShown) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <Spinner size={"large"} />
      </div>
    );
  }

  return (
    <div className="w-full flex gap-3 p-5">
      <div className="w-[55%]">
        <CardOverview data={data} withoutHover={true} withoutButton={true} />
      </div>
      <div className="w-[45%] p-2">
        <p className="text-brisma font-bold text-2xl">Daftar Kehadiran</p>
        <div className="w-full py-3">
          <p className="text-base text-brisma font-bold">Personal Number</p>
          <TextInput
            value={userLogin.pn}
            onChange={(e) => handleChange(e, "pn")}
          />
          <p className="text-base text-brisma font-bold">Password</p>
          <PasswordTextField
            value={userLogin.password}
            handleChange={(e) => handleChange(e, "password")}
          />
        </div>
        <div className="w-full bg-atlasian-blue-light rounded">
          <ButtonField text="Check-In" handler={handleSubmitLogin} />
        </div>
      </div>
    </div>
  );
};

export default CheckInAttendance;
