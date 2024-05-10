import rekomendasiHtml from "./analisa/rekomendasi";

const analisaDocs = (uka, data) => {
  const renderContent = (bab, content) => {
    if (bab === "Rekomendasi") {
      return `<div><h4>II.  Rekomendasi</h4><div style="padding:5px">${rekomendasiHtml(
        content?.rekomendasi
      )}</div></div>`;
    } else {
      return `<div><h4>${bab}</h4><div>${content}</div></div>`;
    }
  };
  return `
    <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contoh Dokumen HTML</title>
      <style>
        header {
          display: flex;
          justify-content: center;
          text-align: center;
          margin-bottom: 1em;
        }
        .header {
          position: relative;
        }
        header img {
          width: 100px;
          height: 100px;
          position: absolute;
          left: 0;
        }
        .container {
          width: 100%;
          padding-right: 10px;
          padding-left: 10px;
          margin-right: auto;
          margin-left: auto;
        }

        .flex {
          display: flex;
        }
        
        .flex-col {
            flex-direction: column;
        }
        
        @media (min-width: 576px) {
            .container {
                max-width: 540px;
            }
        }
        
        @media (min-width: 768px) {
            .container {
                max-width: 720px;
            }
        }
        
        @media (min-width: 992px) {
            .container {
                max-width: 960px;
            }
        }
        
        @media (min-width: 1200px) {
            .container {
                max-width: 1140px;
            }
        }
      </style>
  </head>
  <body>
  <header>
      <div class="header">
        <h2>PT Bank Rakyat Indonesia (PERSERO), Tbk</h2>
        <h3>${
          uka?.kode && uka?.name !== "aikp1" ? uka?.name : "Head Office Audit"
        }</h3>
      </div>
    </header>
    <div
      style="
        display: flex;
        justify-content: center;
        text-align: center;
        border-top: 3px solid #222222;
        border-bottom: 1px solid #222222;
      "
    >
      <h4>KERTAS KERJA ANALISA</h4>
    </div>
    <div class='container'>
      ${data
        ?.map((v) => {
          return `<article class='flex flex-col'>${renderContent(
            v?.title,
            v?.content
          )}</article>`;
        })
        .join("")}
    </div>
  </body>
  </html>
    `;
};

export default analisaDocs;
