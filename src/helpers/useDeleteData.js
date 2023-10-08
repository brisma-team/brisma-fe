import withTokenConfig from "./withTokenConfig";
import successSwal from "./successSwal";
import errorSwal from "./errorSwal";

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
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || "Unknown error";
      return await errorSwal(errorMessage);
    }

    const responseData = await response.json();
    return successSwal(responseData.message);
  } catch (e) {
    throw new Error(e);
  }
};

export default useDeleteData;
