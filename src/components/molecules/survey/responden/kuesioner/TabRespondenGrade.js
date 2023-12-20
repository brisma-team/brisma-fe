import { CustomPagination, LinkIcon } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { useEffect, useState } from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import { ImageDownload } from "@/helpers/imagesUrl";
import Image from "next/image";
import { convertDate } from "@/helpers";
import { useRouter } from "next/router";

const TabRespondenGrade = ({ data }) => {
  const { id } = useRouter().query;
  const [rows, setRows] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const [perPage, setPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    min: 0,
    max: perPage,
  });

  const handleSetPagination = (min, max) => {
    setPagination({ min, max });
  };

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
    setTotalData(mapping?.length);
  }, [data]);

  return (
    <CardContentHeaderFooter
      header={
        <div className="py-2 px-4 text-base font-semibold w-full">
          Daftar Nilai Per Responden
        </div>
      }
      footer={
        <div className="-mt-3 pb-3 w-full">
          <CustomPagination
            defaultCurrentPage={1}
            perPage={10}
            totalData={totalData}
            handleSetPagination={handleSetPagination}
            getValue={(value) => {
              setPagination({ min: value.min, max: value.max });
            }}
          />
        </div>
      }
    >
      <div className="w-full p-4 h-full">
        <Table
          bordered
          data={rows?.slice(pagination.min, pagination.max)}
          rowHeight={97}
          height={520}
        >
          <Column resizable width={100} align="center">
            <HeaderCell>Aksi</HeaderCell>
            <Cell>
              {(rowData) => {
                return (
                  <div className="h-full w-full flex justify-center items-center gap-3">
                    <LinkIcon
                      href={`/survey/responden/overview/${id}?is_print=true`}
                      isBlank={true}
                      icon={<Image src={ImageDownload} alt="" />}
                    />
                  </div>
                );
              }}
            </Cell>
          </Column>
          <Column width={50} align="center" verticalAlign="middle">
            <HeaderCell align="center">No.</HeaderCell>
            <Cell dataKey="index" align="center" />
          </Column>
          <Column resizable verticalAlign="middle" width={200}>
            <HeaderCell>Responden</HeaderCell>
            <Cell>
              {(rowData) => {
                return (
                  <div className="leading-3">
                    <p className="font-bold ">{rowData.pn_responden}</p>
                    <p>{rowData.name_responden}</p>
                  </div>
                );
              }}
            </Cell>
          </Column>
          <Column align="center" verticalAlign="middle" width={120}>
            <HeaderCell>Tanggal</HeaderCell>
            <Cell>
              {(rowData) => {
                return convertDate(rowData.tanggal, "-", "d");
              }}
            </Cell>
          </Column>
          <Column resizable align="center" width={300}>
            <HeaderCell>Bobot</HeaderCell>
            <Cell>
              {(rowData) => (
                <div className="w-full -my-2">
                  <div className={`flex -mx-2 border-b border-gray-200`}>
                    {rowData.pertanyaan_jawaban.map((v, i) => {
                      return (
                        <div
                          className={`border-r border-gray-200 text-center ${
                            Array.isArray(v[`a${i + 1}`]) ? `w-[6rem]` : `w-12`
                          }`}
                          key={i}
                        >
                          <div>Q{i + 1}</div>
                          <div>{v[`q${i + 1}`]}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex -mx-2">
                    {rowData.pertanyaan_jawaban.map((v, i) => {
                      return (
                        <div className="flex" key={i}>
                          {Array.isArray(v[`a${i + 1}`]) &&
                          v[`a${i + 1}`].length
                            ? v[`a${i + 1}`].map((val, idx) => {
                                return (
                                  <div
                                    key={idx}
                                    className="flex flex-col p-2 border-r border-gray-200 w-12 items-center"
                                  >
                                    <div>A{i + 1}</div>
                                    <div>{val}</div>
                                  </div>
                                );
                              })
                            : v[`a${i + 1}`] !== undefined && (
                                <div className="flex flex-col p-2 border-r border-gray-200 w-12 items-center">
                                  <div>A{i + 1}</div>
                                  <div>{v[`a${i + 1}`]}</div>
                                </div>
                              )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    </CardContentHeaderFooter>
  );
};

export default TabRespondenGrade;
