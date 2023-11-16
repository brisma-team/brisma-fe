import {
  Breadcrumbs,
  ButtonField,
  PageTitle,
  CustomPagination,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import {
  CardFilterOverview,
  CardOverview,
} from "@/components/molecules/reference/survey/overview";
import LayoutSurveyReference from "@/layouts/reference/LayoutSurveyReference";
import { useEffect, useState } from "react";
import _ from "lodash";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Reference", path: "/reference" },
  { name: "Form Survei", path: "/reference/survey/overview" },
];

const data = [
  {
    kode: "PR-2023-001",
    title: "Template Triwulan PR 2021",
    type: "Peer Review",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi velit urna, convallis eu semper in, tempus at nisl. Donec ornare egestas augue, quis venenatis neque pulvinar eu. In id diam consequat libero rhoncus congue. Ut vitae auctor lorem, in convallis leo. Morbi vestibulum finibus semper. Duis magna nisl, viverra quis purus vel, dapibus hendrerit purus. Mauris eu erat et mi eleifend facilisis nec id tortor. Vestibulum congue ligula aliquam lectus ornare aliquam. Pellentesque ex ante, congue sed erat in, vulputate dignissim tellus. Phasellus pellentesque molestie lobortis. ",
    createdBy: "Dandy",
    createdAt: "2022-10-10",
    approvalAt: "2022-10-10",
    bgColor: "bg-orange-200",
  },
  {
    kode: "PR-2025-002",
    title: "Template Triwulan PR 2021",
    type: "Peer Review",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi velit urna, convallis eu semper in, tempus at nisl. Donec ornare egestas augue, quis venenatis neque pulvinar eu. In id diam consequat libero rhoncus congue. Ut vitae auctor lorem, in convallis leo. Morbi vestibulum finibus semper. Duis magna nisl, viverra quis purus vel, dapibus hendrerit purus. Mauris eu erat et mi eleifend facilisis nec id tortor. Vestibulum congue ligula aliquam lectus ornare aliquam. Pellentesque ex ante, congue sed erat in, vulputate dignissim tellus. Phasellus pellentesque molestie lobortis. ",
    createdBy: "Dandy",
    createdAt: "2022-10-10",
    approvalAt: "2022-10-10",
    bgColor: "bg-orange-200",
  },
];

const index = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showModalCreateTemplate, setShowModalCreateTemplate] = useState(false);

  const [showModalConfirmEnable, setShowModalConfirmEnable] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalScore, setShowModalScore] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  const [selectedTemplateId, setSelectedTemplateId] = useState(0);

  const [filter, setFilter] = useState({
    kode: "",
    judul: "",
    nama_pembuat: "",
    status: "",
    jenis: "",
    tanggal_pembuatan: "",
    tanggal_approval: "",
    sort_by: "ASC",
    limit: 3,
    page: 1,
  });
  const [params, setParams] = useState({
    kode: "",
    judul: "",
    nama_pembuat: "",
    status: "",
    jenis: "",
    tanggal_pembuatan: "",
    tanggal_approval: "",
    sort_by: "ASC",
    limit: 3,
    page: 1,
  });

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      // overviewEWPMutate();
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const handleShowFilter = () => {
    setShowFilter((prev) => {
      return !prev;
    });
  };

  const handleChangeFilter = (props, value) => {
    setFilter((prev) => {
      return {
        ...prev,
        [props]: value,
      };
    });
  };

  const handleEnableTemplate = (kode) => {
    setShowModalConfirmEnable(true);
  };

  const handleDetailTemplate = (kode) => {
    setShowModalConfirmEnable(true);
  };

  const handleShowScore = (kode) => {
    setShowModalConfirmEnable(true);
  };

  const handleDeleteTemplate = (kode) => {
    setShowModalConfirmEnable(true);
  };

  return (
    <LayoutSurveyReference>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Template Kuesioner Overview"} />
      </div>
      <div className="flex items-end gap-4">
        {/* Start Filter */}
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 rounded bg-atlasian-blue-light">
            <ButtonField
              handler={handleShowFilter}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-36 rounded bg-atlasian-purple">
            <ButtonField
              handler={() => setShowModalCreateTemplate(true)}
              text={"Buat Template"}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <CardFilterOverview
          showFilter={showFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="w-full flex items-end justify-end">
        <SelectSortFilter change={handleChangeFilter} />
      </div>
      {/* Start Content */}
      {!data ? (
        <DataNotFound />
      ) : (
        data?.length && (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-0.5 py-4">
            {data.map((v, i) => {
              return (
                <CardOverview
                  key={i}
                  kode={v.kode}
                  title={v.title}
                  type={v.type}
                  desc={v.desc}
                  createdAt={v.createdAt}
                  createdBy={v.createdBy}
                  approvalAt={v.approvalAt}
                  bgColor={v.bgColor}
                  handleEnableTemplate={handleEnableTemplate}
                  handleDetailTemplate={handleDetailTemplate}
                  handleShowScore={handleShowScore}
                  handleDeleteTemplate={handleDeleteTemplate}
                />
              );
            })}
          </div>
        )
      )}
      <CustomPagination
        perPage={filter.limit}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        defaultCurrentPage={1}
        totalData={data?.length}
      />
      {/* End Content */}
    </LayoutSurveyReference>
  );
};

export default index;
