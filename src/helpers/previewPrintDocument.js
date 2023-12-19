const previewPrintDocument = (elementId, withoutNewTab) => {
  const contentElement = document.getElementById(elementId);

  // Mengecek apakah elemen konten telah ditemukan
  if (contentElement) {
    const contentToPrint = contentElement.innerHTML;

    // Style untuk menyembunyikan elemen-elemen header dan footer
    const hidePrintStyles = `
      <style>
        @media print {
          /* Semua elemen header dan footer diatur menjadi display: none; */
          body {
            margin: 5px; /* Menghilangkan margin agar tidak ada ruang putih */
          }
          @page {
            size: auto;  /* Auto memungkinkan kustomisasi ukuran kertas */
            margin: 5px;  /* Menghilangkan margin untuk halaman yang dicetak */
          }
          .print-header,
          .print-footer {
            display: none !important;
          }
        }
      </style>
    `;

    if (withoutNewTab) {
      document.write(`
        <html>
          <head>
            <title>Kuesioner</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
            ${hidePrintStyles}
          </head>
          <body>
            <div>
              ${contentToPrint}
            </div>
          </body>
        </html>
      `);

      setTimeout(() => {
        window.print();
      }, 1000);
    } else {
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
        <html>
          <head>
            <title>Kuesioner</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
            ${hidePrintStyles}
          </head>
          <body>
            <div>
              ${contentToPrint}
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 1000);
    }
  } else {
    console.error("Elemen konten tidak ditemukan.");
  }
};

export default previewPrintDocument;
