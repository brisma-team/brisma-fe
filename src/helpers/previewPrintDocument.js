const previewPrintDocument = (elementId) => {
  const contentElement = document.getElementById(elementId);

  // Mengecek apakah elemen konten telah ditemukan
  if (contentElement) {
    const contentToPrint = contentElement.innerHTML;

    // Membuat jendela baru untuk mencetak konten
    const printWindow = window.open("", "_blank");

    // Menuliskan konten dan gaya ke jendela baru
    printWindow.document.write(`
        <html>
          <head>
            <title>Cetak</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
          </head>
          <body>
          <div>
          ${contentToPrint}
          </div>
          </body>
        </html>
      `);

    // Menutup dokumen baru setelah mencetak
    printWindow.document.close();

    // Menjalankan fungsi pencetakan pada jendela baru
    printWindow.print();
  } else {
    console.error("Elemen konten tidak ditemukan.");
  }
};

export default previewPrintDocument;
