import withTokenConfig from "./withTokenConfig";
import successSwal from "./successSwal";

const usePostData = async (url, body) => {
  try {
    const { headers } = withTokenConfig();
    const options = {
      method: "POST",
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
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return successSwal(responseData.message);
  } catch (e) {
    throw new Error(e?.message || "An error occurred");
  }
};

export default usePostData;
