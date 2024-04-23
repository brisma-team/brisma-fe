import rekomendasiHtml from "./analisa/rekomendasi";

const peluangPeningkatanDocs = (data) => {
  const renderContent = (bab, content) => {
    if (bab === "Risk & Rekomendasi") {
      return rekomendasiHtml(content?.rekomendasi);
    } else {
      return content;
    }
  };
  return `
    <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contoh Dokumen HTML</title>
  </head>
  <body>
  ${data
    ?.map((v) => {
      return renderContent(v?.title, v?.content);
    })
    .join("")}
  </body>
  </html>
    `;
};

export default peluangPeningkatanDocs;
