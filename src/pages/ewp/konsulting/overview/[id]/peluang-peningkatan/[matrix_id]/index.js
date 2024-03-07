// Inside a component or page file (e.g., pages/index.js)
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyComponent = () => {
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;
  const redirectUrl = `${baseUrl}/peluang-peningkatan`;

  useEffect(() => {
    // Redirect to the specified URL on the client side
    if (id && redirectUrl) {
      router.push(redirectUrl);
    }
  }, [router, id, redirectUrl]); // Make sure to include 'router' and 'redirectUrl' in the dependency array

  return (
    <div>
      <h1>404 Page Not Found</h1>
      <p>Redirecting to {redirectUrl}...</p>
      {/* You can include more content or UI elements here */}
    </div>
  );
};

export default MyComponent;
