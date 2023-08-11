import { Card } from "@/components/atoms";
import Pagination from "@atlaskit/pagination";

const CardApprovalHistory = ({ data }) => {
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

              {data &&
                data.map((item, key) => {
                  return (
                    <div
                      className="px-6 py-5 border-b-[1px] border-gray-300 hover:bg-gray-100"
                      key={key}
                    >
                      <div className="grid grid-cols-4">
                        <div>{item.pat.name}</div>
                        <div>{item.pat.tahun}</div>
                        <div>{item.note}</div>
                        <div>{item.is_approved ? "Approved" : "Rejected"}</div>
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
