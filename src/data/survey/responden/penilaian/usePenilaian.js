import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const usePenilaian = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey_responden/penilaian/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    penilaian: data,
    penilaianError: error,
    penilaianMutate: mutate,
    penilaianIsLoading: isLoading,
  };
};

export default usePenilaian;
