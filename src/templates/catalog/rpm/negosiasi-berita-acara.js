import { useEntNotById } from "@/data/catalog";
import { useState, useEffect } from "react";

export const negoBaHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { entNotDetail } = useEntNotById(year, source, id);

  useEffect(() => {
    if (entNotDetail !== undefined) {
      setData(entNotDetail.data.entrance_notulen);
    }
  }, [entNotDetail]);

  return `
    <main>  
      ${data?.Content}
    </main>
`;
};
