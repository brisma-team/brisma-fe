import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSubActivity = (kode) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_sub_aktivitas/${kode}/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    subActivity: data,
    subActivityError: error,
    subActivityMutate: mutate,
    subActivityIsLoading: isLoading,
  };
};

export default useSubActivity;
