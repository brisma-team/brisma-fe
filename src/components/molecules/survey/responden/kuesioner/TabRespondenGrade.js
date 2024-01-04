import { LinkIcon } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  DataNotFound,
} from "@/components/molecules/commons";
import { useEffect, useState } from "react";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import "rsuite-table/dist/css/rsuite-table.css";
import { ImageDownload } from "@/helpers/imagesUrl";
import Image from "next/image";
import { convertDate } from "@/helpers";
import { useRouter } from "next/router";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const TabRespondenGrade = ({ data }) => {
  const { id } = useRouter().query;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const mapping = data?.nilai_responden?.map((responden, index) => {
      const pertanyaan_jawaban = [];

      for (const key in responden) {
        if (key.startsWith("q")) {
          const pertanyaan = key;
          const jawaban = `a${pertanyaan.substr(1)}`;
          pertanyaan_jawaban.push({
            [pertanyaan]: responden[pertanyaan],
            [jawaban]: responden[jawaban],
          });
        }
      }

      return {
        index: index + 1,
        pn_responden: responden.pn_responden,
        name_responden: responden.nama_responden,
        tanggal: convertDate(responden.createdAt, "-", "d"),
        pertanyaan_jawaban: pertanyaan_jawaban,
      };
    });
    setRows(mapping);
  }, [data]);

  return (
    <CardContentHeaderFooter
      header={
        <div className="py-2 px-4 text-base font-semibold w-full">
          Daftar Nilai Per Responden
        </div>
      }
    >
      <div className="p-4 h-full">
        <TableTree>
          <Headers>
            <Header
              width={70}
              className="border-x border-t rounded-ss-xl cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">Aksi</div>
            </Header>
            <Header
              width={50}
              className="border-t border-r cell-custom-dataTables"
            >
              <div className="custom-table-header justify-center">No.</div>
            </Header>
            <Header
              width={200}
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header`}>Responden</div>
            </Header>
            <Header
              width={120}
              className="border-t border-r cell-custom-dataTables"
            >
              <div className={`custom-table-header justify-center`}>
                Tanggal
              </div>
            </Header>
            <Header
              width={645}
              className="border-t border-r rounded-se-xl cell-custom-dataTables"
            >
              <div className={`custom-table-header justify-center`}>Bobot</div>
            </Header>
          </Headers>
          {rows?.length ? (
            <Rows
              items={rows}
              render={({
                index,
                pn_responden,
                name_responden,
                tanggal,
                pertanyaan_jawaban,
              }) => (
                <Row>
                  <Cell width={70} className={`border-x ${customCell}`}>
                    <div className="custom-table-position-center justify-center">
                      <div className="h-full w-full flex justify-center items-center gap-3">
                        <LinkIcon
                          href={`/survey/responden/overview/${id}?from=${pn_responden}&is_print=true`}
                          isBlank={true}
                          icon={<Image src={ImageDownload} alt="" />}
                        />
                      </div>
                    </div>
                  </Cell>
                  <Cell width={50} className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">{index}</p>
                    </div>
                  </Cell>
                  <Cell width={200} className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center">
                      <div className="leading-3">
                        <p className="font-bold ">{pn_responden}</p>
                        <p>{name_responden}</p>
                      </div>
                    </div>
                  </Cell>
                  <Cell width={120} className={`border-r ${customCell} `}>
                    <div className="custom-table-position-center justify-center">
                      <p className="text-xs">
                        {convertDate(tanggal, "-", "d")}
                      </p>
                    </div>
                  </Cell>
                  <div className="max-w-[645px] overflow-x-scroll overflow-y-hidden">
                    <div className={`flex`}>
                      {pertanyaan_jawaban.map((v, i) => {
                        return (
                          <div key={i}>
                            <div
                              className={`${
                                Array?.isArray(v[`a${i + 1}`])
                                  ? `w-[${(
                                      3 * v[`a${i + 1}`]?.length
                                    )?.toString()}rem]`
                                  : `w-[3rem]`
                              } flex border-b border-gray-200`}
                            >
                              <div
                                className={`min-w-full flex flex-col items-center border-r border-gray-200 py-1`}
                                key={i}
                              >
                                <div>Q{i + 1}</div>
                                <div>{v[`q${i + 1}`]}</div>
                              </div>
                            </div>
                            <div className="flex">
                              <div className="flex" key={i}>
                                {Array.isArray(v[`a${i + 1}`]) &&
                                v[`a${i + 1}`]?.length
                                  ? v[`a${i + 1}`].map((val, idx) => {
                                      return (
                                        <div
                                          key={idx}
                                          className="flex flex-col items-center border-r border-gray-200 w-12 py-1"
                                        >
                                          <div>A{i + 1}</div>
                                          <div>{val}</div>
                                        </div>
                                      );
                                    })
                                  : v[`a${i + 1}`] !== undefined && (
                                      <div className="flex flex-col items-center border-r border-gray-200 w-12 py-1">
                                        <div>A{i + 1}</div>
                                        <div>{v[`a${i + 1}`]}</div>
                                      </div>
                                    )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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
    </CardContentHeaderFooter>
  );
};

export default TabRespondenGrade;
