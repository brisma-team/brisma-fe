import {
  ButtonField,
  DatepickerField,
  ModalScroll,
  RadioField,
} from "@/components/atoms";
import {
  DataNotFound,
  ModalFooter,
  ModalHeader,
} from "@/components/molecules/commons";
import { useRelatedEWP } from "@/data/ewp/konsulting/overview";
import { useEffect, useState } from "react";
import CardFilterRelatedProjectNonPAT from "../overview/sub-modal/non-pat/CardFilterRelatedProjectNonPAT";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import _ from "lodash";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const ModalAddRelatedProject = ({
  showModal,
  data,
  handleCloseModal,
  handleClickRow,
  handleSubmit,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [objData, setObjData] = useState([]);
  const [filter, setFilter] = useState({
    date: "",
    project_name: "",
    project_id: "",
    ref_tipe: "",
    ref_jenis: "",
  });
  const [params, setParams] = useState({
    date: "",
    project_name: "",
    project_id: "",
    ref_tipe: "",
    ref_jenis: "",
  });

  const { relatedEWP } = useRelatedEWP(params);

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

  useEffect(() => {
    if (relatedEWP?.data?.length) {
      const mapping = relatedEWP?.data?.map((v) => {
        return {
          id: v?.id,
          ..._.pick(v, ["project_id", "project_name", "ref_tipe", "ref_jenis"]),
        };
      });
      setObjData(mapping);
    } else {
      setObjData([]);
    }
  }, [relatedEWP]);

  const handleChangeFilter = (property, value) => {
    setFilter({ ...filter, [property]: value });
  };

  const handleResetFilter = (property) => {
    setFilter({ ...filter, [property]: "" });
  };

  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Proyek Terkait"}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={<ModalFooter buttonText={"Simpan"} handleSubmit={handleSubmit} />}
    >
      <div className="w-[61rem]">
        <div className="w-full flex justify-between items-center my-3">
          <div className="w-full">
            <div className="flex w-full justify-between">
              <div className="flex gap-3">
                <div>
                  <DatepickerField
                    handleChange={(value) => handleChangeFilter("date", value)}
                    placeholder={"Pilih tanggal"}
                    value={filter?.date}
                  />
                </div>
                <div className="bg-atlasian-blue-light h-8 rounded flex items-center mt-1">
                  <ButtonField
                    text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
                    handler={() => setShowFilter(!showFilter)}
                  />
                </div>
              </div>
            </div>
            <CardFilterRelatedProjectNonPAT
              showFilter={showFilter}
              filter={filter}
              handleChange={handleChangeFilter}
              handleReset={handleResetFilter}
            />
          </div>
        </div>
        <TableTree>
          <Headers>
            <Header
              width="8%"
              className="border-x border-t rounded-ss-lg cell-custom-dataTables"
            >
              <div
                className={`custom-table-header justify-center text-sm font-semibold`}
              >
                AKSI
              </div>
            </Header>
            <Header
              width="45%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold">
                JUDUL PROYEK TERKAIT
              </div>
            </Header>
            <Header
              width="17%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold">
                PROJECT ID
              </div>
            </Header>
            <Header
              width="15%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold">
                TIPE
              </div>
            </Header>
            <Header
              width="15%"
              className="border-t border-r cell-custom-dataTables rounded-se-lg"
            >
              <div className="custom-table-header text-sm font-semibold">
                JENIS
              </div>
            </Header>
          </Headers>
          {objData?.length ? (
            <div className="overflow-y-scroll max-h-[29rem]">
              {
                <Rows
                  items={objData}
                  render={({
                    id,
                    project_name,
                    project_id,
                    ref_tipe,
                    ref_jenis,
                  }) => (
                    <Row>
                      <Cell width="8%" className={`border-x ${customCell}`}>
                        <div className="custom-table-position-center justify-center">
                          <RadioField
                            isChecked={data?.ref_ewp_id == id}
                            handleChange={() => handleClickRow(id)}
                          />
                        </div>
                      </Cell>
                      <Cell width="45%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center">
                          {project_name}
                        </div>
                      </Cell>
                      <Cell width="17%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center">
                          {project_id?.toUpperCase()}
                        </div>
                      </Cell>
                      <Cell width="15%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center">
                          {ref_tipe?.nama}
                        </div>
                      </Cell>
                      <Cell width="15%" className={`border-r ${customCell}`}>
                        <div className="custom-table-position-center">
                          {ref_jenis?.nama}
                        </div>
                      </Cell>
                    </Row>
                  )}
                />
              }{" "}
            </div>
          ) : (
            <div className="w-full border-x border-b pb-3">
              <DataNotFound />
            </div>
          )}
        </TableTree>
      </div>
    </ModalScroll>
  );
};

export default ModalAddRelatedProject;
