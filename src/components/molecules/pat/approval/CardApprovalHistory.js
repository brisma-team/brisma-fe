import { Card } from "@/components/atoms";
import Pagination from "@atlaskit/pagination";

//default data
const approvaldata = [
  {
    project_name: "PAT AIW Banten",
    year: "2023",
    approval_phase: "Final Dokumen PAT",
    status: "Approved",
  },
  {
    project_name: "PAT AIW Surabaya",
    year: "2023",
    approval_phase: "Draft Dokumen PAT",
    status: "Rejected",
  },
  {
    project_name: "PAT AIW Jayapura",
    year: "2022",
    approval_phase: "Final Dokumen PAT",
    status: "Rejected",
  },
  {
    project_name: "PAT AIW Palembang",
    year: "2022",
    approval_phase: "Final Dokumen PAT",
    status: "Approved",
  },
  {
    project_name: "PAT AIW Pangkal Pinang",
    year: "2022",
    approval_phase: "Final Dokumen PAT",
    status: "Approved",
  },
];

const CardApprovalHistory = ({ data = approvaldata }) => {
  return (
    <div>
      <Card>
        <div className="w-full p-5">
          <div className="flex flex-row justify-between mb-6">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              Riwayat Persetujuan
            </div>
          </div>
          <div className="leading-3">
            <div>
              <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
                <div className="grid grid-cols-4">
                  <div className="">Nama Proyek</div>
                  <div>Tahun</div>
                  <div>Fase Persetujuan</div>
                  <div>Status</div>
                </div>
              </div>

              {data.map((item, key) => {
                return (
                  <div
                    className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100"
                    key={key}
                  >
                    <div className="grid grid-cols-4">
                      <div>{item.project_name}</div>
                      <div>{item.year}</div>
                      <div>{item.approval_phase}</div>
                      <div>{item.status}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              nextLabel="Next"
              label="Page"
              pageLabel="Page"
              pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              previousLabel="Previous"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardApprovalHistory;
