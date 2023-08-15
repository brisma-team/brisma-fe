import React, { useEffect, useState } from "react";
import { MainLayout } from "@/layouts";
import { Breadcrumbs, Card, TableField } from "@/components/atoms";
import Button from "@atlaskit/button";
import useCatalogPATById from "@/data/catalog/useCatalogPATById";
import { useRouter } from "next/router";
const index = () => {
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "P.A.T", path: "/catalogue/pat" },
  ];
  const [catPat, setCatPat] = useState([]);
  const router = useRouter();
  const { data } = useCatalogPATById(router.query.id);
  useEffect(() => {
    if (data != undefined) {
      const mappingCatPat = data?.data[0].project_documents.map((v, key) => {
        return {
          No: key + 1,
          "Nama Dokumen": v?.dokumen,
          "Tanggal Dibuat": v?.tanggal_document,
          Aksi: (
            <div className="grid grid-cols-3 text-center col-span-3">
              <div className="align-middle px-2">
                <Button shouldFitContainer appearance="primary">
                  History
                </Button>
              </div>
              <div className="align-middle px-2">
                <Button shouldFitContainer appearance="primary">
                  Preview
                </Button>
              </div>
              <div className="align-middle px-2 ">
                <Button shouldFitContainer appearance="primary">
                  Download
                </Button>
              </div>
            </div>
          ),
        };
      });
      setCatPat(mappingCatPat);
    }
  }, [data]);
  return (
    <MainLayout>
      <div className="px-5">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold">Catalogue P.A.T</div>
        </div>

        <div className="mt-5 mr-40">
          <Card>
            <div className="w-full h-full px-6">
              <div className="text-xl font-bold p-5">Pustaka Dokumen</div>
              <div className="max-h-[29rem] overflow-y-scroll px-2 mb-5">
                <TableField
                  headers={["No", "Nama Dokumen", "Tanggal Dibuat", "Aksi"]}
                  columnWidths={["10%", "30%", "30%", "30%"]}
                  items={catPat}
                />
              </div>
              {/* <div className="flex justify-center mt-5">
                <Pagination totalPages={3} setCurrentPage={setCurrentPage} />
              </div> */}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;
// const index = ({ data = approvalData }) => {
//   const id = useRouter().query.id;
//   const [showModal, setShowModal] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterId, setFilterId] = useState("");
//   const [filterName, setFilterName] = useState("");
//   const [selectedItem, setSelectedItem] = useState({
//     id: 0,
//     document_name: "No Document",
//     date: "10 Juli 1999",
//     attachment: "empty.pdf",
//   });

//   const breadcrumbs = [
//     { name: "Menu", path: "/dashboard" },
//     { name: "Catalogue", path: "/catalogue" },
//     { name: "P.A.T", path: "/catalogue/pat" },
//     { name: id, path: "/catalogue/pat/" + id },
//     { name: "Daftar Dokumen", path: "/catalogue/pat/" + id },
//   ];
//   const handleHistoryDownload = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   useEffect(() => {
//     const delay = 3000;
//     const debounce = setTimeout(() => {
//       console.log("hitting api");
//     }, delay);
//     return () => clearTimeout(debounce);
//   }, [filterId, filterName]);

//   return (
//     <MainLayout>
//       <div className="px-5">
//         {/* Start Breadcrumbs */}
//         <Breadcrumbs data={breadcrumbs} />
//         {/* End Breadcrumbs */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex-1">
//             <div className="text-3xl font-bold">Catalogue P.A.T</div>
//           </div>
//         </div>
//         {/* Start Filter */}
//         <div className="my-3 w-40">
//           <Button
//             appearance="primary"
//             iconBefore={IconPlus}
//             shouldFitContainer
//             onClick={() => setShowFilter(!showFilter)}
//           >
//             Tampilkan Filter
//           </Button>
//         </div>
//         {showFilter && (
//           <div className="flex justify-between w-96">
//             <Card>
//               <div className="flex p-2">
//                 <div className="w-1/2">
//                   <Textfield
//                     placeholder="ID Projek"
//                     className="mr-1"
//                     onChange={(e) => setFilterId(e.target.value)}
//                     elemAfterInput={
//                       <button className="justify-center">
//                         <IconClose size="large" />
//                       </button>
//                     }
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <Textfield
//                     placeholder="Nama Dokumen"
//                     className="ml-1"
//                     onChange={(e) => setFilterName(e.target.value)}
//                     elemAfterInput={
//                       <button className="justify-center">
//                         <IconClose size="large" />
//                       </button>
//                     }
//                   />
//                 </div>
//               </div>
//             </Card>
//           </div>
//         )}
//         {/* End Filter */}
//         {/* Start Modal */}
//         {selectedItem && (
//           <Modal
//             showModal={showModal}
//             onClickOutside={() => setShowModal(false)}
//           >
//             <>
//               <div className="w-full p-5 ">
//                 <div className="text-xl font-bold text-atlasian-blue-dark mb-5">
//                   Download History
//                 </div>
//                 <div className="flex pl-3 text-sm font-semibold text-atlasian-blue-dark items-center underline">
//                   <DocumentIcon />
//                   <span className="ml-2">{selectedItem.attachment}</span>
//                 </div>
//                 <div className="leading-3">
//                   <>
//                     <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
//                       <div className="grid grid-cols-4">
//                         <div className="col-span-2">Nama Akun</div>
//                         <div>Tanggal</div>
//                         <div className="text-center">Jam</div>
//                       </div>
//                     </div>

//                     {histories
//                       .filter((items) => items.id == selectedItem.id)
//                       .map((history) => {
//                         return history.data.map((content, key) => {
//                           return (
//                             <div
//                               className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100"
//                               key={key}
//                             >
//                               <div className="grid grid-cols-4">
//                                 <div className="col-span-2 my-auto">
//                                   {content.account ? content.account : ""}
//                                 </div>
//                                 <div className="my-auto">
//                                   {content.date ? content.date : ""}
//                                 </div>
//                                 <div className="text-center my-auto">
//                                   {content.time ? content.time : ""}
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         });
//                       })}
//                   </>
//                 </div>
//               </div>
//             </>
//           </Modal>
//         )}
//         {/* End Modal */}
//         <div className="mt-5 mr-40">
//           <Card>
//             <div className="w-full p-5">
//               <div className="flex flex-row justify-between mb-6">
//                 <div className="text-xl font-bold text-atlasian-blue-dark">
//                   Daftar Dokumen
//                 </div>
//               </div>
//               <div className="leading-3">
//                 <div>
//                   <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
//                     <div className="grid grid-cols-8">
//                       <div className="col-span-2">Nama Dokumen</div>
//                       <div>Tanggal</div>
//                       <div className="text-center col-span-2">Lampiran</div>
//                       <div className="text-center col-span-3">Aksi</div>
//                     </div>
//                   </div>

//                   {data?.map((item, key) => {
//                     return (
//                       <div
//                         className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100"
//                         key={key}
//                       >
//                         <div className="grid grid-cols-8">
//                           <div className="col-span-2 my-auto">
//                             {item.document_name}
//                           </div>
//                           <div className="my-auto">{item.date}</div>
//                           <div className="text-center my-auto col-span-2">
//                             {item.attachment}
//                           </div>
//                           <div className="grid grid-cols-3 text-center col-span-3">
//                             <div className="align-middle px-2">
//                               <Button
//                                 shouldFitContainer
//                                 appearance="primary"
//                                 onClick={() => handleHistoryDownload(item)}
//                               >
//                                 History
//                               </Button>
//                             </div>
//                             <div className="align-middle px-2">
//                               <Button shouldFitContainer appearance="primary">
//                                 Preview
//                               </Button>
//                             </div>
//                             <div className="align-middle px-2 ">
//                               <Button shouldFitContainer appearance="primary">
//                                 Download
//                               </Button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//               {/* <div className="flex justify-center mt-4">
//                 <Pagination
//                   nextLabel="Next"
//                   label="Page"
//                   pageLabel="Page"
//                   pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
//                   previousLabel="Previous"
//                 />
//               </div> */}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default index;
