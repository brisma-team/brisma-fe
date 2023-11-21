import useRPMModuleById from "@/data/catalog/rpm";
import { loadingSwal } from "@/helpers";
import { useState, useEffect } from "react";

const negoNotHtml = (id, noEvaluasi) => {
  const [data, setData] = useState();
  const { moduleDetail, moduleDetailIsLoading } = useRPMModuleById(
    id,
    "negosiasi-notulen",
    noEvaluasi
  );

  useEffect(() => {
    if (moduleDetail !== undefined) {
      setData(moduleDetail.data);
    }
  }, [moduleDetail]);

  useEffect(() => {
    moduleDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [moduleDetailIsLoading]);

  return moduleDetailIsLoading
    ? `<p>Loading data...</p>`
    : `
    <main>
      ${data?.content}
    </main>
`;
};

export default negoNotHtml;
