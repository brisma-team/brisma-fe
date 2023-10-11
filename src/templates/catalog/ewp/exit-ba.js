import { useExitBaById } from "@/data/catalog";
import { useState, useEffect } from "react";

export const exitBaHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { exitBaDetail } = useExitBaById(year, source, id);

  useEffect(() => {
    if (exitBaDetail !== undefined) {
      setData(exitBaDetail.data.exit_ba);
    }
  }, [exitBaDetail]);

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Exit Berita Acara</title>
    </head>
    <body>
      <main>
        ${data?.Content}
      </main>
    </body>
  </html>
  `;
};
