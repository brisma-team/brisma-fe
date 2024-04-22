import anggaranHtml from "./perencanaan/anggaran";
import programKerjaHtml from "./perencanaan/program-kerja";
import timTimeplanHtml from "./perencanaan/tim-timeplan";

const perencanaanDocs = (data) => {
  const renderContent = (bab, content) => {
    if (bab === "Sumber Informasi") {
      return content;
    } else if (bab === "Tim Audit") {
      return timTimeplanHtml(content?.tim);
    } else if (bab === "Anggaran") {
      return anggaranHtml(content?.anggaran);
    } else if (bab === "Lingkup Pemeriksaan") {
      return programKerjaHtml(content?.lingkup);
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

export default perencanaanDocs;
