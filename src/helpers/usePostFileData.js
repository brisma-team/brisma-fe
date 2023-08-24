import withTokenConfig from "./withTokenConfig";
import successSwal from "./successSwal";
const usePostFileData = async (url, content) => {
  const formData = new FormData();
  formData.append("file", content.file);
  formData.append("modul", content.modul);
  try {
    const { headers } = withTokenConfig();
    const options = {
      method: "POST",
      headers: {
        Authorization: headers.Authorization,
      },
      body: formData,
    };
    const response = await fetch(url, options).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
    successSwal(response.message);
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export default usePostFileData;
