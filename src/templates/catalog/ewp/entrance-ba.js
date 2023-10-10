import { useEntBaById } from "@/data/catalog";
import { useState, useEffect } from "react";

export const entBaHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { entBaDetail } = useEntBaById(year, source, id);

  useEffect(() => {
    if (entBaDetail !== undefined) {
      setData(entBaDetail.data.entrance_ba);
    }
  }, [entBaDetail]);

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Entrance Berita Acara</title>
    </head>
    <body>
      <main>
        ${data?.Content}
      </main>
    </body>
  </html>
  `;
};
