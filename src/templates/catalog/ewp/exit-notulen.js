import { useExitNotById } from "@/data/catalog";
import { useState, useEffect } from "react";

export const exitNotHtml = (year, source, id) => {
  const [data, setData] = useState();
  const { exitNotDetail } = useExitNotById(year, source, id);

  useEffect(() => {
    if (exitNotDetail !== undefined) {
      setData(exitNotDetail.data.exit_notulen);
    }
  }, [exitNotDetail]);

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Exit Notulen</title>
    </head>
    <body>
      <main>
        ${data?.Content}
      </main>
    </body>
  </html>
  `;
};
