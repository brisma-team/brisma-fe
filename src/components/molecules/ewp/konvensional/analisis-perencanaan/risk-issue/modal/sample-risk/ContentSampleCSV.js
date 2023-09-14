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

const ContentSampleCSV = ({ data, setCurrentModalStage }) => {
  const payloadRiskIssue = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadRiskIssue
  );
  useEffect(() => {
    setCurrentModalStage(1);
  }, []);

  // const data = [
  //   {
  //     sample_name: "Sampling BRISMA 2.0.2 2023-001.csv",
  //     total_row: "65",
  //     total_sample: "5",
  //   },
  // ];

  return (
    <div className="w-full p-4 overflow-y-scroll max-h-[40rem]">
      <TableTree>
        <Headers>
          <Header width="13%" className="border-x border-t rounded-ss-xl">
            <p className="font-bold text-brisma">Aksi</p>
          </Header>
          <Header width="57%" className="border-t border-r">
            <p className="font-bold text-brisma">Nama File Sample</p>
          </Header>
          <Header width="15%" className="border-t border-r">
            <p className="font-bold text-brisma">Jumlah Baris</p>
          </Header>
          <Header width="15%" className="border-t border-r rounded-se-xl">
            <p className="font-bold text-brisma">Jumlah Sample</p>
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({ directory, filename, jumlah_baris, jumlah_sample }) => (
            <Row>
              <Cell width="13%" className="border-x">
                <div className="flex gap-0.5 -ml-2.5">
                  <CheckboxField />
                  <ButtonIcon
                    icon={<IconEdit size="medium" />}
                    color="yellow"
                  />
                </div>
              </Cell>
              <Cell width="57%" className="border-r">
                <p className="text-xs">{filename}</p>
              </Cell>
              <Cell width="15%" className="border-r">
                <p className="text-xs">{jumlah_baris}</p>
              </Cell>
              <Cell width="15%" className="border-r">
                <p className="text-xs">{jumlah_sample}</p>
              </Cell>
            </Row>
          )}
        />
      </TableTree>
    </div>
  );
};

export default ContentSampleCSV;
