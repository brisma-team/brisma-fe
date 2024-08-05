import { CustomCheckbox } from "@/components/atoms";
import { DataNotFound } from "@/components/molecules/commons";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const TabNewSampleCSV = ({ data, withoutAction, handleClickCheckbox }) => {
  return data?.columns?.length ? (
    <>
      <p>{data?.filename || ""}</p>
      <div className="bg-white overflow-x-scroll max-w-[90rem] pb-3 z-10">
        <div style={{ width: `${250 * (data?.columns?.length || 0) + 80}px` }}>
          <TableTree>
            <Headers>
              <Header
                width={80}
                className="border-x border-t cell-custom-dataTables"
              >
                <div
                  className={`custom-table-header justify-center text-sm font-semibold`}
                >
                  AKSI
                </div>
              </Header>
              {data?.columns?.length
                ? data?.columns?.map((column, index) => {
                    return (
                      <Header
                        key={index}
                        width={250}
                        className="border-t border-r cell-custom-dataTables"
                      >
                        <div className="custom-table-header text-sm font-semibold">
                          {column?.toUpperCase()}
                        </div>
                      </Header>
                    );
                  })
                : ""}
            </Headers>
            {data?.data?.length ? (
              <Rows
                items={data?.data}
                render={(sample) => (
                  <Row>
                    <Cell
                      width={80}
                      className="border-x cell-custom-dataTables justify-center"
                    >
                      {!withoutAction ? (
                        <CustomCheckbox
                          value={
                            data?.values?.length
                              ? data?.values?.find(
                                  (sample_no) => sample_no === sample?.no
                                )
                              : ""
                          }
                          handleChange={(e) =>
                            handleClickCheckbox(e.target.checked, sample?.no)
                          }
                        />
                      ) : (
                        ""
                      )}
                    </Cell>
                    {data?.columns?.map((column, index) => {
                      return (
                        <Cell
                          key={index}
                          width={250}
                          className="border-r cell-custom-dataTables"
                        >
                          {sample[column]}
                        </Cell>
                      );
                    })}
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
      </div>
      ;
    </>
  ) : (
    ""
  );
};

export default TabNewSampleCSV;
