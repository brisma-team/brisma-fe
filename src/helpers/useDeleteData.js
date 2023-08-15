import withTokenConfig from "./withTokenConfig";
import successSwal from "./successSwal";

const useDeleteData = async (url, body) => {
  try {
    const { headers } = withTokenConfig();
    const options = {
      method: "DELETE",
      headers: {
        Authorization: headers.Authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options).then((res) => {
      if (!res.ok) {
        console.log(res);
        throw new Error("Network response was not ok");
      }
      return res.json();
    });

    return successSwal(response.message);
  } catch (e) {
    throw new Error(e);
  }
};

export default useDeleteData;
