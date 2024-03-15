import { Card, DivButton } from "@/components/atoms";
import { convertDate, convertToRupiah } from "@/helpers";
import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";
import { DropdownIcon } from "../commons";
import ProgressBar from "@atlaskit/progress-bar";

const CardActivitySchedule = ({
  jadwal_sbp_id,
  type,
  title,
  jenis,
  maker,
  createdDate,
  start_date,
  end_date,
  budget,
  pic,
  tema,
  desc,
  handleClickInfo,
  handleClickUpdate,
  handleClickDelete,
  progress,
  percent,
  surveyTerkait,
}) => {
  const projectItems = [
    {
      title: "Maker",
      description: maker,
    },
    {
      title: "Tanggal Inisiasi",
      description: convertDate(createdDate, "-", "d"),
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
        <div className="w-full px-5 py-3">
          <div className="flex mb-2 justify-between items-end -ml-5 -mt-5">
            <div
              className={`text-base font-semibold rounded-tl-lg text-white ${
                type?.toLowerCase() === "konsulting"
                  ? "bg-cyan-500"
                  : type?.toLowerCase() === "review"
                  ? "bg-orange-300 "
                  : "bg-sky-500"
              } px-5 h-9 flex items-center justify-center`}
            >
              <p>{type}</p>
            </div>
            <div className="flex justify-between -mb-1.5">
              <DropdownIcon color={"blue"} />
            </div>
          </div>
          <div className="flex flex-col justify-between my-3">
            <div className="text-2xl font-bold text-atlasian-blue-dark">
              {title}
            </div>
            <div className="text-xl font-bold text-neutral-900">{desc}</div>
          </div>
          <div className="flex flex-row justify-between leading-3 my-3 items-center">
            <ProgressBar appearance="success" value={100} />
            <div className="flex justify-end font-medium text-sm ml-3 text-blue-500">
              100%
            </div>
          </div>
          <div className="leading-3">
            <TableTree>
              <Rows
                items={projectItems}
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
          </div>
        </div>
      </Card>
    </DivButton>
  );
};

export default CardActivitySchedule;
