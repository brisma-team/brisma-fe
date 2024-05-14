import withTokenConfig from "./withTokenConfig";

const usePostKKPTQuery = async (url, body) => {
  try {
    const { headers } = withTokenConfig();
    const options = {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "Strict-Transport-Security": "max-age=86400; preload",
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
    return responseData;
  } catch (e) {
    throw new Error(e?.message || "An error occurred");
  }
};

export default usePostKKPTQuery;
