import { ButtonField, ButtonIcon } from "@/components/atoms";
import {
  IconAttachment,
  IconClose,
  IconInfo,
  IconPlus,
  IconQuestions,
} from "@/components/icons";
import {
  BranchSelect,
  ButtonDelete,
  ButtonSave,
  DataNotFound,
  OrgehSelect,
  UkerTypeSelect,
} from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const UkerInfoTable = ({
  data,
  handleChange,
  handleReset,
  handleClickSave,
  handleClickDelete,
  handleClickAddMatrix,
  handleClickAssessmentInformation,
  handleClickDescription,
  handleClickAttachment,
}) => {
  return (
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
          width="25%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            BRANCH
          </div>
        </Header>
        <Header
          width="25%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            ORGEH
          </div>
        </Header>
        <Header
          width="20%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            TIPE UKER
          </div>
        </Header>
        <Header
          width="20%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header text-sm font-semibold">
            INFORMASI
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({ uker_id, branch, orgeh, uker_type, is_new }) => (
            <Row>
              <Cell width="10%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center justify-center gap-1">
                  {is_new ? (
                    <ButtonIcon
                      icon={<ButtonSave />}
                      handleClick={handleClickSave}
                    />
                  ) : (
                    <ButtonIcon
                      icon={<ButtonDelete />}
                      handleClick={() => handleClickDelete(uker_id)}
                    />
                  )}
                </div>
              </Cell>
              <Cell width="45%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center">
                  {is_new ? (
                    <BranchSelect
                      customIcon={
                        <ButtonIcon
                          icon={<IconClose />}
                          handleClick={() => handleReset("branch")}
                        />
                      }
                      handleChange={(e) => handleChange("branch", e?.value)}
                      selectedValue={
                        branch?.branch_kode
                          ? { label: branch?.branch_name, value: branch }
                          : null
                      }
                    />
                  ) : (
                    <p className="text-base">{`${branch?.branch_kode} - ${branch?.branch_name}`}</p>
                  )}
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {is_new ? (
                    <OrgehSelect
                      customIcon={
                        <ButtonIcon
                          icon={<IconClose />}
                          handleClick={() => handleReset("orgeh")}
                        />
                      }
                      handleChange={(e) => handleChange("orgeh", e?.value)}
                      selectedValue={
                        orgeh?.orgeh_kode
                          ? { label: orgeh?.orgeh_name, value: orgeh }
                          : null
                      }
                    />
                  ) : (
                    <p className="text-base">{`${orgeh?.orgeh_kode} - ${orgeh?.orgeh_name}`}</p>
                  )}
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {is_new ? (
                    <UkerTypeSelect
                      handleChange={(e) =>
                        handleChange("uker_type", {
                          kode: e?.value,
                          name: e?.label,
                        })
                      }
                      selectedValue={
                        uker_type?.kode
                          ? { label: uker_type?.name, value: uker_type?.kode }
                          : null
                      }
                    />
                  ) : (
                    <p className="text-base">{uker_type?.name}</p>
                  )}
                </div>
              </Cell>
              <Cell width="30%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center gap-4">
                  <ButtonIcon
                    color={"blue"}
                    icon={<IconQuestions />}
                    handleClick={() => handleClickDescription(uker_id)}
                  />
                  <ButtonIcon
                    icon={<IconInfo />}
                    color={"blue"}
                    handleClick={() =>
                      handleClickAssessmentInformation(uker_id)
                    }
                  />
                  <ButtonIcon
                    color={"blue"}
                    icon={<IconAttachment />}
                    handleClick={() => handleClickAttachment(uker_id)}
                  />
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
      <div className="flex justify-end w-full border-x border-b rounded-es-xl rounded-ee-xl">
        <div className="w-48 text-sm font-semibold p-2 my-1">
          <ButtonField
            iconAfter={
              <div className="text-atlasian-purple">
                <IconPlus size="medium" />
              </div>
            }
            text={"Tambah UKER"}
            textColor={"purple"}
            handler={handleClickAddMatrix}
          />
        </div>
      </div>
    </TableTree>
  );
};

export default UkerInfoTable;
