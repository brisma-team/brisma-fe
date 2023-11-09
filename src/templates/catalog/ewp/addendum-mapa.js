import { useModuleById } from "@/data/catalog";
import { useState, useEffect } from "react";

const addendumMapaHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { moduleDetail } = useModuleById(year, source, id, "addendum-mapa");

  useEffect(() => {
    if (moduleDetail !== undefined) {
      setData(moduleDetail.data.content);
    }
  }, [moduleDetail]);

  return `
    <main>
      ${data?.Content}
    </main>
`;
};

export default addendumMapaHtml;
