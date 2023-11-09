import { useModuleById } from "@/data/catalog";
import { loadingSwal } from "@/helpers";
import { useState, useEffect } from "react";

const entNotHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { moduleDetail, moduleDetailIsLoading } = useModuleById(
    year,
    source,
    id,
    "entrance_notulen"
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
      ${data?.Content ? data.Content : "Loading data..."}
    </main>
`;
};

export default entNotHtml;
