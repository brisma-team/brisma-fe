import withTokenConfig from "./withTokenConfig";

const downloadFromUrl = (downloadUrl, downloadFilename) => {
  const { headers } = withTokenConfig();
  return fetch(downloadUrl, { headers })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Error downloading file:", error));
};

export default downloadFromUrl;
