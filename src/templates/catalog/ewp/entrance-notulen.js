import { useEntNotById } from "@/data/catalog";
import { useState, useEffect } from "react";

export const entNotHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { entNotDetail } = useEntNotById(year, source, id);

  useEffect(() => {
    if (entNotDetail !== undefined) {
      setData(entNotDetail.data.entrance_notulen);
    }
  }, [entNotDetail]);

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Entrance Notulen</title>
    </head>
    <body>
      <main>
        ${data?.Content}
      </main>
    </body>
  </html>
  `;
};
