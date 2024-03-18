import { Card, DivButton } from "@/components/atoms";
import { convertDate, convertToRupiah } from "@/helpers";
import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";
import { DropdownIcon } from "../commons";

const CardAuditSchedule = ({
  jadwal_id,
  type,
  title,
  maker,
  audit_team,
  start_date,
  end_date,
  jenis,
  budget,
  audit_type,
  tema,
  desc,
  handleClickInfo,
  handleClickUpdate,
  handleClickDelete,
}) => {
  const projectItems = [
    {
      title: "Maker",
      description: maker,
    },
    {
      title: "Tanggal Inisiasi",
      description: convertDate(start_date, "-", "d"),
    },
    {
      title: "Durasi Proyek",
      description: convertDate(start_date, "-", "d") + " - " + convertDate(end_date, "-", "d"),
    },
    {
      title: "Jenis Proyek",
      description: jenis,
    },
    {
      title: "Tema Proyek",
      description: tema,
    },
    {
      title: "Anggaran",
      description: `Rp. ${convertToRupiah(budget)}`,
    },
  ];
  return (
    <DivButton
      className="hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
      handleClick={() => console.log("test")}
    >
      <Card>
        <div className="w-full px-4 py-2">
          <div className="flex mb-2 justify-between items-end -ml-4 -mr-1 -mt-4">
            <div
              className={`text-base font-semibold rounded-tl-lg text-white ${
                type?.toLowerCase() === "individual"
                  ? "bg-violet-500"
                  : "bg-orange-400"
              } px-5 h-9 flex items-center justify-center`}
            >
              <p>{type}</p>
            </div>
            <div className="flex justify-between -mb-1.5">
              <DropdownIcon color={"blue"} />
            </div>
          </div>
          <div className="flex flex-row justify-between my-4">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <TableTree>
              <Rows
                items={projectItems}
                render={({ title, description }) => (
                  <div className="border p-0">
                    <Row itemId={title}>
                      <Cell
                        width="50%"
                        className="font-bold border-r !p-2 !min-h-0"
                      >
                        {title}
                      </Cell>
                      <Cell width="50%" className="!min-h-0 !p-2">
                        {description}
                      </Cell>
                    </Row>
                  </div>
                )}
              />
            </TableTree>
            <div className="w-full h-[10rem] border-2 my-3 p-2 overflow-y-auto">
              <p className="font-semibold text-lg">Pelaksana</p>
              <p className="text-blue-600 font-semibold">Tim Audit</p>
              <p className="">{audit_team}</p>
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardAuditSchedule;
