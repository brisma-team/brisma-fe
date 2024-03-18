import { Card, DivButton } from "@/components/atoms";
import { convertDate, convertToRupiah } from "@/helpers";
import { DropdownIcon } from "../commons";
import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";

const CardOtherSchedule = ({
  kegiatan_lain_id,
  type,
  title,
  maker,
  created_date,
  start_date,
  end_date,
  audit_period,
  jenis,
  tema,
  budget,
  pic,
  desc,
  handleClickInfo,
  handleClickUpdate,
  handleClickDelete,
}) => {
  const items = [
    {
      title: "Maker",
      description: maker,
    },
    {
      title: "Tanggal Inisiasi",
      description: convertDate(created_date, "-", "d"),
    },
    {
      title: "Durasi Proyek",
      description:
        convertDate(start_date, "-", "d") +
        " - " +
        convertDate(end_date, "-", "d"),
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
        <div className="w-full px-5 py-3">
          <div className="flex mb-4 justify-between items-end -ml-5 -mt-5">
            <div
              className={`text-base font-semibold rounded-tl-lg 
              ${
                type?.toLowerCase() === "individual"
                  ? "bg-blue-300 text-brisma"
                  : "bg-[#989898] text-white"
              } px-5 h-9 flex items-center justify-center`}
            >
              <p>{type}</p>
            </div>
            <div className="flex justify-between -mb-1.5">
              <DropdownIcon color={"blue"} />
            </div>
          </div>
          <div className="flex flex-row justify-between mb-3">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
          </div>
          <div className="leading-3">
            <TableTree>
              <Rows
                items={items}
                render={({ title, description }) => (
                  <div className="border">
                    <Row itemId={title}>
                      <Cell
                        width="50%"
                        className="font-bold border-r !min-h-0 !p-2"
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
              <p className="text-blue-600 font-semibold">PIC</p>
              {pic.map((v) => {
                return (
                  <p className="" key={v}>
                    {v}
                  </p>
                );
              })}
            </div>
            <div className="w-full h-[10rem] border-2 my-3 p-3 overflow-y-auto">
              <p className="font-semibold text-lg">Deskripsi</p>
              <p className="leading-5">{desc}</p>
            </div>
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardOtherSchedule;
