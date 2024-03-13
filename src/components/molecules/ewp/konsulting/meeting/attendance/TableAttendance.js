import { ButtonIcon } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import { ImageClose } from "@/helpers/imagesUrl";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import Image from "next/image";
const customHeader = `w-full h-full flex items-center text-brisma font-semibold `;
const customCell = `cell-width-full-height-full cell-custom-dataTables`;
const positionCenter = `w-full h-full flex items-center text-xs`;

const TableAttendance = ({ data, handleDelete }) => {
  return (
    <div>
      <TableTree>
        <Headers>
          <Header width="7%" className="border-x border-t rounded-ss-xl">
            <div className={`${customHeader} justify-center text-center`}>
              Aksi
            </div>
          </Header>
          <Header
            width="28%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className={`${customHeader}`}>Nama Anggota</div>
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className={customHeader}>Tanggal Absen</div>
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables"
          >
            <div className={customHeader}>Jabatan</div>
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-custom-dataTables rounded-se-xl"
          >
            <div className={`${customHeader}`}>UKER</div>
          </Header>
        </Headers>
        {data?.length ? (
          <div className="max-h-[18rem] overflow-y-scroll">
            <Rows
              items={data}
              render={({ id, anggota, attendance_date, jabatan, uker }) => (
                <Row>
                  <Cell width="7%" className={`border-x ${customCell}`}>
                    <div className={`${positionCenter} justify-center`}>
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                            <Image src={ImageClose} alt="" />
                          </div>
                        }
                        handleClick={() => handleDelete(id)}
                      />
                    </div>
                  </Cell>
                  <Cell width="28%" className={`border-r ${customCell}`}>
                    <div className={`${positionCenter}`}>{anggota}</div>
                  </Cell>
                  <Cell width="15%" className={`border-r ${customCell}`}>
                    <div className={`${positionCenter}`}>{attendance_date}</div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell}`}>
                    <div className={`${positionCenter}`}>{jabatan}</div>
                  </Cell>
                  <Cell width="25%" className={`border-r ${customCell}`}>
                    <div className={`${positionCenter}`}>{uker}</div>
                  </Cell>
                </Row>
              )}
            />
          </div>
        ) : (
          <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
      {data?.length ? (
        <div className="w-full h-9 border-x border-b rounded-b-xl" />
      ) : (
        ""
      )}
    </div>
  );
};

export default TableAttendance;
