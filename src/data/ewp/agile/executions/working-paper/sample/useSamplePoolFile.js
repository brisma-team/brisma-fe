import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSamplePoolFile = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/pool/file/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    samplePoolFile: data,
    samplePoolFileError: error,
    samplePoolFileMutate: mutate,
    samplePoolFileIsLoading: isLoading,
  };
};

export default useSamplePoolFile;
