import React, { useEffect, useState } from "react";
import { Modal, Card, TextInput } from "@/components/atoms";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import Button from "@atlaskit/button";
import Search from "@atlaskit/icon/glyph/editor/search";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setSearchParamsCATEWP } from "@/slices/catalog/ewp/catalogEWPSlice";
import { loadingSwal, successSwal } from "@/helpers";

const ModalSelectSourceData = ({ showModal, setShowModal, sourceType }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(0);
  const [tag, setTag] = useState("");
  const [source, setSource] = useState(1);
  const [year, setYear] = useState("");
  const [arr, setArr] = useState(0);
  const [url, setUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [faseAdendum, setFaseAdendum] = useState(0);
  const ar = [
    [
      {
        tahun: "2012",
        is_disabled: true,
      },
      {
        tahun: "2013",
        is_disabled: true,
      },
      {
        tahun: "2014",
        is_disabled: true,
      },
      {
        tahun: "2015",
        is_disabled: true,
      },
      {
        tahun: "2016",
        is_disabled: true,
      },
      {
        tahun: "2017",
        is_disabled: true,
      },
      {
        tahun: "2018",
        is_disabled: true,
      },
      {
        tahun: "2019",
        is_disabled: true,
      },
      {
        tahun: "2020",
        is_disabled: false,
      },
      {
        tahun: "2021",
        is_disabled: false,
      },
      {
        tahun: "2022",
        is_disabled: false,
      },
    ],
    [
      {
        tahun: "2022",
        is_disabled: false,
      },
      {
        tahun: "2023",
        is_disabled: false,
      },
    ],
  ];
  useEffect(() => {
    switch (sourceType) {
      case 1:
        setTag("P.A.T");
        setUrl("/catalogue/pat");
        break;
      case 2:
        setTag("E.W.P");
        setUrl("/catalogue/ewp");
        break;
      case 3:
        setTag("R.P.M");
        setUrl("/catalogue/rpm");
        break;
      default:
        setTag("P.A.T");
        setUrl("/catalogue/pat");
        break;
    }
  }, [sourceType]);

  const handleClickYear = (tahun, i) => {
    setYear(tahun);
    setArr(i);
  };

  const handleSubmitCatalogEWP = (url) => {
    // Dapatkan nilai dari state di sini
    const searchParamsCatEWP = {
      year,
      source,
      projectName,
      faseAdendum,
      sourceType,
    };
    // Kirim data ke Redux
    dispatch(setSearchParamsCATEWP(searchParamsCatEWP));
    loadingSwal();
    setShowModal(false);
    router.push(url);
    successSwal("Pencarian berhasil.");
  };
  return (
    <Modal
      showModal={showModal}
      positionCenter={true}
      onClickOutside={() => setShowModal(false)}
    >
      {menu == 0 && (
        <div className="w-[48rem] h-modal p-5">
          <h3 className="p-3 font-semibold text-xl">
            {`Pustaka Dokumen ${tag}`}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3">
              <Card>
                <div className="p-5 text-center">
                  <p className="font-semibold text-lg">Brisma 1.0</p>
                  <h5 className="text-atlasian-gray-dark mb-5 font-medium text-base">
                    Pustaka Dokumen <br /> Tahun 2012 - 2022
                  </h5>
                  <Button
                    appearance="primary"
                    onClick={() => {
                      setSource(1);
                      setMenu(1);
                    }}
                    isDisabled={sourceType !== 2 ? true : false}
                    iconAfter={<IconArrowRight size="medium" />}
                  >
                    <p className="text-base p-1">Akses Data</p>
                  </Button>
                </div>
              </Card>
            </div>
            <div className="p-3">
              <Card>
                <div className="p-5 text-center">
                  <p className="font-semibold text-lg">Brisma 2.0</p>
                  <h5 className="text-atlasian-gray-dark mb-5 font-medium text-base">
                    Pustaka Dokumen <br /> Tahun 2023 - Saat Ini
                  </h5>
                  <Button
                    appearance="primary"
                    onClick={() => {
                      setSource(2);
                      setMenu(1);
                    }}
                    iconAfter={<IconArrowRight size="medium" />}
                  >
                    <p className="text-base p-1">Akses Data</p>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
      {menu == 1 && (
        <div className="w-[60rem] h-modal p-4">
          <h3 className="p-3 font-semibold text-xl">Pustaka Data {tag}</h3>
          <div className="grid grid-cols-5">
            <div className="p-1 col-span-2">
              <Card>
                <h4 className="p-3 font-semibold text-lg">Pilih Tahun</h4>
                <div className="grid grid-cols-3 gap-2 p-4">
                  {ar[source - 1].map((item, i) => {
                    return (
                      <button
                        className={`p-3 text-sm border border-slate-300 rounded-md shadow-sm ${
                          item.is_disabled
                            ? "opacity-50"
                            : "hover:text-white hover:bg-gray-800"
                        } ${
                          arr == i && i != 0 ? "bg-gray-800 text-white" : ""
                        }`}
                        key={i}
                        onClick={() => handleClickYear(item.tahun, i)}
                        disabled={item.is_disabled}
                      >
                        Data {item.tahun}
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>
            <div className="p-1 col-span-3">
              <Card>
                <h4 className="p-3 font-semibold text-lg">Filter Data</h4>
                <div className="grid grid-cols-4">
                  <div className="p-3 font-semibold text-sm">Nama Project</div>
                  <div className="p-1 pl-10 col-span-3">
                    <TextInput
                      onChange={(e) => {
                        setProjectName(e.target.value);
                      }}
                      placeholder="Masukkan Nama Project"
                    />
                  </div>
                  {/* Additional Filter (Periode Audit, Jenis Audit) */}
                  {/* <div className="p-3 font-semibold text-sm">Periode Audit</div>
                  <div className="p-1 pl-10 col-span-3">
                    <Select
                      optionValue={[
                        { label: "Triwulan I", value: "I" },
                        { label: "Triwulan II", value: "II" },
                        { label: "Triwulan III" },
                        { label: "Triwulan IV", value: "IV" },
                      ]}
                      placeholder="Pilih Periode"
                      isSearchable={false}
                    />
                  </div>
                  <div className="p-3 font-semibold text-sm">Jenis Audit</div>
                  <div className="p-1 pl-10 col-span-3">
                    <Select
                      optionValue={[
                        { label: "Reguler", value: "Reguler" },
                        { label: "Special", value: "Special" },
                        { label: "Tematik", value: "Tematik" },
                      ]}
                      placeholder="Pilih Jenis"
                      isSearchable={false}
                    />
                  </div> */}
                  <div className="p-3 font-semibold text-sm">Fase Addendum</div>
                  <div className="p-1 pl-10 col-span-3">
                    <TextInput
                      isNumber={true}
                      onChange={(e) => {
                        setFaseAdendum(e.target.value);
                      }}
                      placeholder="Masukkan Fase Addendum"
                    />
                  </div>
                  <div className="p-3"></div>
                  <div className="flex gap-2 p-1 pl-10 col-span-3 py-3">
                    <Button
                      appearance="default"
                      onClick={() => setMenu(0)}
                      iconBefore={<IconArrowLeft size="medium" />}
                    >
                      Kembali
                    </Button>
                    <Button
                      appearance="primary"
                      onClick={() => handleSubmitCatalogEWP(url)}
                      iconBefore={<Search size="medium" />}
                    >
                      Tampilkan
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ModalSelectSourceData;
