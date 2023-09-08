import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSubMajor = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_sub_major/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    subMajor: data,
    subMajorError: error,
    subMajorMutate: mutate,
    subMajorIsLoading: isLoading,
  };
};

export default useSubMajor;
