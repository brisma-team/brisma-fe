import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconPlus } from "@/components/icons";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import {
  ButtonEdit,
  ButtonDelete,
  DataNotFound,
} from "@/components/molecules/commons";

const UkaDataTables = ({
  data,
  handleClickAdd,
  handleClickDelete,
  handleClickUpdate,
  withoutButtonAction = false,
}) => {
  return (
    <div className="overflow-x-scroll max-w-[95rem] pb-3">
      <div className="w-[120rem] dataTables-custom overflow-x-auto">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="5%"
              className="border-t border-x cell-custom-dataTables flex justify-center"
            >
              Aksi
            </Header>
            <Header
              width="7%"
              className="border-t border-x cell-custom-dataTables justify-center"
            >
              Kode UKA
            </Header>
            <Header
              width="10%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              Nama UKA
            </Header>
            <Header
              width="13%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              Branch
            </Header>
            <Header
              width="15%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              Orgeh
            </Header>
            <Header
              width="9%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              Tipe Kantor Audit
            </Header>
            <Header
              width="5%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              Region
            </Header>
            <Header
              width="9%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              Alamat
            </Header>
            <Header
              width="9%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              No. Telp
            </Header>
            <Header
              width="9%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              Email
            </Header>
            <Header
              width="9%"
              className="border-t border-r cell-custom-dataTables justify-center"
            >
              Fax
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                kode,
                name,
                branch,
                branch_name,
                orgeh,
                orgeh_name,
                uka_type,
                region,
                alamat,
                no_telp,
                email,
                fax,
              }) => (
                <Row>
                  <Cell className="!hidden" />
                  <Cell
                    width="5%"
                    className="border-x cell-custom-dataTables flex justify-center"
                  >
                    {!withoutButtonAction ? (
                      <div className="flex justify-center items-center gap-1">
                        <ButtonIcon
                          icon={<ButtonEdit />}
                          handleClick={() => handleClickUpdate(kode)}
                          // isDisabled={true}
                          color={"yellow"}
                        />
                        <ButtonIcon
                          icon={<ButtonDelete />}
                          handleClick={() => handleClickDelete(kode)}
                          // isDisabled={true}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Cell>
                  <Cell
                    width="7%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {kode}
                  </Cell>
                  <Cell width="10%" className="border-r cell-custom-dataTables">
                    {name}
                  </Cell>
                  <Cell
                    width="13%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {branch + " - " + branch_name}
                  </Cell>
                  <Cell
                    width="15%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    <div className="flex gap-2">
                      {orgeh + " - " + orgeh_name}
                    </div>
                  </Cell>
                  <Cell
                    width="9%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {uka_type}
                  </Cell>
                  <Cell
                    width="5%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {region}
                  </Cell>
                  <Cell
                    width="9%"
                    className="border-r cell-custom-dataTables justify-center overflow-x-auto"
                  >
                    {alamat}
                  </Cell>
                  <Cell
                    width="9%"
                    className="border-r cell-custom-dataTables justify-center"
                  >
                    {no_telp}
                  </Cell>
                  <Cell
                    width="9%"
                    className="border-r cell-custom-dataTables justify-center overflow-x-auto"
                  >
                    {email}
                  </Cell>
                  <Cell width="9%" className="border-r cell-custom-dataTables">
                    {fax}
                  </Cell>
                </Row>
              )}
            />
          ) : (
            <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl py-4">
              <DataNotFound />
            </div>
          )}
        </TableTree>
        <div className="w-full border rounded-ee-lg rounded-es-lg min-h-[1.3rem]">
          {!withoutButtonAction ? (
            <div className="w-52 p-2 ">
              <ButtonField
                iconAfter={
                  <div className="text-atlasian-purple">
                    <IconPlus size="medium" />
                  </div>
                }
                text={"Tambah UKA"}
                textColor={"purple"}
                handler={handleClickAdd}
                // disabled={true}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default UkaDataTables;
