import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  confirmationSwal,
  downloadFromUrl,
  fetchApi,
  loadingSwal,
} from "@/helpers";
import {
  DataTables,
  CardFilterTable,
} from "@/components/molecules/ewp/konsulting/wrapup";
import { useWrapup } from "@/data/ewp/konsulting/wrapup";
import _ from "lodash";

const index = () => {
  const { id } = useRouter().query;
  const router = useRouter();
  const baseUrl = `/ewp/konsulting/overview/${id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    start_date: "",
    date_date: "",
    doc_name: "",
    uploader: "",
  });
  const [params, setParams] = useState({
    start_date: "",
    date_date: "",
    doc_name: "",
    uploader: "",
  });

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const { projectDetail } = useProjectDetail({ id });

  const { wrapup } = useWrapup({ id, ...params });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Berkas Dokumen`,
        path: baseUrl,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (wrapup?.findAllDoc?.length) {
      const mapping = wrapup?.findAllDoc?.map((v, index) => {
        const { file_url, file_name } = v;
        return {
          index,
          doc_id: v?.id,
          upload_date: v?.created_at,
          file_url,
          file_name,
          uploader: v?.uploader?.nama,
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/initiate/wrapup_meeting/close/${id}`,
      {}
    );
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
    <LandingLayoutEWPConsulting>
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
        <CardFilterTable
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
            <DataTables data={data} handleClickDownload={handleClickDownload} />
            <div className="w-full flex justify-end gap-3">
              <div className="w-36 rounded bg-atlasian-blue-light hover:bg-hover-blue">
                <ButtonField
                  text={`Berkas Dokumen`}
                  handler={handleClickDocumentFile}
                />
              </div>
              <div className="w-36 rounded bg-atlasian-red hover:bg-hover-red">
                <ButtonField text={`Wrap-Up`} handler={handleClickWrapup} />
              </div>
            </div>
          </div>
        </Card>
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
