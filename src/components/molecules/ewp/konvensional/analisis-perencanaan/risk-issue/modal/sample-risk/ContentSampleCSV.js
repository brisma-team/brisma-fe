import { ButtonIcon, CheckboxField } from "@/components/atoms";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconEdit } from "@/components/icons";
import { DataNotFound } from "@/components/molecules/commons";

const ContentSampleCSV = ({ data, setCurrentModalStage }) => {
  const payloadRiskIssue = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadRiskIssue
  );
  useEffect(() => {
    setCurrentModalStage(1);
  }, []);

  const customHeader = `w-full h-full flex items-center text-brisma font-bold`;
  const customCell = `cell-width-full-height-full cell-custom-dataTables`;
  const positionCenter = `w-full h-full flex justify-center items-center`;

  return (
    <div className="w-full p-4 overflow-y-scroll max-h-[40rem]">
      <TableTree>
        <Headers>
          <Header width="13%" className="border-x border-t rounded-ss-xl">
            <div className={`${customHeader} justify-center text-center`}>
              Aksi
            </div>
          </Header>
          <Header width="57%" className="border-t border-r">
            <div className={customHeader}>Nama File Sample</div>
          </Header>
          <Header width="15%" className="border-t border-r">
            <div className={`${customHeader} justify-center text-center`}>
              Jumlah Baris
            </div>
          </Header>
          <Header width="15%" className="border-t border-r rounded-se-xl">
            <div className={`${customHeader} justify-center text-center`}>
              Jumlah Sample
            </div>
          </Header>
        </Headers>
        {data?.length ? (
          <Rows
            items={data}
            render={({ directory, filename, jumlah_baris, jumlah_sample }) => (
              <Row>
                <Cell width="13%" className={`border-x ${customCell}`}>
                  <div className="flex gap-0.5 -ml-2.5">
                    <CheckboxField />
                    <ButtonIcon
                      icon={<IconEdit size="medium" />}
                      color="yellow"
                    />
                  </div>
                </Cell>
                <Cell width="57%" className={`border-r ${customCell}`}>
                  <p className="text-xs">{filename}</p>
                </Cell>
                <Cell width="15%" className={`border-r ${customCell}`}>
                  <p className="text-xs">{jumlah_baris}</p>
                </Cell>
                <Cell width="15%" className={`border-r ${customCell}`}>
                  <p className="text-xs">{jumlah_sample}</p>
                </Cell>
              </Row>
            )}
          />
        ) : (
          <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
            <DataNotFound />
          </div>
        )}
      </TableTree>
    </div>
  );
};

export default ContentSampleCSV;
