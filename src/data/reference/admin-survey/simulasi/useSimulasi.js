import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSimulasi = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/simulasi/all/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    simulasi: data,
    simulasiError: error,
    simulasiMutate: mutate,
    simulasiIsLoading: isLoading,
  };
};

export default useSimulasi;
