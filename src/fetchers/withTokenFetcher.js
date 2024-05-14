import withTokenConfig from "@/helpers/withTokenConfig";

export default async function withTokenFetcher(url) {
  const { headers } = withTokenConfig();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      ...headers,
      "Strict-Transport-Security": "max-age=86400; preload",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res?.statusText || "Network response was not ok");
    }
    return res.json();
  });

  return response;
}
