import useRPMModuleById from "@/data/catalog/rpm";
import { loadingSwal } from "@/helpers";
import { useState, useEffect } from "react";

const negoBaHtml = (id, noEvaluasi) => {
  const [data, setData] = useState();
  const { moduleDetail, moduleDetailIsLoading } = useRPMModuleById(
    id,
    "negosiasi-berita-acara",
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

export default negoBaHtml;
