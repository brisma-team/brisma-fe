const previewDocumentNewTab = (fileName) => {
  window.open(`${process.env.NEXT_PUBLIC_APP}/documents/${fileName}`, "_blank");
};

export default previewDocumentNewTab;
