import { useState, useEffect } from "react";
import { Card, Spinner } from "@/components/atoms";
import useProjectInformation from "@/data/catalog/useProjectInformation";

const ProjectInfo = ({ type = "pat", id, source = 2, year = 2023 }) => {
  const [information, setInformation] = useState();
  const { informationData, informationIsLoading } = useProjectInformation(
    type,
    id,
    source,
    year
  );

  useEffect(() => {
    if (informationData != undefined) {
      setInformation(informationData.data);
    }
  }, [informationData]);
  return (
    <div className="mt-5 mr-40">
      <Card>
        <div className="w-full h-full px-6 p-5">
          <h4 className="mb-3">
            {type.toUpperCase()} Information - BRISMA {source}
          </h4>
          <hr className="mb-3 border-b border-neutral-500"></hr>
          <div className="grid grid-cols-5">
            <div className="col-span-1 font-bold text-lg">Projek ID</div>
            {informationIsLoading == true ? (
              <div className="col-span-4 ">
                : <Spinner />
              </div>
            ) : (
              <div className="col-span-4 text-base">: {id}</div>
            )}
            <div className="col-span-1 font-bold text-lg">Nama Projek</div>
            {informationIsLoading == true ? (
              <div className="col-span-4 ">
                : <Spinner />
              </div>
            ) : (
              <div className="col-span-4 text-base">
                : {information?.ProjectName}
              </div>
            )}
            <div className="col-span-1 font-bold text-lg">Tahun</div>
            {informationIsLoading == true ? (
              <div className="col-span-4 ">
                : <Spinner />
              </div>
            ) : (
              <div className="col-span-4 text-base">: {information?.Year}</div>
            )}
            {type === "ewp" && (
              <>
                <div className="col-span-1 font-bold text-lg">Tipe Audit</div>
                {informationIsLoading == true ? (
                  <div className="col-span-4 ">
                    : <Spinner />
                  </div>
                ) : (
                  <div className="col-span-4 text-base">
                    : {information?.ProjectType}
                  </div>
                )}
              </>
            )}
            {/* <div className="col-span-1 font-bold text-lg">Kantor Audit</div>
            <div className="col-span-4">: {information?.uka_name}</div> */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectInfo;
