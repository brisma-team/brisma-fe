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
const customHeader = `w-full h-full flex items-center text-brisma`;
const customCell = `cell-width-full-height-full cell-custom-dataTables`;
const positionCenter = `w-full h-full flex items-center`;

const TableProjectChecklist = ({ data }) => {
  return (
    <TableTree>
      <Headers>
        <Header width="20%" className="border-x border-t rounded-ss-xl">
          <div className={`${customHeader} justify-center text-center`}>
            Status
          </div>
        </Header>
        <Header
          width="80%"
          className="border-t border-r cell-custom-dataTables rounded-se-xl"
        >
          <div className={`${customHeader}`}>Syarat dan Ketentuan</div>
        </Header>
      </Headers>
      {data?.length ? (
        <div className="max-h-[18rem] overflow-y-scroll">
          <Rows
            items={[{ a: "test" }]}
            render={() => (
              <Row>
                <Cell width="20%" className={`border-x ${customCell}`}>
                  <div className={`${positionCenter} justify-center`}>
                    <ButtonIcon
                      icon={
                        <div className="rounded-full border border-atlasian-red w-5 h-5 flex items-center justify-center p-1">
                          <Image src={ImageClose} alt="" />
                        </div>
                      }
                    />
                  </div>
                </Cell>
                <Cell width="80%" className={`border-r ${customCell}`}>
                  <div className={`${positionCenter} text-xs`}>
                    MAPA Sudah Final
                  </div>
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
  );
};

export default TableProjectChecklist;
