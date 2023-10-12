import { LandingLayoutEWP } from "@/layouts/ewp";
import {
  ProjectValidation,
  EntranceLanding,
} from "@/components/molecules/ewp/konvensional/entrance/landing";
import { useEffect, useState } from "react";
import { useLandingEntranceEWP } from "@/data/ewp/konvensional/entrance";
import { useRouter } from "next/router";

const index = () => {
  const { id } = useRouter().query;
  const [isMapaFinal, setIsMapaFinal] = useState(false);
  const { landingEntranceEWP, landingEntranceEWPError } = useLandingEntranceEWP(
    { id }
  );
  useEffect(() => {
    if (landingEntranceEWPError) {
      setIsMapaFinal(false);
    } else {
      setIsMapaFinal(true);
    }
  }, [landingEntranceEWP]);
  return (
    <LandingLayoutEWP>
      {!isMapaFinal ? (
        <ProjectValidation />
      ) : (
        <EntranceLanding data={landingEntranceEWP?.data} />
      )}
    </LandingLayoutEWP>
  );
};

export default index;
