import useRPMModuleById from "@/data/catalog/rpm";
import { useState, useEffect } from "react";

const negoAttHtml = (id, noEvaluasi) => {
  const [data, setData] = useState();
  const { moduleDetail } = useRPMModuleById(
    id,
    "negosiasi-attendance",
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

export default negoAttHtml;
