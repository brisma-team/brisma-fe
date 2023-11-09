import { useModuleById } from "@/data/catalog";
import { loadingSwal } from "@/helpers";
import { useState, useEffect } from "react";

const entBaHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { moduleDetail, moduleDetailIsLoading } = useModuleById(
    year,
    source,
    id,
    "entrance_ba"
  );

  useEffect(() => {
    if (moduleDetail !== undefined) {
      setData(moduleDetail.data.content);
    }
  }, [moduleDetail]);

  useEffect(() => {
    moduleDetailIsLoading && data == undefined
      ? loadingSwal()
      : loadingSwal("close");
  }, [moduleDetailIsLoading]);

  return moduleDetailIsLoading && data == undefined
    ? `<p>Loading data...</p>`
    : `
    <main>
      ${data?.Content ? data.Content : "Loading data..."}
    </main>
`;
};

export default entBaHtml;
