import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { MainLayout } from "@/layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import { eksumHtml } from "@/templates/catalog/ewp";
import {
  // DocumentViewer,
  ProjectInfo,
} from "@/components/molecules/catalog";
import { Bar } from "react-chartjs-2";

import { useRiskProfile } from "@/data/catalog/ewp";
import { loadingSwal } from "@/helpers";

const index = () => {
  const router = useRouter();

  const [profilResikoUKO, setProfilResikoUKO] = useState({});
  const [profilResikoUker, setProfilResikoUker] = useState({});
  const [topTenRisk, setTopTenRisk] = useState([]);
  const [topTenControl, setTopTenControl] = useState([]);
  const [rcmAfterAudit, setRcmAfterAudit] = useState([]);
  const [rekapPenyebabTemuan, setRekapPenyebabTemuan] = useState([]);
  const [rekapAktivitasTemuan, setRekapAktivitasTemuan] = useState([]);
  const [loadingGet, setLoadingGet] = useState(true);
  const [params, setParams] = useState({
    year: "2023",
    type: "2",
    id: "1",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      ...params,
      year: id?.split("x1c-")[2],
      type: id?.split("x1c-")[0],
      id: id?.split("x1c-")[1],
      uri: id,
    });
  }, [router.isReady]);

  const { riskProfileData, riskProfileIsLoading } = useRiskProfile(params.id);

  useEffect(() => {
    if (riskProfileData !== undefined) {
      setProfilResikoUKO(riskProfileData.data.profilResikoUKO);
      setProfilResikoUker(riskProfileData.data.profileResikoUker);
      setTopTenRisk(riskProfileData.data.topTenRisk);
      setTopTenControl(riskProfileData.data.topTenControl);
      setRcmAfterAudit(riskProfileData.data.rcmAfterAudit);
      setRekapPenyebabTemuan(riskProfileData.data.rekapPenyebabTemuan);
      setRekapAktivitasTemuan(riskProfileData.data.rekapAktivitasTemuan);
    }
  }, [riskProfileData]);

  useEffect(() => {
    setLoadingGet(riskProfileIsLoading);
    riskProfileIsLoading ? loadingSwal() : loadingSwal("close");
  }, [riskProfileIsLoading]);

  const baseUrl = "/catalogue/ewp";
  const breadcrumbs = [
    { name: "Catalogue", path: "/catalogue" },
    { name: "E.W.P", path: baseUrl },
    { name: "Daftar Dokumen", path: baseUrl + "/" + params.uri },
    {
      name: "Daftar Dokumen LHA",
      path: baseUrl + "/" + params.uri + "/lha",
    },
    {
      name: "Dokumen LHA-Risk Profile",
      path: baseUrl + "/" + params.uri + "/lha/risk-profile",
    },
  ];

  const merah = "#ff4d4f";
  const oranye = "#ff9933";
  const kuning = "#f5ee22";
  const hijaumuda = "#00b894";
  const hijau = "#00e676";
  const warnaScore = (score) => {
    if (score > 4) {
      return merah;
    } else if (score > 3) {
      return oranye;
    } else if (score > 2) {
      return kuning;
    } else if (score > 1) {
      return hijaumuda;
    } else if (score > 0) {
      return hijau;
    } else {
      return "#fff";
    }
  };

  const reverseHeatMapRACM = () => {
    let newOnes = [];
    if (profilResikoUKO.heatMapRACM?.length > 0) {
      let i = profilResikoUKO.heatMapRACM?.length - 1;
      while (i >= 0) {
        newOnes.push(profilResikoUKO.heatMapRACM[i]);

        i--;
      }
    }
    return newOnes;
  };

  const reverseHeatMapResikoUker = () => {
    let newOnes = [];
    if (profilResikoUker.heatMapRACM?.length > 0) {
      let i = profilResikoUker.heatMapRACM?.length - 1;
      while (i >= 0) {
        newOnes.push(profilResikoUker.heatMapRACM[i]);

        i--;
      }
    }
    return newOnes;
  };

  const renderHeatMapRACM = () => {
    let newOnes = reverseHeatMapRACM();

    const { ukoScore } = profilResikoUKO;

    let result = [];
    let row = 0;

    newOnes.forEach((element) => {
      let col = 0;
      let colContent = [];

      element.forEach((item) => {
        if (
          row === element.length - ukoScore.likelihood &&
          col === ukoScore.impact - 1
        ) {
          colContent.push(
            <td
              key={`td${col}`}
              style={{
                width: "4rem",
                height: "4rem",
                textAlign: "center",
                fontWeight: "bold",
                backgroundColor: item.color,
                border: "1px solid #000",
              }}
            >
              {ukoScore.branch_kode}
            </td>
          );
        } else {
          colContent.push(
            <td
              key={`td${col}`}
              style={{
                width: "4rem",
                height: "4rem",
                backgroundColor: item.color,
                border: "1px solid #000",
              }}
            ></td>
          );
        }
        col++;
      });

      result.push(<tr key={`tr${row}`}>{colContent}</tr>);
      row++;
    });

    return result;
  };

  const renderHeatMapResikoUker = () => {
    let newOnes = reverseHeatMapResikoUker();
    const { ukerHeats } = profilResikoUker;

    let result = [];
    let row = 0;

    newOnes.forEach((element) => {
      let col = 0;
      let colContent = [];

      element.forEach((item) => {
        ukerHeats.forEach((itemUker) => {
          if (
            row === element.length - itemUker?.likelihood &&
            col === itemUker?.impact - 1
          ) {
            colContent.push(
              <td
                key={`td${col}`}
                style={{
                  width: "4rem",
                  height: "4rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: item.color,
                  border: "1px solid #000",
                }}
              >
                {itemUker?.branch_kode}
              </td>
            );
          }
        });

        colContent.push(
          <td
            key={`td${col}`}
            style={{
              width: "4rem",
              height: "4rem",
              backgroundColor: item.color,
              border: "1px solid #000",
            }}
          ></td>
        );

        col++;
      });

      const filterColContent = (data = [], key) => {
        const set = new Set();
        return data.reduce((arr, e) => {
          if (!set.has(e[key])) {
            set.add(e[key]);
            arr.push({ ...e });
          }
          return arr;
        }, []);
      };

      result.push(<tr>{filterColContent(colContent, "key")}</tr>);
      row++;
    });
    return result;
  };

  const risks = [];
  const risksLabel = [];
  const risksScore = [];
  if (!loadingGet) {
    topTenRisk !== undefined &&
      topTenRisk?.map((risk) => {
        risks.push(risk.ref_risk_issue_kode + " - " + risk.ref_risk_issue_name);
        risksLabel.push(risk.ref_risk_issue_kode);
        risksScore.push(risk.jumlah_risk);
      });
  }

  const controls = [];
  const controlsLabel = [];
  const controlsScore = [];
  if (!loadingGet) {
    if (topTenControl) {
      topTenControl.forEach((control) => {
        controls.push(
          control.ref_control_kode + " - " + control.ref_control_name
        );
        controlsLabel.push(control.ref_control_kode);
        controlsScore.push(control.jumlah_control);
      });
    }
  }
  const backgroundColor = [
    "#ff4d4f",
    "#ff9933",
    "#f5ee22",
    "#00b894",
    "#00e676",
    "#00b894",
    "#00e676",
    "#00b894",
    "#00e676",
    "#00b894",
  ];
  // // const dataSample = [18, 16, 5, 4, 4, 4, 3, 3, 2, 2];
  // // const dataSample2 = [38, 16, 11, 8, 8, 7, 6, 5, 4, 3];

  const optionsTop10Risk = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "TOP 10 RISIKO UNTUK SEMUA SUB AKTIVITAS",
      },
    },
  };
  const dataTop10Risk = {
    labels: risksLabel,
    datasets: [
      {
        label: "TOP 10 RISK",
        data: risksScore,
        backgroundColor: backgroundColor,
      },
    ],
  };
  const optionsTop10Control = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "TOP 10 KONTROL TIDAK EFEKTIF",
      },
    },
  };
  const dataTop10Control = {
    labels: controlsLabel,
    datasets: [
      {
        label: "TOP 10 KONTROL YANG LEMAH",
        data: controlsScore,
        backgroundColor: backgroundColor,
      },
    ],
  };

  let tableRCM = ``;
  if (!loadingGet) {
    tableRCM = `<table style="width: 100%;"><thead><tr><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Organisasi</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Audit Year</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Mega Proses</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Major Proses</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Sub Major Proses</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Isu Risiko</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Impact</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Likelihood</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Skor</th></tr></thead><tbody>`;
    if (rcmAfterAudit && rcmAfterAudit.length > 0) {
      rcmAfterAudit.forEach((item) => {
        if (item.mega_proses.length > 0) {
          item.mega_proses.forEach((mega_proses) => {
            let mega_prosesRS = 1;
            let isiMajor_proses = [];

            if (mega_proses.major_proses.length > 0) {
              mega_proses.major_proses.forEach((major_proses) => {
                mega_prosesRS += 1;
                let major_prosesRS = 1;

                if (major_proses.sub_major_proses.length > 0) {
                  major_proses.sub_major_proses.forEach((sub_major_proses) => {
                    mega_prosesRS += 1;
                    major_prosesRS += 1;
                    let sub_major_prosesRS = 1;

                    if (sub_major_proses.risk_issue.length > 0) {
                      sub_major_proses.risk_issue.forEach((risk_issue) => {
                        mega_prosesRS += 1;
                        major_prosesRS += 1;
                        sub_major_prosesRS += 1;
                        let c = "";
                        c += `<tr>`;
                        c += `<td style="border:solid 1px #000; padding:0.5rem">${risk_issue.risk_issue_name}</td>`;
                        c += `<td style="border:solid 1px #000; padding:0.5rem">${
                          risk_issue.risk_issue_impact || ""
                        }</td>`;
                        c += `<td style="border:solid 1px #000; padding:0.5rem">${
                          risk_issue.risk_issue_likelihood || ""
                        }</td>`;
                        c += `<td style="border:solid 1px #000; padding:0.5rem; background-color: ${warnaScore(
                          risk_issue.risk_issue_score
                        )}">${risk_issue.risk_issue_score || ""}</td>`;
                        c += `</tr>`;
                        isiMajor_proses[
                          major_proses.major_proses_kode +
                            "-" +
                            sub_major_proses.sub_major_proses_kode +
                            "-" +
                            risk_issue.risk_issue_kode
                        ] = c;
                      });
                    }

                    let b = "";
                    b += `<tr>`;
                    b += `<td style="border:solid 1px #000; padding:0.5rem; vertical-align:top" rowspan="${sub_major_prosesRS}">${sub_major_proses.sub_major_proses_name}</td>`;
                    b += `<td style="border:solid 1px #000; padding:0.5rem">&nbsp;</td>`;
                    b += `<td style="border:solid 1px #000; padding:0.5rem">${
                      sub_major_proses.sub_major_impact || ""
                    }</td>`;
                    b += `<td style="border:solid 1px #000; padding:0.5rem">${
                      sub_major_proses.sub_major_likelihood || ""
                    }</td>`;
                    b += `<td style="border:solid 1px #000; padding:0.5rem; background-color: ${warnaScore(
                      sub_major_proses.sub_major_score
                    )}">${sub_major_proses.sub_major_score || ""}</td>`;
                    b += `</tr>`;
                    isiMajor_proses[
                      major_proses.major_proses_kode +
                        "-" +
                        sub_major_proses.sub_major_proses_kode
                    ] = b;
                  });
                }

                let a = "";
                a += `<tr>`;
                a += `<td style="border:solid 1px #000; padding:0.5rem; vertical-align:top" rowspan="${major_prosesRS}">${major_proses.major_proses_name}</td>`;
                a += `<td style="border:solid 1px #000; padding:0.5rem">&nbsp;</td>`;
                a += `<td style="border:solid 1px #000; padding:0.5rem">&nbsp;</td>`;
                a += `<td style="border:solid 1px #000; padding:0.5rem">${
                  major_proses.major_proses_impact || ""
                }</td>`;
                a += `<td style="border:solid 1px #000; padding:0.5rem">${
                  major_proses.major_proses_likelihood || ""
                }</td>`;
                a += `<td style="border:solid 1px #000; padding:0.5rem; background-color: ${warnaScore(
                  major_proses.major_proses_score
                )}">${major_proses.major_proses_score || ""}</td>`;
                a += `</tr>`;
                isiMajor_proses[major_proses.major_proses_kode] = a;
              });
            }

            tableRCM += `<tr>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem; vertical-align:top" rowspan="${mega_prosesRS}">${item.branch_kode} - ${item.branch_name} <br> ${item.orgeh_kode} - ${item.orgeh_name}</td>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem; vertical-align:top" rowspan="${mega_prosesRS}">${item.audit_year}</td>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem; vertical-align:top" rowspan="${mega_prosesRS}">${mega_proses.mega_proses_name}</td>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem">&nbsp;</td>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem">&nbsp;</td>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem">&nbsp;</td>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem">${
              mega_proses.mega_proses_impact || ""
            }</td>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem">${
              mega_proses.mega_proses_likelihood || ""
            }</td>`;
            tableRCM += `<td style="border:solid 1px #000; padding:0.5rem; background-color: ${warnaScore(
              mega_proses.mega_proses_score
            )}">${mega_proses.mega_proses_score || ""}</td>`;
            tableRCM += `</tr>`;
            if (mega_proses.major_proses.length > 0) {
              mega_proses.major_proses.forEach((major_proses) => {
                tableRCM += isiMajor_proses[major_proses.major_proses_kode];
                if (major_proses.sub_major_proses.length > 0) {
                  major_proses.sub_major_proses.forEach((sub_major_proses) => {
                    tableRCM +=
                      isiMajor_proses[
                        major_proses.major_proses_kode +
                          "-" +
                          sub_major_proses.sub_major_proses_kode
                      ];
                    if (sub_major_proses.risk_issue.length > 0) {
                      sub_major_proses.risk_issue.forEach((risk_issue) => {
                        tableRCM +=
                          isiMajor_proses[
                            major_proses.major_proses_kode +
                              "-" +
                              sub_major_proses.sub_major_proses_kode +
                              "-" +
                              risk_issue.risk_issue_kode
                          ];
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
    tableRCM += `</tbody></table>`;
  }

  function NumberDenganKoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let rowspanAuditee = [];
  let currentAuditee = "";
  let rowspanUnitKerja = [];
  let currentUnitKerja = "";
  let rowspanAktivitas = [];
  let currentAktvitas = "";

  if (!loadingGet) {
    rekapAktivitasTemuan?.forEach((item) => {
      if (item.auditee_branch_kode === currentAuditee) {
        rowspanAuditee[item.auditee_branch_kode] += 1;
      } else {
        rowspanAuditee[item.auditee_branch_kode] = 1;
        currentAuditee = item.auditee_branch_kode;
      }

      if (
        item.auditee_branch_kode === currentAuditee &&
        item.unit_kerja_branch_kode === currentUnitKerja
      ) {
        rowspanUnitKerja[
          item.auditee_branch_kode + "-" + item.unit_kerja_branch_kode
        ] += 1;
      } else {
        rowspanUnitKerja[
          item.auditee_branch_kode + "-" + item.unit_kerja_branch_kode
        ] = 1;
        currentUnitKerja = item.unit_kerja_branch_kode;
      }

      if (
        item.auditee_branch_kode === currentAuditee &&
        item.unit_kerja_branch_kode === currentUnitKerja &&
        item.aktivitas_kode === currentAktvitas
      ) {
        rowspanAktivitas[
          item.auditee_branch_kode +
            "-" +
            item.unit_kerja_branch_kode +
            "-" +
            item.aktivitas_kode
        ] += 1;
      } else {
        rowspanAktivitas[
          item.auditee_branch_kode +
            "-" +
            item.unit_kerja_branch_kode +
            "-" +
            item.aktivitas_kode
        ] = 1;
        currentAktvitas = item.aktivitas_kode;
      }
    });
  }

  currentAuditee = "";
  currentUnitKerja = "";
  currentAktvitas = "";

  let tableAcitivitasTemuan = `<table cellpadding="0" cellspacing="0" border="1px" style="width: 100%;"><thead><tr><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Auditee</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Unit Kerja</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Aktivitas</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Sub Aktivitas</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Jml</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">%</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Rp-Potensial</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Rp-Aktual</th><th style="border: 1px solid rgb(0, 0, 0); padding: 0.5rem; text-align: center;">Rp-Total</th></tr></thead><tbody>`;
  if (!loadingGet) {
    rekapAktivitasTemuan?.forEach((item) => {
      tableAcitivitasTemuan += `<tr>`;
      if (item.auditee_branch_kode !== currentAuditee) {
        tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem; vertical-align:top;" rowspan="${
          rowspanAuditee[item.auditee_branch_kode]
        }">${item.auditee_branch_name}</td>`;
      }
      if (
        item.auditee_branch_kode !== currentAuditee ||
        item.unit_kerja_branch_kode !== currentUnitKerja
      ) {
        tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem; vertical-align:top;" rowspan="${
          rowspanUnitKerja[
            item.auditee_branch_kode + "-" + item.unit_kerja_branch_kode
          ]
        }">${item.unit_kerja_branch_name}</td>`;
      }
      if (
        item.auditee_branch_kode !== currentAuditee ||
        item.unit_kerja_branch_kode !== currentUnitKerja ||
        item.aktivitas_kode !== currentAktvitas
      ) {
        tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem; vertical-align:top;" rowspan="${
          rowspanAktivitas[
            item.auditee_branch_kode +
              "-" +
              item.unit_kerja_branch_kode +
              "-" +
              item.aktivitas_kode
          ]
        }">${item.aktivitas_name}</td>`;
      }
      currentAuditee = item.auditee_branch_kode;
      currentUnitKerja = item.unit_kerja_branch_kode;
      currentAktvitas = item.aktivitas_kode;
      tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem;">${item.sub_aktivitas_name}</td>`;
      tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem;">${item.jumlah}</td>`;
      tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem;">${item.persen} %</td>`;
      tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem;">${NumberDenganKoma(
        item.rp_potential
      )}</td>`;
      tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem;">${NumberDenganKoma(
        item.rp_actual
      )}</td>`;
      tableAcitivitasTemuan += `<td style="border:solid 1px #000; padding: 1rem;">${NumberDenganKoma(
        item.rp_total
      )}</td>`;
      tableAcitivitasTemuan += `</tr>`;
    });
  }
  tableAcitivitasTemuan += `</tbody></table>`;
  function createTableAktivitasTemuan() {
    return { __html: tableAcitivitasTemuan };
  }

  return (
    <MainLayout>
      <div className="px-5">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"LHA-Risk Profile"} />
        </div>
        <ProjectInfo
          type="ewp"
          year={params.year}
          source={params.type}
          id={params.id}
        />
        <div className="flex">
          <div className="container">
            <div className="mt-5">
              <h3>Audit Profile</h3>
            </div>
            <div className="">
              <div className="border-2 rounded-lg p-5 mt-4 border-blue-300 min-h-screen">
                <div className="h-full">
                  <ol>
                    <li style={{ marginBottom: "10px" }}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4>1. Profile Risiko UKO</h4>
                          <table>
                            {loadingGet ? "Loading..." : renderHeatMapRACM()}
                          </table>
                          <p>Keterangan : </p>
                          {profilResikoUKO.ukoScore === undefined ? (
                            "Loading..."
                          ) : (
                            <p>
                              {profilResikoUKO.ukoScore.branch_kode} :{" "}
                              {profilResikoUKO.ukoScore.branch_name} -{" "}
                              {profilResikoUKO.ukoScore.orgeh_name}
                            </p>
                          )}
                        </div>

                        <div>
                          <h4>Profile Risiko Uker</h4>
                          <table>
                            {loadingGet
                              ? "Loading..."
                              : renderHeatMapResikoUker()}
                          </table>
                          <p>Keterangan : </p>
                          <ul style={{ listStyleType: "circle" }}>
                            {profilResikoUker?.ukers?.map((item, key) => (
                              <li key={key}>
                                {item.branch_kode}: {item.branch_name} -{" "}
                                {item.orgeh_name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <h4>2. Top 10 Risk</h4>
                      <div
                        style={{
                          backgroundColor: "#fff",
                          display: "flex",
                          padding: "1rem",
                          border: "solid 1px #000",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "15rem",
                            transformOrigin: "0 0",
                            transform: "rotate(270deg)",
                          }}
                        >
                          JUMLAH TEMUAN
                        </div>
                        <div style={{ width: "60%", marginLeft: "3rem" }}>
                          <Bar
                            options={optionsTop10Risk}
                            data={dataTop10Risk}
                          />
                          <div
                            style={{ textAlign: "center", marginTop: "1rem" }}
                          >
                            RISIKO
                          </div>
                        </div>
                        <div
                          style={{
                            width: "35%",
                            padding: "1rem",
                            margin: "1rem",
                            backgroundColor: "#edf5f0",
                            border: "solid 1px blue",
                          }}
                        >
                          <ul>
                            {risks?.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  style={{ marginBottom: "0.5rem" }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <div
                                      style={{
                                        width: "1rem",
                                        height: "1.5rem",
                                        fontSize: "8px",
                                        backgroundColor: backgroundColor[index],
                                        marginRight: "0.5rem",
                                      }}
                                    ></div>
                                    {item}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <h4>3. Top 10 Control yang lemah</h4>
                      <div
                        style={{
                          backgroundColor: "#fff",
                          display: "flex",
                          padding: "1rem",
                          border: "solid 1px #000",
                        }}
                      >
                        {/* <div
                          style={{
                            position: "absolute",
                            marginTop: "20rem",
                            transformOrigin: "0 0",
                            transform: "rotate(270deg)",
                          }}
                        >
                          JUMLAH KONTROL TIDAK EFEKTIF
                        </div> */}
                        <div style={{ width: "60%", marginLeft: "3rem" }}>
                          <Bar
                            options={optionsTop10Control}
                            data={dataTop10Control}
                          />
                          <div
                            style={{ textAlign: "center", marginTop: "1rem" }}
                          >
                            KONTROL
                          </div>
                        </div>
                        <div
                          style={{
                            width: "35%",
                            padding: "1rem",
                            margin: "1rem",
                            backgroundColor: "#edf5f0",
                            border: "solid 1px blue",
                          }}
                        >
                          <ul>
                            {controls?.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  style={{ marginBottom: "0.5rem" }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <div
                                      style={{
                                        width: "1rem",
                                        height: "1.5rem",
                                        backgroundColor: backgroundColor[index],
                                        marginRight: "0.5rem",
                                      }}
                                    ></div>
                                    {item}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <h4>4. RCM After Audit</h4>
                      <div style={{ backgroundColor: "#fff", padding: "1rem" }}>
                        <p style={{ textAlign: "center", fontWeight: "bold" }}>
                          LAPORAN RISK PROFILE PER UKO
                        </p>
                        <table>
                          <tr>
                            <td colSpan={2} style={{ fontWeight: "bold" }}>
                              PT. Bank Rakyat Indonesia Persero, Tbk
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "10rem" }}>Audit Year</td>
                            <td>: {params.year}</td>
                          </tr>
                          <tr>
                            <td>UKO</td>
                            <td>
                              :{" "}
                              {rcmAfterAudit?.length > 0
                                ? rcmAfterAudit[0].branch_name
                                : ""}{" "}
                              &nbsp; [
                              {rcmAfterAudit?.length > 0
                                ? rcmAfterAudit[0].orgeh_name
                                : ""}
                              ]
                            </td>
                          </tr>
                        </table>
                        <div
                          style={{ margin: "1.5rem 0" }}
                          dangerouslySetInnerHTML={{ __html: tableRCM }}
                        ></div>
                      </div>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <h4>5. Rekapitulasi Penyebab Temuan</h4>
                      <div style={{ backgroundColor: "#fff", padding: "1rem" }}>
                        <table
                          style={{ width: "100%" }}
                          cellPadding={"0"}
                          cellSpacing={"0"}
                          border={"1px"}
                        >
                          <thead>
                            <tr>
                              <th
                                style={{
                                  border: "solid 1px #000",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                              >
                                Unit Kerja
                              </th>
                              <th
                                style={{
                                  border: "solid 1px #000",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                                colSpan={3}
                              >
                                Penyebab
                              </th>
                              <th
                                style={{
                                  border: "solid 1px #000",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                              >
                                Jml
                              </th>
                              <th
                                style={{
                                  border: "solid 1px #000",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                              >
                                %
                              </th>
                              <th
                                style={{
                                  border: "solid 1px #000",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                              >
                                Rp-Potensial
                              </th>
                              <th
                                style={{
                                  border: "solid 1px #000",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                              >
                                Rp-Aktual
                              </th>
                              <th
                                style={{
                                  border: "solid 1px #000",
                                  padding: "0.5rem",
                                  textAlign: "center",
                                }}
                              >
                                Rp-Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {loadingGet
                              ? "Loading..."
                              : rekapPenyebabTemuan?.map((item, index) => (
                                  <tr key={index}>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {item.unit_kerja}
                                    </td>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {item.penyebab_level_0}
                                    </td>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {item.penyebab_level_1}
                                    </td>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {item.penyebab_level_2}
                                    </td>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {item.jumlah}
                                    </td>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {item.persen}
                                    </td>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {NumberDenganKoma(item.rp_potential)}
                                    </td>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {NumberDenganKoma(item.rp_actual)}
                                    </td>
                                    <td
                                      style={{
                                        border: "solid 1px #000",
                                        padding: "0.5rem",
                                      }}
                                    >
                                      {NumberDenganKoma(item.rp_total)}
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <h4>6. Rekapitulasi Aktivitas Temuan</h4>
                      <div
                        style={{ backgroundColor: "#fff", padding: "1rem" }}
                        dangerouslySetInnerHTML={createTableAktivitasTemuan()}
                      ></div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;
