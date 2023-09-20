import { ButtonField } from "@/components/atoms";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetDataTables } from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { useState } from "react";
import DynamicTable from "@atlaskit/dynamic-table";

const ContentExistingSampleCSV = ({
  data,
  setCurrentSubModalStage,
  setIsSelectedSamplePool,
}) => {
  const dispatch = useDispatch();
  const [head, setHead] = useState([]);
  const [widthColumn, setWidthColumn] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data?.length) {
      const arrHead = [
        "Nama File",
        "Uploader",
        "Risk Issue",
        "Sub Aktifitas",
        "Aktifitas",
        "Nama File 1",
        "Uploader 1",
        "Risk Issue 1",
        "Sub Aktifitas 1",
        "Aktifitas 1",
        "Nama File 2",
        "Uploader 2",
        "Risk Issue 2",
        "Sub Aktifitas 2",
        "Aktifitas 2",
      ];
      const mappingRows = data?.map((v, i) => {
        return {
          "Nama File": v.filename,
          Uploader: v.name_uploader,
          "Risk Issue": v.original_risk_issue_nama,
          "Sub Aktifitas": v.original_sub_aktivitas_nama,
          Aktifitas: v.original_aktivitas_nama,
          "Nama File 1": v.filename,
          "Uploader 1": v.name_uploader,
          "Risk Issue 1": v.original_risk_issue_nama,
          "Sub Aktifitas 1": v.original_sub_aktivitas_nama,
          "Aktifitas 1": v.original_aktivitas_nama,
          "Nama File 2": v.filename,
          "Uploader 2": v.name_uploader,
          "Risk Issue 2": v.original_risk_issue_nama,
          "Sub Aktifitas 2": v.original_sub_aktivitas_nama,
          "Aktifitas 2": v.original_aktivitas_nama,
        };
      });

      const arrPages = [];
      for (let i = 1; i <= data.length; i++) {
        arrPages.push("100px");
      }

      setWidthColumn(arrPages);
      setHead(arrHead);
      setRows(mappingRows);
    }
  }, [data]);
  //   const dataTables = useSelector(
  //     (state) => state.planningAnalysisMapaEWP.dataTables
  //   );

  //   const { headers } = withTokenConfig();
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         "http://139.59.104.214:9000/ewp/1694506674235-sample_terbaru.csv",
  //         {
  //           method: "GET",
  //           headers,
  //         }
  //       );

  //       const csvFile = await response.text();
  //       Papa.parse(csvFile, {
  //         header: true,
  //         dynamicTyping: true,
  //         complete: function (result) {
  //           const rowsArray = [];
  //           const dataObj = result?.data?.map((value, index) => {
  //             return { index, ...value };
  //           });

  //           const dataObjWithoutIndex = _.map(dataObj, (item) =>
  //             _.omit(item, ["index"])
  //           );

  //           dataObjWithoutIndex?.map((d) => {
  //             rowsArray.push(Object.keys(d));
  //           });

  //           if (result?.data) {
  //             dispatch(
  //               setDataTables({
  //                 fileName: "test",
  //                 tableObj: dataObj,
  //                 tableValues: result.data,
  //                 tableRows: rowsArray[0],
  //               })
  //             );
  //           }
  //         },
  //         error: (error) => {
  //           console.error("Error parsing CSV:", error.message);
  //         },
  //       });
  //     };

  //     fetchData();
  //   }, []);

  useEffect(() => {}, []);

  const header = [
    { field: "kode", header: "Kode" },
    { field: "id", header: "Id" },
  ];
  const values = [{ kode: 1, id: 1 }];

  const handleClickSample = () => {
    setIsSelectedSamplePool(true);
    setCurrentSubModalStage(1);
    dispatch(resetDataTables());
    // dispatch(resetPayloadSample());
  };

  return (
    <div className="px-4 py-2">
      <div className="w-32 bg-atlasian-blue-light rounded">
        <ButtonField text="Tampilkan Filter" />
      </div>
      <div className="my-2" />
      {data ? (
        // <div>
        //   <div className="w-full p-4 overflow-y-scroll max-h-[40rem]">
        //     <TableTree>
        //       <Headers>
        //         <Header width="7%" className="border-x border-t rounded-ss-xl">
        //           <p className="font-bold text-brisma">Aksi</p>
        //         </Header>
        //         <Header width="23%" className="border-t border-r">
        //           <p className="font-bold text-brisma">Nama File</p>
        //         </Header>
        //         <Header width="70%" className="border-t border-r rounded-se-xl">
        //           <div className="w-full bg-atlasian-yellow">
        //             <div className="w-full">Original</div>
        //             {/* <div className="w-full grid grid-cols-4">
        //               <div>Uploader</div>
        //               <div>Risk Issue</div>
        //               <div>Sub Aktifitas</div>
        //               <div>Aktifitas</div>
        //             </div> */}
        //           </div>
        //         </Header>
        //       </Headers>
        //       <Rows
        //         items={data}
        //         render={({
        //           id,
        //           directory,
        //           filename,
        //           name_uploader,
        //           original_risk_issue_nama,
        //           original_aktivitas_nama,
        //           original_sub_aktivitas_nama,
        //         }) => (
        //           <Row>
        //             <Cell width="7%" className="border-x">
        //               <div className="flex -ml-3">
        //                 <ButtonIcon
        //                   icon={<IconArrowBottomCircle size="medium" />}
        //                   color={"blue"}
        //                   handleClick={() => handleClickSample()}
        //                 />
        //                 <ButtonIcon
        //                   icon={<IconCrossCircle size="medium" />}
        //                   color={"red"}
        //                   //   handleClick={() => handleDeleteRisk(id)}
        //                 />
        //               </div>
        //             </Cell>
        //             <Cell width="23%" className="border-x">
        //               {filename}
        //             </Cell>
        //             <Cell width="70%" className="border-x">
        //               {name_uploader}
        //             </Cell>
        //           </Row>
        //         )}
        //       />
        //     </TableTree>
        //   </div>
        //   <Pagination pages={1} />
        // </div>
        // <div className="max-w-[65rem] overflow-x-scroll">
        <div className="overflow-y-auto w-[96] relative">
          {/* <DataTable value={rows} scrollable>
            {head.map((v, i) => {
              return (
                <Column
                  key={i}
                  field={v}
                  header={v}
                  style={{ minWidth: "100px" }}
                ></Column>
              );
            })}
          </DataTable> */}

          <DynamicTable head={head} rows={rows.slice(0, 10)} />
        </div>
      ) : (
        // </div>
        ""
      )}
    </div>
  );
};

export default ContentExistingSampleCSV;
