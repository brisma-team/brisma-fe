import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSampleAssignmentMapaEWP = (params) => {
  const { id, mapa_uker_mcr_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/penugasan/${id}/${mapa_uker_mcr_id}/sample`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    sampleAssignmentMapaEWP: data,
    sampleAssignmentMapaEWPError: error,
    sampleAssignmentMapaEWPMutate: mutate,
    sampleAssignmentMapaEWPIsLoading: isLoading,
  };
};

export default useSampleAssignmentMapaEWP;
