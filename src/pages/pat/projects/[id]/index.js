import React, { useEffect, useState } from "react";
import { Breadcrumbs, CardLanding } from "@/components/atoms";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import { useRouter } from "next/router";
import useStatusPat from "@/data/pat/useStatusPat";
import { setSearchParam } from "@/slices/pat/statusPatSlice";
import { useDispatch } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);
  const { statusPat } = useStatusPat(id);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
  ];

  useEffect(() => {
    dispatch(setSearchParam(statusPat?.data));
  }, [statusPat]);

  useEffect(() => {
    setData([
      {
        title: "Latar Belakang dan Tujuan",
        description: "Pemaparan latar belakang usulan P.A.T",
        status: statusPat?.data?.pic_latar_belakang_tujuan
          ? "success"
          : "failed",
        url: `/pat/projects/${id}/latar-belakang-dan-tujuan`,
      },
      {
        title: "Sumber Informasi",
        description: "Pemaparan usulan sumber informasi P.A.T",
        status: statusPat?.data?.pic_sumber_informasi ? "success" : "failed",
        url: `/pat/projects/${id}/sumber-informasi`,
      },
      {
        title: "Tim Audit",
        description: "Pembentukan tim audit.",
        status: statusPat?.data?.pic_tim_audit ? "success" : "failed",
        url: `/pat/projects/${id}/tim-audit`,
      },
      {
        title: "Jadwal Audit",
        description: "Pembuatan jadwal audit.",
        status: statusPat?.data?.pic_jadwal_audit ? "success" : "failed",
        url: `/pat/projects/${id}/jadwal-audit`,
      },
      {
        title: "Ringkasan Objek Audit",
        description: "Melihat ringkasan objek audit.",
        url: `/pat/projects/${id}/ringkasan-objek-audit`,
      },
      {
        title: "Jadwal Kegiatan",
        description: "Pembuatan jadwal kegiatan.",
        status: statusPat?.data?.pic_jadwal_sbp ? "success" : "failed",
        url: `/pat/projects/${id}/jadwal-kegiatan`,
      },
      {
        title: "Jadwal Lainnya",
        description: "Pembuatan jadwal lainnya.",
        status: statusPat?.data?.pic_kegiatan_lain ? "success" : "failed",
        url: `/pat/projects/${id}/jadwal-lainnya`,
      },
      {
        title: "Dokumen Usulan P.A.T",
        description: "Generate Documents dan approval.",
        status: statusPat?.data?.pic_document ? "success" : "failed",
        url: `/pat/projects/${id}/dokumen`,
      },
    ]);

    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver?.pn },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  return (
    <PatLandingLayout data={statusPat?.data} content={content}>
      <div className="pr-24">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">
            Usulan Perencanaan Audit Tahunan
          </div>
          <div className="my-3 w-40">
            <Button appearance="danger" shouldFitContainer>
              Addendum
            </Button>
          </div>
        </div>
        {/* Start Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {data.map((v, i) => {
            return (
              <CardLanding
                key={i}
                title={v.title}
                description={v.description}
                status={v.status}
                url={v.url}
              />
            );
          })}
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;
