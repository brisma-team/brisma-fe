import { useModuleById } from "@/data/catalog";
import { useState, useEffect } from "react";

const ltminorHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { moduleDetail } = useModuleById(year, source, id, "ltminor");

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

export default ltminorHtml;
