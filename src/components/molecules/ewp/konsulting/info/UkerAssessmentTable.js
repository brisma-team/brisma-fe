import { ButtonField, ButtonIcon } from "@/components/atoms";
import {
  IconAttachment,
  IconClose,
  IconPlus,
  IconQuestions,
} from "@/components/icons";
import {
  BranchSelect,
  ButtonDelete,
  ButtonEdit,
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

const UkerAssessmentTable = ({
  data,
  payload,
  handleChange,
  handleReset,
  handleClickSave,
  handleClickEdit,
  handleClickDelete,
  handleClickAddUkerAssessment,
  handleClickAssessmentInformation,
  handleClickDescription,
  handleClickAttachment,
}) => {
  return (
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
          width="28%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            BRANCH
          </div>
        </Header>
        <Header
          width="28%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">ORGEH</div>
        </Header>
        <Header
          width="22%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header text-sm font-semibold">
            TIPE UKER
          </div>
        </Header>
        <Header
          width="14%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            INFORMASI
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({
            index,
            uker_id,
            branch,
            orgeh,
            uker_type,
            is_new,
            is_edit,
          }) => (
            <Row>
              <Cell width="8%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center justify-center gap-1">
                  {is_new ? (
                    <ButtonIcon
                      icon={<ButtonSave />}
                      handleClick={async () => await handleClickSave(false)}
                    />
                  ) : is_edit ? (
                    <>
                      <ButtonIcon
                        icon={<ButtonSave />}
                        handleClick={async () =>
                          await handleClickSave(true, uker_id)
                        }
                      />
                      <ButtonIcon
                        icon={<ButtonDelete />}
                        handleClick={() => handleClickDelete(uker_id)}
                      />
                    </>
                  ) : (
                    <>
                      <ButtonIcon
                        icon={<ButtonEdit />}
                        handleClick={() => handleClickEdit(index)}
                      />
                      <ButtonIcon
                        icon={<ButtonDelete />}
                        handleClick={() => handleClickDelete(uker_id)}
                      />
                    </>
                  )}
                </div>
              </Cell>
              <Cell width="28%" className={`border-r ${customCell}`}>
                <div className="cell-custom-dataTables-padding-0">
                  {is_new || is_edit ? (
                    <BranchSelect
                      customIcon={
                        <ButtonIcon
                          icon={<IconClose />}
                          handleClick={() => handleReset("branch")}
                        />
                      }
                      handleChange={(e) => handleChange("branch", e?.value)}
                      selectedValue={
                        payload?.branch?.branch_kode
                          ? {
                              label: payload?.branch?.branch_name,
                              value: payload?.branch,
                            }
                          : null
                      }
                      placeholder={"Pilih Branch"}
                    />
                  ) : (
                    <p className="text-base">{`${branch?.branch_kode} - ${branch?.branch_name}`}</p>
                  )}
                </div>
              </Cell>
              <Cell width="28%" className={`border-r ${customCell}`}>
                <div className="cell-custom-dataTables-padding-0">
                  {is_new || is_edit ? (
                    <OrgehSelect
                      customIcon={
                        <ButtonIcon
                          icon={<IconClose />}
                          handleClick={() => handleReset("orgeh")}
                        />
                      }
                      handleChange={(e) => handleChange("orgeh", e?.value)}
                      selectedValue={
                        payload?.orgeh?.orgeh_kode
                          ? {
                              label: payload?.orgeh?.orgeh_name,
                              value: payload?.orgeh,
                            }
                          : null
                      }
                      placeholder={"Pilih Orgeh"}
                    />
                  ) : (
                    <p className="text-base">{`${orgeh?.orgeh_kode} - ${orgeh?.orgeh_name}`}</p>
                  )}
                </div>
              </Cell>
              <Cell width="22%" className={`border-r ${customCell}`}>
                {is_new || is_edit ? (
                  <UkerTypeSelect
                    handleChange={(e) => handleChange("tipe_uker", e?.value)}
                    selectedValue={payload?.tipe_uker || null}
                    width={"w-full"}
                    placeholder={"Pilih Tipe Uker"}
                  />
                ) : (
                  <p className="text-base">{uker_type?.name?.toUpperCase()}</p>
                )}
              </Cell>
              <Cell width="14%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center gap-2">
                  <ButtonIcon
                    color={"blue"}
                    icon={<IconQuestions />}
                    handleClick={() => handleClickDescription(index)}
                  />
                  {/* <ButtonIcon
                    icon={<IconInfo />}
                    color={"blue"}
                    handleClick={() =>
                      handleClickAssessmentInformation(uker_id)
                    }
                  /> */}
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
            handler={handleClickAddUkerAssessment}
          />
        </div>
      </div>
    </TableTree>
  );
};

export default UkerAssessmentTable;
