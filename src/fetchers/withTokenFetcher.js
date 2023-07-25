import withTokenConfig from "@/helpers/withTokenConfig";

export default async function withTokenFetcher(url) {
  const { headers } = withTokenConfig();
  const response = await fetch(url, { method: "GET", headers }).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

  return response;
}
