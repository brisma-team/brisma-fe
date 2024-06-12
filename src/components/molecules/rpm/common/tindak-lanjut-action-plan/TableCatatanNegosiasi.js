import { CardContentHeaderFooter } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { convertDate } from "@/helpers";
import { ButtonIcon, LozengeField } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import { IconChevronUp, IconChevronDown } from "@/components/icons";
import { useState } from "react";

const TableCatatanNegosiasi = ({ data }) => {
  const [showTable, setShowTable] = useState(true);
  return (
    <CardContentHeaderFooter
      header={
        <div className="h-12 flex justify-between items-center px-3">
          <div className="font-semibold text-base">Catatan Negosiasi</div>
          <ButtonIcon
            handleClick={() => setShowTable(!showTable)}
            icon={showTable ? <IconChevronUp /> : <IconChevronDown />}
          />
        </div>
      }
    >
      <div className="p-4">
        {showTable ? (
          <TableTree>
            <Headers>
              <Header className="!hidden" />
              <Header
                width="15%"
                className="border-t border-x cell-custom-dataTables justify-center rounded-ss-lg"
              >
                <p className="font-bold text-brisma">TANGGAL KEJADIAN</p>
              </Header>
              <Header
                width="30%"
                className="border-t border-x cell-custom-dataTables"
              >
                <p className="font-bold text-brisma">ACTION PLAN</p>
              </Header>
              <Header
                width="15%"
                className="border-t border-r cell-custom-dataTables justify-center"
              >
                <p className="font-bold text-brisma">DEADLINE</p>
              </Header>
              <Header
                width="20%"
                className="border-t border-r cell-custom-dataTables justify-center"
              >
                <p className="font-bold text-brisma">EVALUASI</p>
              </Header>
              <Header
                width="20%"
                className="border-t border-r cell-custom-dataTables justify-center rounded-se-lg"
              >
                <p className="font-bold text-brisma">NEGOSIASI</p>
              </Header>
            </Headers>
            {data?.length ? (
              <Rows
                items={data}
                render={({
                  tanggal_kejadian,
                  action_plan,
                  deadline,
                  evaluasi,
                  negosiasi,
                }) => (
                  <Row>
                    <Cell className="!hidden" />
                    <Cell
                      width="15%"
                      className="border-x cell-custom-dataTables flex justify-center"
                    >
                      {tanggal_kejadian
                        ? convertDate(tanggal_kejadian, "/", "d")
                        : ""}
                    </Cell>
                    <Cell
                      width="30%"
                      className="border-r cell-custom-dataTables"
                    >
                      {action_plan}
                    </Cell>
                    <Cell
                      width="15%"
                      className="border-r cell-custom-dataTables justify-center"
                    >
                      {deadline ? convertDate(deadline, "/", "d") : ""}
                    </Cell>
                    <Cell
                      width="20%"
                      className="border-r cell-custom-dataTables justify-center"
                    >
                      <LozengeField appreance="default">
                        {evaluasi}
                      </LozengeField>
                    </Cell>
                    <Cell
                      width="20%"
                      className="border-r cell-custom-dataTables justify-center"
                    >
                      {negosiasi || ""}
                    </Cell>
                  </Row>
                )}
              />
            ) : (
              <div className="w-full border-x border-b pb-3 rounded-es-lg rounded-ee-lg">
                <DataNotFound />
              </div>
            )}
          </TableTree>
        ) : (
          ""
        )}
      </div>
    </CardContentHeaderFooter>
  );
};

export default TableCatatanNegosiasi;
