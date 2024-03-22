import { Card } from "@/components/atoms";
import { convertDate, convertToRupiah } from "@/helpers";
import TableTree, { Cell, Row, Rows } from "@atlaskit/table-tree";

const InfoPAT = ({ data }) => {
  const projectItems = [
    {
      title: "Maker",
      description: data?.maker,
    },
    {
      title: "Tanggal Inisiasi",
      description: convertDate(data?.createdDate, "/", "d"),
    },
    {
      title: "Durasi Proyek",
      description:
        convertDate(data?.start_date, "/", "d") +
        " - " +
        convertDate(data?.end_date, "/", "d"),
    },
    {
      title: "Jenis Proyek",
      description: data?.jenis,
    },
    {
      title: "Tema Proyek",
      description: data?.tema || "-",
    },
    {
      title: "Anggaran",
      description: `Rp. ${convertToRupiah(data?.budget)}`,
    },
  ];
  return (
    <div className="w-[28rem]">
      <Card>
        <div className="w-full px-5 py-3">
          <div className="flex mb-2 justify-between items-end -ml-[22px] -mt-[22px]">
            <div
              className={`text-base font-semibold rounded-tl-lg text-white ${
                data?.type?.toLowerCase() === "konsulting"
                  ? "bg-cyan-500"
                  : data?.type?.toLowerCase() === "review"
                  ? "bg-orange-300 "
                  : "bg-sky-500"
              } px-5 h-9 flex items-center justify-center`}
            >
              <p>{data?.type}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between my-3">
            <div className="text-2xl font-bold text-atlasian-blue-dark">
              {data?.title}
            </div>
            <div className="text-xl font-bold text-neutral-900">
              {data?.desc}
            </div>
          </div>
          {/* <div className="flex flex-row justify-between leading-3 my-3 items-center">
            <ProgressBar appearance="success" value={data?.progress} />
            <div className="flex justify-end font-medium text-sm ml-3 text-blue-500">
              {data?.percent}
            </div>
          </div> */}
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
              {data?.pic.map((v) => {
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
    </div>
  );
};

export default InfoPAT;
