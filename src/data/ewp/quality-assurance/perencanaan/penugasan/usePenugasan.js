import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const usePenugasan = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/penugasan/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    penugasan: data,
    penugasanError: error,
    penugasanMutate: mutate,
    penugasanIsLoading: isLoading,
  };
};

export default usePenugasan;
