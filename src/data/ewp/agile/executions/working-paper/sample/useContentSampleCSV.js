import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useContentSampleCSV = (params) => {
  const { id, kkpa_id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/pool/csv/content/${id}/${kkpa_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    contentSampleCSV: data,
    contentSampleCSVError: error,
    contentSampleCSVMutate: mutate,
    contentSampleCSVIsLoading: isLoading,
  };
};

export default useContentSampleCSV;
