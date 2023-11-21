import useRPMModuleById from "@/data/catalog/rpm";
import { loadingSwal } from "@/helpers";
import { useState, useEffect } from "react";

const shtlHtml = (id, noEvaluasi) => {
  const [data, setData] = useState();
  const { moduleDetail, moduleDetailIsLoading } = useRPMModuleById(
    id,
    "shtl",
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
      ${
        data?.content
          ? data.content
          : "Data Surat Hasil Tindak Lanjut tidak ditemukan."
      }
    </main>
`;
};

export default shtlHtml;
