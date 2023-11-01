import useRPMModuleById from "@/data/catalog/rpm";
import { useState, useEffect } from "react";

const sheHtml = (id, noEvaluasi) => {
  const [data, setData] = useState();
  const { moduleDetail } = useRPMModuleById(id, "she", noEvaluasi);

  console.log(moduleDetail);
  useEffect(() => {
    if (moduleDetail !== undefined) {
      setData(moduleDetail.data);
    }
  }, [moduleDetail]);

  return `
    <main>
      ${data?.content}
    </main>
`;
};

export default sheHtml;
