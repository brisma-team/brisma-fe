import { ButtonDelete, DataNotFound } from "@/components/molecules/commons";
import {
  ButtonField,
  ButtonIcon,
  ErrorValidation,
  TextInput,
} from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { ImageCircleCheckGreen } from "@/helpers/imagesUrl";
import Image from "next/image";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TableRelatedProject = ({
  data,
  payload,
  validation,
  withoutButton,
  handleChangeText,
  handleClickAddRow,
  handleClickSave,
  handleClickDelete,
}) => {
  return (
    <div className="w-full bg-white">
      <TableTree>
        <Headers>
          <Header
            width="10%"
            className="border-x border-t rounded-ss-xl cell-custom-dataTables"
          >
            <div className="custom-table-header justify-center">Aksi</div>
          </Header>
          <Header
            width="45%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className={`custom-table-header`}>PROJECT ID</div>
          </Header>
          <Header
            width="45%"
            className="border-t border-r rounded-se-xl cell-custom-dataTables"
          >
            <div className={`custom-table-header`}>PROJECT NAME</div>
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({ project_id, project_name, is_new }) => (
              <Row>
                <Cell width="10%" className={`border-x ${customCell}`}>
                  <div className="custom-table-position-center justify-center">
                    {!withoutButton ? (
                      <div className="flex justify-between items-center gap-1.5">
                        {is_new ? (
                          <ButtonIcon
                            icon={
                              <Image
                                src={ImageCircleCheckGreen}
                                alt=""
                                width={22}
                                height={22}
                              />
                            }
                            handleClick={() => handleClickSave(project_id)}
                          />
                        ) : (
                          ""
                        )}
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={() => handleClickDelete(project_id)}
                          color={"red"}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Cell>
                <Cell width="45%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center relative">
                    {is_new ? (
                      <div className="w-full">
                        <TextInput
                          value={payload?.project_id}
                          onChange={(e) =>
                            handleChangeText("project_id", e.target.value)
                          }
                        />
                        {validation?.project_id ? (
                          <ErrorValidation
                            message={validation?.project_id}
                            className={"mt-2"}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <p className="text-xs">{project_id}</p>
                    )}
                  </div>
                </Cell>
                <Cell width="45%" className={`border-r ${customCell} `}>
                  <div className="custom-table-position-center">
                    {is_new ? (
                      <div className="w-full">
                        <TextInput
                          value={payload?.project_name}
                          onChange={(e) =>
                            handleChangeText("project_name", e.target.value)
                          }
                        />
                        {validation?.project_name ? (
                          <ErrorValidation
                            message={validation?.project_name}
                            className={"mt-2"}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <p className="text-xs">{project_name}</p>
                    )}
                  </div>
                </Cell>
              </Row>
            )}
          />
        ) : (
          <div className="w-full border-x border-b pb-4">
            <DataNotFound />
          </div>
        )}
        <div className="border-x border-b rounded-b-lg w-full py-3 px-4 flex justify-end">
          {!withoutButton ? (
            <div className="w-fit text-sm font-semibold">
              <ButtonField
                iconAfter={
                  <div className="text-atlasian-purple">
                    <IconPlus size="medium" />
                  </div>
                }
                text={"Tambah Project Terkait"}
                textColor={"purple"}
                handler={() => handleClickAddRow()}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </TableTree>
    </div>
  );
};

export default TableRelatedProject;
