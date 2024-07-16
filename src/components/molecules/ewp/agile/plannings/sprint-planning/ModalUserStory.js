import { CustomCheckbox, ModalScroll } from "@/components/atoms";
import {
  DataNotFound,
  ModalFooter,
  ModalHeader,
} from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const ModalUserStory = ({
  showModal,
  data,
  payload,
  withoutButton,
  handleChangeChecbox,
  handleCloseModal,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          headerText={"Tambah User Story"}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={<ModalFooter handleSubmit={handleSubmit} />}
    >
      <div className="w-[70rem]">
        <TableTree>
          <Headers>
            <Header
              width="10%"
              className="border-x border-t rounded-ss-lg cell-custom-dataTables"
            >
              <div
                className={`custom-table-header justify-center text-sm font-semibold`}
              >
                AKSI
              </div>
            </Header>
            <Header
              width="40%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header text-sm font-semibold">
                USER STORY
              </div>
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <div>
                  <div className="text-sm font-bold">DOR</div>
                  <div className="text-xs italic">(DEFINITION OF READY)</div>
                </div>
              </div>
            </Header>
            <Header
              width="25%"
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header">
                <div>
                  <div className="text-sm font-bold">DOD</div>
                  <div className="text-xs italic">(DEFINITION OF DONE)</div>
                </div>
              </div>
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                id,
                user_story,
                definition_of_ready,
                definition_of_done,
              }) => (
                <Row>
                  <Cell width="10%" className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center gap-1">
                      {!withoutButton ? (
                        <CustomCheckbox
                          value={payload?.find(
                            (user_story_id) => user_story_id === id
                          )}
                          handleChange={(e) =>
                            //   console.log("isChecked => ", e.target.checked)
                            handleChangeChecbox(e.target.checked, id)
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Cell>
                  <Cell width="40%" className={`border-r ${customCell}`}>
                    <div className="cell-custom-dataTables-padding-0">
                      <p>
                        <span className="font-bold">{user_story?.abbr}</span>
                        {" - "}
                        {user_story?.nama}
                      </p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell}`}>
                    <div className="cell-custom-dataTables-padding-0">
                      <p className="text-base">{definition_of_ready || "-"}</p>
                    </div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell}`}>
                    <div className="cell-custom-dataTables-padding-0">
                      <p className="text-base">{definition_of_done || "-"}</p>
                    </div>
                  </Cell>
                </Row>
              )}
            />
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

export default ModalUserStory;
