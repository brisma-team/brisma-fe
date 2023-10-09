import { LandingLayoutEWP } from "@/layouts/ewp";
import {
  ProjectValidation,
  EntranceLanding,
} from "@/components/molecules/ewp/konvensional/entrance/landing";
import { useState } from "react";

const index = () => {
  const [isMapa, setIsMapa] = useState(false);

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      {isMapa ? <ProjectValidation /> : <EntranceLanding />}

      {/* End Breadcrumbs */}
    </LandingLayoutEWP>
  );
};

export default index;
