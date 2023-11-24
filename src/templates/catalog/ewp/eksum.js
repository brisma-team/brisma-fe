import { useModuleById } from "@/data/catalog";
import { loadingSwal } from "@/helpers";
import { useState, useEffect } from "react";

const eksumHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { moduleDetail, moduleDetailIsLoading } = useModuleById(
    year,
    source,
    id,
    "eksum"
  );

  useEffect(() => {
    if (moduleDetail !== undefined) {
      setData(moduleDetail.data.content);
    }
  }, [moduleDetail]);

  useEffect(() => {
    moduleDetailIsLoading ? loadingSwal() : loadingSwal("close");
  }, [moduleDetailIsLoading]);

  return moduleDetailIsLoading
    ? `<p>Loading data...</p>`
    : `
    <main>
      ${data?.Content}
    </main>
`;
};

export default eksumHtml;
