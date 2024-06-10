import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  confirmationSwal,
  downloadFromUrl,
  fetchApi,
  loadingSwal,
} from "@/helpers";
import {
  TableDokumen,
  CardFilterTableDokumen,
} from "@/components/molecules/ewp/common/wrapup";
import { useWrapup } from "@/data/ewp/common/wrapup";
import _ from "lodash";
import { useAuditInfo } from "@/data/ewp/common/info";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [filter, setFilter] = useState({
    start_date: "",
    date_date: "",
    doc_name: "",
    uploader: "",
  });
  const [paramsFilter, setParamsFilter] = useState({
    start_date: "",
    date_date: "",
    doc_name: "",
    uploader: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    const handleSearch = () => {
      setParamsFilter(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const { auditInfo, auditInfoMutate } = useAuditInfo({
    module: "qa",
    id: params?.id,
  });

  const { wrapup } = useWrapup({
    id: params?.id,
    module: "qa",
    ...paramsFilter,
  });

  useEffect(() => {
    const projectRealisasi = auditInfo?.data?.realisasi;
    setIsDisabled(
      Boolean(
        !(
          projectRealisasi?.Wrapup_Meeting_real_start &&
          !projectRealisasi?.Wrapup_Meeting_real_end
        )
      )
    );
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: "Berkas Dokumen",
        path: baseUrl + "/wrapup",
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    if (wrapup?.findAllDoc?.length) {
      const mapping = wrapup?.findAllDoc?.map((v, index) => {
        const { file_url, file_name, doc_name } = v;
        return {
          index,
          doc_id: v?.id,
          upload_date: v?.created_at,
          file_url,
          file_name,
          doc_name,
          uploader: `${v?.uploader?.pn} - ${v?.uploader?.nama}`,
        };
      });

      setData(mapping);
    } else {
      setData([]);
    }
  }, [wrapup]);

  const handleClickDocumentFile = () => {
    router.push(`${baseUrl}/dokumen`);
  };

  const handleClickWrapup = async () => {
    const confirm = await confirmationSwal(
      "Menutup Wrap-Up. Fitur Berkas Dokumen akan terkunci, tidak dapat menambah, merubah atau mengurangi lagi.",
      "Apa anda yakin? "
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/initiate/wrapup/close/${params?.id}`,
      {}
    );
    auditInfoMutate();
    loadingSwal("close");
  };

  // [ START ] handler for card filter
  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleResetFilter = (props) => {
    setFilter({ ...filter, [props]: "" });
  };
  // [ END ] handler for card filter

  // [ START ] handler for table
  const handleClickDownload = (url, fileName) => {
    loadingSwal();
    downloadFromUrl(url, fileName);
    loadingSwal("close");
  };
  // [ END ] handler for table

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Wrap-Up" />
      </div>
      <div className="w-36 bg-atlasian-blue-light rounded">
        <ButtonField
          handler={() => setShowFilter(!showFilter)}
          text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
        />
      </div>
      <div className="">
        <CardFilterTableDokumen
          data={filter}
          showFilter={showFilter}
          handleChange={handleChangeFilter}
          handleReset={handleResetFilter}
        />
      </div>
      {/* Start Content */}
      <div className="w-[50rem] mt-4">
        <Card>
          <div className="flex flex-col gap-4 px-6 pt-2 pb-4 w-full">
            <TableDokumen
              data={data}
              handleClickDownload={handleClickDownload}
            />
            <div className="w-full flex justify-end gap-3">
              <div className="w-36 rounded bg-atlasian-blue-light hover:bg-hover-blue">
                <ButtonField
                  text={`Berkas Dokumen`}
                  handler={handleClickDocumentFile}
                />
              </div>
              <div
                className={`w-36 rounded ${
                  isDisabled
                    ? `bg-atlasian-gray-light`
                    : `bg-atlasian-red hover:bg-hover-red`
                }`}
              >
                <ButtonField
                  text={`Wrap-Up`}
                  handler={handleClickWrapup}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
