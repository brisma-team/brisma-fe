import { Card } from "@/components/atoms";
import { IconArrowRight, IconClose } from "@/components/icons";
import Button from "@atlaskit/button";
//default data
const approvaldata = [
  {
    project_name: "PAT AIW Banten",
    year: "2023",
    approval_phase: "Final Dokumen PAT",
  },
  {
    project_name: "PAT AIW Surabaya",
    year: "2023",
    approval_phase: "Draft Dokumen PAT",
  },
  {
    project_name: "PAT AIW Jayapura",
    year: "2022",
    approval_phase: "Final Dokumen PAT",
  },
  {
    project_name: "PAT AIW Palembang",
    year: "2022",
    approval_phase: "Final Dokumen PAT",
  },
  {
    project_name: "PAT AIW Pangkal Pinang",
    year: "2022",
    approval_phase: "Final Dokumen PAT",
  },
];

const CardApprovalQueue = ({ data = approvaldata }) => {
  return (
    <div>
      <Card>
        <div className="w-full p-5">
          <div className="flex flex-row justify-between mb-6">
            <div className="text-xl font-bold text-atlasian-blue-dark">
              Antrian Persetujuan
            </div>
          </div>
          <div className="leading-3">
            <div>
              <div className="mt-2 px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 font-bold">
                <div className="grid grid-cols-4">
                  <div>Nama Proyek</div>
                  <div className="text-center">Tahun</div>
                  <div className="text-center">Fase Persetujuan</div>
                  <div className="mx-auto">Aksi</div>
                </div>
              </div>

              {data.map((item, key) => {
                return (
                  <div
                    className="px-6 py-3 border-b-[1px] hover:bg-gray-100 border-gray-300 align-middle "
                    key={key}
                  >
                    <div className="grid grid-cols-4 ">
                      <div className="my-auto">{item.project_name}</div>
                      <div className="my-auto text-center">{item.year}</div>
                      <div className="mr-2 my-auto text-center">
                        {item.approval_phase}
                      </div>
                      <div className="flex justify-between w-16 mx-auto">
                        <div className="rounded-full overflow-hidden border-2 border-atlasian-blue-light w-7 h-7 pt-0.5">
                          <Button
                            shouldFitContainer
                            iconBefore={
                              <IconArrowRight
                                primaryColor="#0051CB"
                                size="medium"
                              />
                            }
                            className="bottom-1.5"
                          />
                        </div>
                        <div className="rounded-full overflow-hidden border-2 border-atlasian-red w-7 h-7 pt-0.5">
                          <Button
                            shouldFitContainer
                            iconBefore={
                              <IconClose primaryColor="#DD350B" size="medium" />
                            }
                            className="bottom-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardApprovalQueue;
