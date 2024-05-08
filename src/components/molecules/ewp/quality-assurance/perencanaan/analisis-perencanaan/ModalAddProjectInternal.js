import {
  ButtonIcon,
  CloseModal,
  CustomCheckbox,
  CustomPagination,
  ModalScroll,
} from "@/components/atoms";
import { CustomSelect, DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import ModalFooter from "./ModalFooter";
import { getYearsList } from "@/helpers";
import { IconClose } from "@/components/icons";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const ModalAddProjectInternal = ({
  data,
  selectedData,
  selectedProject,
  showModal,
  filter,
  totalData,
  isDisabled,
  validation,
  handleChangePIC,
  handleResetPIC,
  handleCloseModal,
  handleSubmit,
  handleChangeCheckbox,
  handleChangeFilter,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      footer={
        <ModalFooter
          selectedData={selectedData}
          handleChange={handleChangePIC}
          handleReset={handleResetPIC}
          isDisabled={isDisabled}
          validation={validation}
          handleSubmit={handleSubmit}
        />
      }
    >
      <div className="w-[105rem] relative mt-0">
        <div className="flex justify-between">
          <div className="text-2xl font-semibold mb-2">{`[${
            selectedData?.orgeh_kode
          }][${
            selectedData?.branch_kode
          }] - ${selectedData?.branch_name?.toUpperCase()}`}</div>
          <CloseModal
            showModal={showModal}
            handleCloseModal={handleCloseModal}
          />
        </div>
        <div className="w-40 my-3">
          <CustomSelect
            optionValue={getYearsList()}
            placeholder="Tahun"
            customIcon={
              <ButtonIcon
                icon={<IconClose />}
                handleClick={() => handleChangeFilter("tahun", "")}
              />
            }
            handleChange={(e) => handleChangeFilter("tahun", e.value)}
            selectedValue={
              filter?.tahun
                ? {
                    label: filter?.tahun?.toString(),
                    value: filter?.tahun,
                  }
                : null
            }
          />
        </div>
        <div className="mt-3">
          <div className="dataTables-custom bg-white">
            <TableTree>
              <Headers>
                <Header
                  width="4%"
                  className="border-x border-t rounded-ss-xl cell-custom-dataTables"
                >
                  <div className="custom-table-header justify-center">Aksi</div>
                </Header>
                <Header
                  width="8%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className="custom-table-header">PROJECT ID</div>
                </Header>
                <Header
                  width="15%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>PROJECT NAME</div>
                </Header>
                <Header
                  width="9%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>MANAJER REVIEW</div>
                </Header>
                <Header
                  width="9%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>KETUA TIM REVIEW</div>
                </Header>
                <Header
                  width="9%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>
                    ANGGOTA TIM REVIEW
                  </div>
                </Header>
                <Header
                  width="8%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>JENIS</div>
                </Header>
                <Header
                  width="8%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>PERIODE PROYEK</div>
                </Header>
                <Header
                  width="6%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>STATUS PROYEK</div>
                </Header>
                <Header
                  width="9%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>
                    JUMLAH TEMUAN MAJOR
                  </div>
                </Header>
                <Header
                  width="9%"
                  className="border-t border-r cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>
                    JUMLAH TEMUAN MINOR
                  </div>
                </Header>
                <Header
                  width="6%"
                  className="border-t border-r rounded-se-xl cell-custom-dataTables"
                >
                  <div className={`custom-table-header`}>STATUS RPM</div>
                </Header>
              </Headers>
              {data?.length ? (
                <Rows
                  items={data}
                  render={({
                    ewp_id,
                    project_id,
                    project_name,
                    ma_review,
                    kta_review,
                    ata_review,
                    mtd_tipe,
                    mtd_jenis,
                    tahun,
                    periode_proyek,
                    status_proyek,
                    jumlah_temuan_major,
                    jumlah_temuan_minor,
                    status_rpm,
                  }) => (
                    <Row>
                      <Cell width="4%" className={`border-x ${customCell}`}>
                        <div className="custom-table-position-center justify-center">
                          <CustomCheckbox
                            value={
                              selectedProject?.length
                                ? selectedProject?.find(
                                    (project) =>
                                      project?.project_id === project_id
                                  )
                                : false
                            }
                            handleChange={(e) =>
                              handleChangeCheckbox(e.target.checked, {
                                ewp_id,
                                project_id,
                                project_name,
                                mtd_tipe,
                                mtd_jenis,
                                tahun,
                              })
                            }
                            isDisabled={
                              selectedProject?.length
                                ? selectedProject?.find(
                                    (project) =>
                                      project?.project_id === project_id
                                  )?.is_disabled
                                : false
                            }
                          />
                        </div>
                      </Cell>
                      <Cell width="8%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">{project_id?.toUpperCase()}</p>
                        </div>
                      </Cell>
                      <Cell width="15%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">{project_name}</p>
                        </div>
                      </Cell>
                      <Cell width="9%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          {ma_review?.length ? (
                            <ul className="list-disc w-full pl-2.5">
                              {ma_review?.map((v, i) => {
                                return (
                                  <li key={i} className="text-xs">
                                    {v?.pn} - {v?.nama}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </div>
                      </Cell>
                      <Cell width="9%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          {kta_review?.length ? (
                            <ul className="list-disc w-full pl-2.5">
                              {kta_review?.map((v, i) => {
                                return (
                                  <li key={i} className="text-xs">
                                    {v?.pn} - {v?.nama}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </div>
                      </Cell>
                      <Cell width="9%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          {ata_review?.length ? (
                            <ul className="list-disc w-full pl-2.5">
                              {ata_review?.map((v, i) => {
                                return (
                                  <li key={i} className="text-xs">
                                    {v?.pn} - {v?.nama}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </div>
                      </Cell>
                      <Cell width="8%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">{mtd_jenis?.nama || ""}</p>
                        </div>
                      </Cell>
                      <Cell width="8%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">{periode_proyek}</p>
                        </div>
                      </Cell>
                      <Cell width="6%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          <p
                            className={`text-xs ${
                              status_proyek === "final"
                                ? "text-atlasian-red"
                                : "text-atlasian-green"
                            }`}
                          >
                            {status_proyek === "final" ? "Closed" : "Open"}
                          </p>
                        </div>
                      </Cell>
                      <Cell width="9%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">{jumlah_temuan_major}</p>
                        </div>
                      </Cell>
                      <Cell width="9%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          <p className="text-xs">{jumlah_temuan_minor}</p>
                        </div>
                      </Cell>
                      <Cell width="6%" className={`border-r ${customCell} `}>
                        <div className="custom-table-position-center">
                          <p
                            className={`text-xs ${
                              status_rpm === "final"
                                ? "text-atlasian-red"
                                : "text-atlasian-green"
                            }`}
                          >
                            {status_rpm === "final" ? "Closed" : "Open"}
                          </p>
                        </div>
                      </Cell>
                    </Row>
                  )}
                />
              ) : (
                <div className="w-full border-x border-b py-4">
                  <DataNotFound />
                </div>
              )}
            </TableTree>
            <div className="w-full border rounded-ee-lg rounded-es-lg min-h-[2rem]">
              <div className="-mt-2 mb-4">
                <CustomPagination
                  perPage={7}
                  defaultCurrentPage={filter?.page || 1}
                  handleSetPagination={(start, end, pageNow) =>
                    handleChangeFilter("page", pageNow)
                  }
                  totalData={totalData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalAddProjectInternal;
