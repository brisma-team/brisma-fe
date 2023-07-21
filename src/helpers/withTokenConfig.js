import { getCookie } from "cookies-next";

export default function withTokenConfig() {
  const token = getCookie("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}
