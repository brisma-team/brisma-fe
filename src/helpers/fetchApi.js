import withTokenConfig from "./withTokenConfig";
import successSwal from "./successSwal";
import errorSwal from "./errorSwal";

const fetchApi = async (method, url, body, withoutSwal, messageSuccess) => {
  try {
    const { headers } = withTokenConfig();
    const options = {
      method,
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
    if (!withoutSwal) {
      messageSuccess;
      await successSwal(messageSuccess || responseData?.message);
    }
    return responseData;
  } catch (e) {
    throw new Error(e?.message || "An error occurred");
  }
};

export default fetchApi;
