import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSamplePoolCSV = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/pool/csv/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    samplePoolCSV: data,
    samplePoolCSVError: error,
    samplePoolCSVMutate: mutate,
    samplePoolCSVIsLoading: isLoading,
  };
};

export default useSamplePoolCSV;
