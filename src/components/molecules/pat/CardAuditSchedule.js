import { Card, DivButton } from "@/components/atoms";
import { convertToRupiah } from "@/helpers";
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
      description: start_date,
    },
    {
      title: "Durasi Proyek",
      description: "-",
    },
    {
      title: "Rentang Waktu",
      description: "-",
    },
    {
      title: "Jenis Proyek",
      description: "-",
    },
    {
      title: "Tema Proyek",
      description: "-",
    },
    {
      title: "Anggaran",
      description: `Rp. ${convertToRupiah(budget)}`,
    },
  ];
  const documentItems = [
    {
      title: "Project Status",
      description: "-",
    },
    {
      title: "Document Status",
      description: "-",
    },
    {
      title: "Document Status",
      description: `-`,
    },
  ];
  return (
    <DivButton
      className="hover:bg-gray-100 hover:rounded-[10px] hover:no-underline"
      handleClick={() => console.log("test")}
    >
      <Card>
        <div className="w-full px-4 py-2">
          <div className="flex mb-2 justify-between items-end -ml-4 -mt-4">
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
          <div className="flex flex-row justify-between my-6">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <TableTree>
              <Rows
                items={projectItems}
                render={({ title, description }) => (
                  <div className="border">
                    <Row itemId={title}>
                      <Cell width="50%" className="font-bold border-r">
                        {title}
                      </Cell>
                      <Cell width="50%">{description}</Cell>
                    </Row>
                  </div>
                )}
              />
            </TableTree>
            <div className="w-full h-[10rem] border-2 my-3 p-3 overflow-y-scroll">
              <p className="font-semibold text-lg">Pelaksana</p>
              <p className="text-blue-600 font-semibold">Tim Audit</p>
              <p className="">Tim Auditor HO BRI 2</p>
            </div>
            <TableTree>
              <Rows
                items={documentItems}
                render={({ title, description }) => (
                  <div className="border">
                    <Row itemId={title}>
                      <Cell width="50%" className="font-bold border-r">
                        {title}
                      </Cell>
                      <Cell
                        width="50%"
                        className={`${
                          description.toLowerCase() === "on progress" &&
                          title === "Project Status"
                            ? "text-blue-500"
                            : "text-orange-300"
                        }`}
                      >
                        {description}
                      </Cell>
                    </Row>
                  </div>
                )}
              />
            </TableTree>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardAuditSchedule;
