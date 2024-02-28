import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  PageTitle,
  UploadButton,
} from "@/components/atoms";
import { PatLandingLayout } from "@/layouts/pat";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  PopupKlipping,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import useLatarBelakangTujuanPat from "@/data/pat/useLatarBelakangTujuanPat";
import { useRouter } from "next/router";
import {
  convertDate,
  copyToClipboard,
  loadingSwal,
  usePostData,
  usePostFileData,
} from "@/helpers";
import { useStatusPat } from "@/data/pat";
import { useDispatch, useSelector } from "react-redux";
import { setImageClipList, setLampiranList, setHistoryList } from "@/slices/pat/latarBelakangSlice";

const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const routes = [
  {
    name: "Latar Belakang dan Tujuan",
    slug: "latar-belakang-dan-tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
];

const index = () => {
  const dispatch = useDispatch();

  const imageClipList = useSelector(
    (state) => state.latarBelakang.imageClipList
  );
  const lampiranList = useSelector(
    (state) => state.latarBelakang.lampiranList
  );
  const historyList = useSelector(
    (state) => state.latarBelakang.historyList
  );
  const { id } = useRouter().query;
  const baseUrl = `/pat/projects/${id}`;

  const { statusPat } = useStatusPat(id);

  const [isDisabled, setIsDisabled] = useState(false);
  const [content, setContent] = useState(null);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
    {
      name: "Latar Belakang",
      path: `/pat/projects/${id}/latar-belakang-dan-tujuan`,
    },
  ];

  const { latarBelakangTujuanPat } = useLatarBelakangTujuanPat(id);

  const [data, setData] = useState({
    pat_id: id,
    latar_belakang: "",
  });

  const handlePost = async () => {
    try {
      dispatch(setHistoryList([
        ...historyList,
        {
          date: convertDate(new Date(),"-"),
          name: '',
          note: ''
        }
      ]))
      return await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/ltb`,
        data
      );
    } catch (e) {
      throw new Error(e);
    }
  };
  const handleImageUpload = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "pat",
      });

      dispatch(
        setImageClipList([
          ...imageClipList,
          { url: response.url[0], name: e.target.files[0].name },
        ])
      );
    }
    loadingSwal("close");
  };

  const handleLampiranUpload = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "pat",
      });

      dispatch(
        setLampiranList([
          ...lampiranList,
          { url: response.url[0], name: e.target.files[0].name },
        ])
      );
    }
    loadingSwal("close");
    console.log(lampiranList)
  };

  useEffect(() => {
    setIsDisabled(statusPat?.data?.status_pat !== "On Progress");
  }, [statusPat]);

  useEffect(() => {
    setContent([
      {
        title: "Initiator",
        value: latarBelakangTujuanPat?.data?.pic_latar_belakang_tujuan,
      },
      {
        title: "Created Date",
        value: convertDate(
          latarBelakangTujuanPat?.data?.lb_created_at,
          "-",
          "d",
          true
        ),
      },
      { title: "Document Status", value: latarBelakangTujuanPat?.data?.status_pat },
			{ title: "Document Status", value: latarBelakangTujuanPat?.data?.status_pat },  
    ]);

    setData({
      ...data,
      latar_belakang: latarBelakangTujuanPat?.data?.latar_belakang || "",
    });
  }, [latarBelakangTujuanPat]);

  return (
		<PatLandingLayout data={statusPat?.data} content={content}>
			<Breadcrumbs data={breadcrumbs} />
			<div className="flex justify-between items-center mb-6 w-[1075px]">
				<PageTitle text={"Latar Belakang dan Tujuan"} className="w-full" />
				<PrevNextNavigation
					baseUrl={baseUrl}
					routes={routes}
					prevUrl={false}
					nextUrl={"/sumber-informasi"}
					marginLeft={"-90px"}
					widthDropdown={"w-56"}
				/>
			</div>
			{/* Start Content */}
			<div className="my-4 flex">
				<div className="w-64 mr-6 flex flex-col gap-6">
					<div>
						<Card>
							<div className="w-full px-4 -ml-1">
								<div className="flex justify-between">
									<p className="text-xl font-semibold">
										Kliping Gambar
									</p>
									<PopupKlipping />
								</div>
								{/* Start Kliping Gambar */}
								<div
									className="grid grid-cols-2 -mx-1 mt-2 overflow-scroll overflow-x-hidden"
									style={{ maxHeight: "37rem" }}
								>
									{imageClipList.map((v, i) => {
										return (
											<button
												key={i}
												className="m-2 border-2 shadow-sm rounded-lg p-3"
												style={{
													width: "6.25rem",
													height: "6.25rem",
												}}
												onClick={() =>
													copyToClipboard(v.url)
												}
											>
												<Image
													src={v.url}
													alt={v.name}
													width={200}
													height={200}
												/>
											</button>
										);
									})}
								</div>
								<div className="mt-4 py-2 bg-none w-full justify-start">
									<UploadButton
										text={"Tambah Kliping +"}
										fileAccept={
											"image/png, image/gif, image/jpeg"
										}
										handleUpload={handleImageUpload}
										className={
											"text-atlasian-purple text-sm"
										}
									/>
								</div>
								{/* End Kliping Gambar */}
							</div>
						</Card>
					</div>
					<div>
						<Card>
							<div className="w-full px-4 -ml-1">
								<div className="flex justify-between">
									<p className="text-xl font-semibold">
										Lampiran
									</p>
									<PopupKlipping />
								</div>
								{/* Start Lampiran */}
								<div
									className="grid mt-2 overflow-x-hidden"
									style={{ maxHeight: "37rem" }}
								>
									<ul>
										{lampiranList.map((v, i) => {
											return (
												<li
													key={i}
													className="list-disc text-blue-600"
												>
													<a
														href={v.url}
														className="font-semibold underline text-blue-600"
													>
														{v.name}
													</a>
												</li>
											);
										})}
									</ul>
								</div>
								<div className="mt-4 py-2 bg-none w-full justify-start">
									<UploadButton
										text={"Tambah Lampiran +"}
										fileAccept={
											"image/png, image/gif, image/jpeg"
										}
										handleUpload={handleLampiranUpload}
										className={
											"text-atlasian-purple text-sm"
										}
									/>
								</div>
								{/* End Lampiran */}
							</div>
						</Card>
					</div>
				</div>
				<div>
					<div className="flex gap-6 items-start">
						<div className="ckeditor-latar-belakang-pat overflow-x-hidden">
							<Editor
								contentData={data.latar_belakang}
								disabled={false}
								ready={true}
								onChange={(value) =>
									setData({ ...data, latar_belakang: value })
								}
							/>
						</div>
						<div className="w-64">
							<Card>
								<div className="w-full px-4 -ml-1">
									<div className="flex justify-between">
										<p className="text-xl font-semibold">
											Riwayat
										</p>
										<PopupKlipping />
									</div>
									{/* Start Riwayat */}
									<div
										className="grid mt-4 overflow-x-hidden"
										style={{ maxHeight: "37rem" }}
									>
										{historyList.map((v, i) => {
											return (
												<div key={i} className="mt-2">
													<p className="mt-0 font-bold text-lg underline">
														{v.date}
													</p>
													<p className="mt-0">
														{v.name}
													</p>
													<p className="mt-0">
														{v.note}
													</p>
												</div>
											);
										})}
									</div>
									{/* End Riwayat */}
								</div>
							</Card>
						</div>
					</div>
					{!isDisabled ? (
						<div className="mt-3 flex justify-end">
							<div className="w-[7.75rem] bg-atlasian-green rounded flex items-center">
								<ButtonField
									text={"Simpan"}
									handler={handlePost}
								/>
							</div>
						</div>
					) : (
						""
					)}
				</div>
			</div>
			{/* End Content */}
		</PatLandingLayout>
  );
};

export default index;
