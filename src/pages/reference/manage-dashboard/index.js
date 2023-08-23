// import { MainLayout } from "@/layouts";
import useApacheToken from "@/data/dashboard/useApacheToken";
import { useEffect, useState } from "react";

const index = () => {
  const { apacheToken } = useApacheToken();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (apacheToken != undefined) setToken(apacheToken.token);
  }, [apacheToken]);

  return (
    // <MainLayout>
    <div className="">
      <iframe
        title="superset"
        src={`https://139.59.104.214/login?token=${token}`}
        height="1444px"
        width="100%"
      />
    </div>
    // </MainLayout>
  );
};

export default index;
