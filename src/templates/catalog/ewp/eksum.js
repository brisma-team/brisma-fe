import { useModuleById } from "@/data/catalog";
import { useState, useEffect } from "react";

const eksumHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { moduleDetail } = useModuleById(year, source, id, "eksum");

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

export default eksumHtml;
