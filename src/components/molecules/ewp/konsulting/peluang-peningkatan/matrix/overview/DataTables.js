import Link from "next/link";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import {
  DataNotFound,
  ButtonEdit,
  ButtonDelete,
} from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const DataTables = ({
  selectedId,
  data,
  handleClickEdit,
  handleClickDelete,
  handleClickAddMatrix,
}) => {
  return (
    <TableTree>
      <Headers>
        <Header
          width="7%"
          className="border-x border-t rounded-ss-lg cell-custom-dataTables"
        >
          <div
            className={`custom-table-header justify-center text-sm font-semibold`}
          >
            AKSI
          </div>
        </Header>
        <Header
          width="10%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            STATUS
          </div>
        </Header>
        <Header
          width="18%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            JUDUL PELUANG
          </div>
        </Header>
        <Header
          width="20%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            AUDITOR
          </div>
        </Header>
        <Header
          width="17%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            LINGKUP
          </div>
        </Header>
        <Header
          width="15%"
          className="border-t border-r cell-custom-dataTables"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            RISK
          </div>
        </Header>
        <Header
          width="13%"
          className="border-t border-r cell-custom-dataTables rounded-se-lg"
        >
          <div className="custom-table-header justify-center text-sm font-semibold">
            CONTROL
          </div>
        </Header>
      </Headers>
      {data?.length ? (
        <Rows
          items={data}
          render={({
            matrix_id,
            kkpt_id,
            status_persetujuan,
            judul_kkpt,
            auditor,
            risk_issue,
            lingkup,
            control,
          }) => (
            <Row>
              <Cell width="7%" className={`border-x ${customCell}`}>
                <div className="custom-table-position-center justify-center gap-1">
                  <ButtonIcon
                    icon={<ButtonEdit />}
                    handleClick={() => handleClickEdit(kkpt_id)}
                    color={"yellow"}
                  />
                  <ButtonIcon
                    icon={<ButtonDelete />}
                    handleClick={() => handleClickDelete(kkpt_id)}
                  />
                </div>
              </Cell>
              <Cell width="10%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <p
                    className={`text-sm ${
                      status_persetujuan === "Final"
                        ? "text-atlasian-green"
                        : status_persetujuan === "On Approver"
                        ? "text-atlasian-blue-light"
                        : "text-atlasian-yellow"
                    } font-semibold`}
                  >
                    {status_persetujuan || "N/A"}
                  </p>
                </div>
              </Cell>
              <Cell width="18%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  <Link
                    href={`/ewp/konsulting/overview/${selectedId}/peluang-peningkatan/${matrix_id}/overview/${kkpt_id}`}
                    className="text-sm underline"
                  >
                    {judul_kkpt || "N/A"}
                  </Link>
                </div>
              </Cell>
              <Cell width="20%" className={`border-r ${customCell}`}>
                <div className="custom-table-position-center justify-center">
                  {auditor?.nama || auditor?.name || "N/A"}
                </div>
              </Cell>
              <Cell width="17%" className={`border-r ${customCell}`}>
                <div
                  className={`custom-table-position-center ${
                    lingkup?.length ? "justify-start" : "justify-center"
                  }`}
                >
                  <p className="px-2">
                    {lingkup?.length
                      ? lingkup?.map((v, index) => (
                          <li key={index}>{v?.judul_lingkup_pemeriksaan}</li>
                        ))
                      : "N/A"}
                  </p>
                </div>
              </Cell>
              <Cell width="15%" className={`border-r ${customCell}`}>
                <div
                  className={`custom-table-position-center ${
                    risk_issue?.length ? "justify-start" : "justify-center"
                  }`}
                >
                  <p className="px-2">
                    {risk_issue?.length
                      ? risk_issue?.map((v, index) => (
                          <li key={index}>{v?.abbr + " - " + v?.nama}</li>
                        ))
                      : "N/A"}
                  </p>
                </div>
              </Cell>
              <Cell width="13%" className={`border-r ${customCell}`}>
                <div
                  className={`custom-table-position-center ${
                    control?.length ? "justify-start" : "justify-center"
                  }`}
                >
                  <p className="px-2">
                    {control?.length
                      ? control?.map((v, index) => (
                          <li key={index}>{v?.abbr + " - " + v?.nama}</li>
                        ))
                      : "N/A"}
                  </p>
                </div>
              </Cell>
            </Row>
          )}
        />
      ) : (
        <div className="w-full border-x border-b">
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
            text={"Tambah Peluang"}
            textColor={"purple"}
            handler={handleClickAddMatrix}
          />
        </div>
      </div>
    </TableTree>
  );
};

export default DataTables;
