import useRPMModuleById from "@/data/catalog/rpm";
import { useState, useEffect } from "react";

const negoBaHtml = (id, noEvaluasi) => {
  const [data, setData] = useState();
  const { moduleDetail } = useRPMModuleById(
    id,
    "negosiasi-berita-acara",
    noEvaluasi
  );

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

export default negoBaHtml;
