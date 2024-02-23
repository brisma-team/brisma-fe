import useApacheToken from "@/data/dashboard/useApacheToken";
import { useEffect, useState } from "react";

const index = () => {
  const { apacheToken } = useApacheToken(true, true, true);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (apacheToken != undefined) setToken(apacheToken.token);
  }, [apacheToken]);

  return (
    <div>
      <iframe
        title="superset"
        src={`${process.env.NEXT_PUBLIC_API_URL_SUPERSET}/login?token=${token}`}
        height="1444px"
        width="100%"
      />
    </div>
  );
};

export default index;
